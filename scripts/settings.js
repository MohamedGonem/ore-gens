// Ore Generators - Settings Module
// Provides the in-game settings UI and a global OregensSettings API
// that generators.js reads at content-init time.

// ---- setting keys ----
var KEYS = {
  maxTier:     "oregens-max-tier",
  research:    "oregens-research",
  maxUpgrade:  "oregens-max-upgrade",
  costMode:    "oregens-cost-mode",
  // upgrade type gates
  upgradeSpeed:     "oregens-gate-upgrade-speed",
  upgradeCapacity:  "oregens-gate-upgrade-capacity",
  upgradeOutput:    "oregens-gate-upgrade-output",
  upgradeEfficiency:"oregens-gate-upgrade-efficiency",
};

// ore gates: id -> key
var ORE_KEYS = {
  copper: "oregens-gate-copper", lead: "oregens-gate-lead", coal: "oregens-gate-coal",
  titanium: "oregens-gate-titanium", scrap: "oregens-gate-scrap", thorium: "oregens-gate-thorium",
  sand: "oregens-gate-sand", beryllium: "oregens-gate-beryllium", tungsten: "oregens-gate-tungsten",
};

// liquid gates
var LIQUID_KEYS = {
  water: "oregens-gate-water", ozone: "oregens-gate-ozone", cryofluid: "oregens-gate-cryofluid",
  slag: "oregens-gate-slag", gallium: "oregens-gate-gallium", oil: "oregens-gate-oil",
};

// craftable item gates (generators + special blocks)
var ITEM_KEYS = {
  graphite: "oregens-gate-graphite", silicon: "oregens-gate-silicon",
  metaglass: "oregens-gate-metaglass", plastanium: "oregens-gate-plastanium",
  phaseFabric: "oregens-gate-phase-fabric", pyratite: "oregens-gate-pyratite",
  blastCompound: "oregens-gate-blast-compound", surgeAlloy: "oregens-gate-surge-alloy",
  scrapCoalExtractor: "oregens-gate-scrap-coal",
  basicSynthesizer: "oregens-gate-basic-synth",
  refinedSynthesizer: "oregens-gate-refined-synth",
  advancedSynthesizer: "oregens-gate-advanced-synth",
};

// ---- defaults ----
var DEFAULTS = {};
DEFAULTS[KEYS.maxTier] = 5;
DEFAULTS[KEYS.research] = true;
DEFAULTS[KEYS.maxUpgrade] = 10;
DEFAULTS[KEYS.costMode] = 0;
DEFAULTS[KEYS.upgradeSpeed] = true;
DEFAULTS[KEYS.upgradeCapacity] = true;
DEFAULTS[KEYS.upgradeOutput] = true;
DEFAULTS[KEYS.upgradeEfficiency] = true;

var k;
for (k in ORE_KEYS) DEFAULTS[ORE_KEYS[k]] = true;
for (k in LIQUID_KEYS) DEFAULTS[LIQUID_KEYS[k]] = true;
for (k in ITEM_KEYS) DEFAULTS[ITEM_KEYS[k]] = true;

// ---- public API ----

var OregensSettings = {};

OregensSettings.getMaxTier = function() {
  return Core.settings.getInt(KEYS.maxTier, 5);
};

OregensSettings.isResearchEnabled = function() {
  return Core.settings.getBool(KEYS.research, true);
};

OregensSettings.getMaxUpgradeLevel = function() {
  return Core.settings.getInt(KEYS.maxUpgrade, 10);
};

OregensSettings.getCostMode = function() {
  return Core.settings.getInt(KEYS.costMode, 0);
};

OregensSettings.getCostMultiplier = function() {
  var mode = OregensSettings.getCostMode();
  if (mode === 1) return 2.5;
  if (mode === 2) return 5.0;
  return 1.0;
};

OregensSettings.isEnabled = function(oreId) {
  var key = ORE_KEYS[oreId];
  if (key == null) return true;
  return Core.settings.getBool(key, true);
};

OregensSettings.isLiquidEnabled = function(liquidId) {
  var key = LIQUID_KEYS[liquidId];
  if (key == null) return true;
  return Core.settings.getBool(key, true);
};

OregensSettings.isItemEnabled = function(itemId) {
  var key = ITEM_KEYS[itemId];
  if (key == null) return true;
  return Core.settings.getBool(key, true);
};

// Upgrade type gates
OregensSettings.isUpgradeEnabled = function(type) {
  // Output requires Capacity to be enabled
  if (type === "output" && !Core.settings.getBool(KEYS.upgradeCapacity, true)) {
    return false;
  }
  var key = KEYS["upgrade" + type.charAt(0).toUpperCase() + type.slice(1)];
  if (key == null) return true;
  return Core.settings.getBool(key, true);
};

// Apply gating to a block: if disabled or tier exceeds max, hide from
// tech tree and set craft time to 999999.
OregensSettings.applyGating = function(block, tier, id, category) {
  var enabled = true;
  if (category === "ore") enabled = OregensSettings.isEnabled(id);
  else if (category === "liquid") enabled = OregensSettings.isLiquidEnabled(id);
  else if (category === "craftable") enabled = OregensSettings.isItemEnabled(id);

  var tierOk = (tier === 0 || tier <= OregensSettings.getMaxTier());

  if (!enabled || !tierOk) {
    block.buildVisibility = BuildVisibility.hidden;
    block.craftTime = 999999;
  }
};

// Apply cost multiplier to a requirement array [[item, amount], ...]
OregensSettings.applyCostMultiplier = function(req) {
  var mult = OregensSettings.getCostMultiplier();
  if (mult === 1.0) return req;
  var result = [];
  for (var i = 0; i < req.length; i++) {
    var item = req[i][0];
    var amount = Math.round((req[i][1] * mult) / 5) * 5;
    if (amount < 5) amount = 5;
    result.push([item, amount]);
  }
  return result;
};

// ---- restart prompt ----
var _skipRestart = true; // true during init; suppresses prompts from registration-time callbacks

function promptRestart() {
  if (_skipRestart) return;
  Vars.ui.showInfo(Core.bundle.get("oregens.restart", "Settings changed. Please restart the game for changes to take effect."));
}

// ---- settings UI ----
function registerSettingsUI() {
  Vars.ui.settings.addCategory("Ore Generators", function(table) {
    // -- Config section --
    table.add(Core.bundle.get("setting.oregens-section-config", "Configuration")).colspan(2).left().row();
    table.sliderPref(KEYS.maxTier, 5, 1, 5, 1, function(value) {
      promptRestart();
      return value + "";
    });
    table.checkPref(KEYS.research, true, function(value) { promptRestart(); });
    table.sliderPref(KEYS.maxUpgrade, 10, 1, 10, 1, function(value) {
      promptRestart();
      return value + "";
    });
    table.sliderPref(KEYS.costMode, 0, 0, 2, 1, function(value) {
      promptRestart();
      if (value === 0) return "Normal";
      if (value === 1) return "Hard (2.5x)";
      return "Extreme (5x)";
    });

    // -- Upgrade type gates --
    table.add(Core.bundle.get("setting.oregens-section-upgrades", "Upgrade Types")).colspan(2).left().row();
    table.checkPref(KEYS.upgradeSpeed, true, function(value) { promptRestart(); });
    table.checkPref(KEYS.upgradeCapacity, true, function(value) { promptRestart(); });
    table.checkPref(KEYS.upgradeOutput, true, function(value) { promptRestart(); });
    table.checkPref(KEYS.upgradeEfficiency, true, function(value) { promptRestart(); });

    // -- Ore gates --
    table.add(Core.bundle.get("setting.oregens-section-ores", "Ore Generators")).colspan(2).left().row();
    var oreOrder = ["copper", "lead", "coal", "titanium", "scrap", "thorium", "sand", "beryllium", "tungsten"];
    for (var i = 0; i < oreOrder.length; i++) {
      table.checkPref(ORE_KEYS[oreOrder[i]], true, function(value) { promptRestart(); });
    }

    // -- Liquid gates --
    table.add(Core.bundle.get("setting.oregens-section-liquids", "Liquid Producers")).colspan(2).left().row();
    var liqOrder = ["water", "ozone", "cryofluid", "slag", "gallium", "oil"];
    for (var i = 0; i < liqOrder.length; i++) {
      table.checkPref(LIQUID_KEYS[liqOrder[i]], true, function(value) { promptRestart(); });
    }

    // -- Craftable gates --
    table.add(Core.bundle.get("setting.oregens-section-craftables", "Crafting Generators")).colspan(2).left().row();
    var craftOrder = ["graphite", "silicon", "metaglass", "plastanium", "phaseFabric", "pyratite", "blastCompound", "surgeAlloy"];
    for (var i = 0; i < craftOrder.length; i++) {
      table.checkPref(ITEM_KEYS[craftOrder[i]], true, function(value) { promptRestart(); });
    }

    // -- Special blocks --
    table.add(Core.bundle.get("setting.oregens-section-special", "Special Blocks")).colspan(2).left().row();
    table.checkPref(ITEM_KEYS.scrapCoalExtractor, true, function(value) { promptRestart(); });
    table.checkPref(ITEM_KEYS.basicSynthesizer, true, function(value) { promptRestart(); });
    table.checkPref(ITEM_KEYS.refinedSynthesizer, true, function(value) { promptRestart(); });
    table.checkPref(ITEM_KEYS.advancedSynthesizer, true, function(value) { promptRestart(); });
  });
}

// ---- init ----
// Set defaults so keys exist before the settings UI is opened.
(function() {
  for (var key in DEFAULTS) {
    Core.settings.defaults(key, DEFAULTS[key]);
  }
})();

// Defer settings UI registration until Vars.ui is available.
Events.on(EventType.ClientLoadEvent, function() {
  try {
    registerSettingsUI();
    _skipRestart = false;
  } catch(e) {
    Log.warn("ore-gens: could not register settings UI: " + e);
  }
});

// Export for other modules
exports.OregensSettings = OregensSettings;
