// Ore Generators - 4 tiers x (7 Serpulo ores + 2 Erekir ores) + global research upgrades.
// Tiers: powered (2x2), unpowered (2x2), liquid-fed (3x3), cryofluid-fed (3x3).
// Serpulo liquid tier uses water; Erekir liquid tier uses ozone (no water on Erekir).
//
// Items, Liquids, ItemStack, Category, BuildVisibility, Planets, Blocks, TechTree,
// GenericCrafter, Sounds and Fx are provided as globals by the engine (global.js importPackage).

const oreDefs = [
  { id: "copper",   name: "Copper",   item: Items.copper,   powered: { craftTime: 60, power: 0.05,   req: [[Items.copper, 80], [Items.lead, 40]] },
    unpowered: { craftTime: 150, req: [[Items.copper, 180], [Items.lead, 90], [Items.graphite, 30]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.copper, 140], [Items.lead, 80], [Items.graphite, 30]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.copper, 200], [Items.lead, 120], [Items.titanium, 30], [Items.graphite, 25]] } },
  { id: "lead",     name: "Lead",     item: Items.lead,    powered: { craftTime: 60, power: 0.05,   req: [[Items.copper, 80], [Items.lead, 50]] },
    unpowered: { craftTime: 150, req: [[Items.copper, 180], [Items.lead, 110], [Items.graphite, 30]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.copper, 140], [Items.lead, 90], [Items.graphite, 30]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.copper, 200], [Items.lead, 130], [Items.titanium, 30], [Items.graphite, 25]] } },
  { id: "coal",     name: "Coal",     item: Items.coal,    powered: { craftTime: 60, power: 0.05,   req: [[Items.copper, 80], [Items.lead, 50], [Items.graphite, 15]] },
    unpowered: { craftTime: 150, req: [[Items.copper, 180], [Items.lead, 110], [Items.graphite, 40], [Items.titanium, 25]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.copper, 140], [Items.lead, 90], [Items.graphite, 40], [Items.titanium, 20]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.copper, 200], [Items.lead, 130], [Items.titanium, 35], [Items.graphite, 30]] } },
  { id: "titanium", name: "Titanium", item: Items.titanium, powered: { craftTime: 70, power: 0.0667, req: [[Items.copper, 100], [Items.lead, 70], [Items.titanium, 20]] },
    unpowered: { craftTime: 170, req: [[Items.copper, 220], [Items.lead, 140], [Items.titanium, 60], [Items.graphite, 40]] },
    water:     { craftTime: 48,  liquid: 1.1, req: [[Items.copper, 170], [Items.lead, 110], [Items.titanium, 45]] },
    cryo:      { craftTime: 36,  liquid: 0.7, power: 0.0833, req: [[Items.copper, 230], [Items.lead, 150], [Items.titanium, 60]] } },
  { id: "scrap",    name: "Scrap",    item: Items.scrap,   powered: { craftTime: 50, power: 0.0333, req: [[Items.copper, 60], [Items.lead, 30]] },
    unpowered: { craftTime: 130, req: [[Items.copper, 150], [Items.lead, 80], [Items.graphite, 25]] },
    water:     { craftTime: 33,  liquid: 0.9, req: [[Items.copper, 110], [Items.lead, 60]] },
    cryo:      { craftTime: 25,  liquid: 0.5, power: 0.05, req: [[Items.copper, 150], [Items.lead, 80]] } },
  { id: "thorium",  name: "Thorium",  item: Items.thorium, powered: { craftTime: 100, power: 0.0833, req: [[Items.copper, 120], [Items.lead, 80], [Items.titanium, 45], [Items.thorium, 25]] },
    unpowered: { craftTime: 240, req: [[Items.copper, 260], [Items.lead, 170], [Items.titanium, 100], [Items.thorium, 60], [Items.graphite, 50]] },
    water:     { craftTime: 75,  liquid: 1.3, req: [[Items.copper, 200], [Items.lead, 140], [Items.titanium, 85], [Items.thorium, 40]] },
    cryo:      { craftTime: 55,  liquid: 0.9, power: 0.1, req: [[Items.copper, 280], [Items.lead, 190], [Items.titanium, 110], [Items.thorium, 55]] } },
  { id: "sand",     name: "Sand",     item: Items.sand,    powered: { craftTime: 50, power: 0.0333, req: [[Items.copper, 60], [Items.lead, 30]] },
    unpowered: { craftTime: 130, req: [[Items.copper, 150], [Items.lead, 80], [Items.graphite, 25]] },
    water:     { craftTime: 33,  liquid: 0.9, req: [[Items.copper, 110], [Items.lead, 60]] },
    cryo:      { craftTime: 25,  liquid: 0.5, power: 0.05, req: [[Items.copper, 150], [Items.lead, 80]] } },
];

// Erekir ores. Liquid tier runs on ozone instead of water (Erekir has no water).
const erekirOreDefs = [
  { id: "beryllium", name: "Beryllium", item: Items.beryllium, powered: { craftTime: 60, power: 0.05, req: [[Items.beryllium, 80], [Items.graphite, 40]] },
    unpowered: { craftTime: 150, req: [[Items.beryllium, 180], [Items.graphite, 90], [Items.silicon, 30]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.beryllium, 140], [Items.graphite, 80], [Items.silicon, 30]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.beryllium, 200], [Items.graphite, 120], [Items.titanium, 30], [Items.silicon, 25]] } },
  { id: "tungsten",  name: "Tungsten",  item: Items.tungsten, powered: { craftTime: 90, power: 0.0833, req: [[Items.beryllium, 120], [Items.graphite, 80], [Items.tungsten, 25]] },
    unpowered: { craftTime: 220, req: [[Items.beryllium, 260], [Items.graphite, 170], [Items.tungsten, 60], [Items.silicon, 50]] },
    water:     { craftTime: 65,  liquid: 1.2, req: [[Items.beryllium, 200], [Items.graphite, 140], [Items.tungsten, 45]] },
    cryo:      { craftTime: 48,  liquid: 0.8, power: 0.1, req: [[Items.beryllium, 280], [Items.graphite, 190], [Items.tungsten, 60], [Items.oxide, 20]] } },
];

// Unique per-ore extraction flavor: every ore uses a different real-world-inspired
// process so no two generators behave the same on paper.
const flavor = {
  copper: {
    powered: "Electrodeposition of airborne copper onto charged cathodes.",
    unpowered: "A copper condenser that passively accretes trace copper dust from the air.",
    water: "Electrowinning recovers copper ions dissolved in the feed liquid.",
    cryo: "Cryogenic crystallization forces dissolved copper out of suspension as cathodes.",
  },
  lead: {
    powered: "Gravity precipitation of airborne lead oxide fumes into ingots.",
    unpowered: "A settling chamber that lets heavy lead dust slowly fall out of the air.",
    water: "Dense-media separation recovers lead from the feed liquid.",
    cryo: "Cryo-densification forces lead out of suspension as heavy crystalline masses.",
  },
  coal: {
    powered: "Thermal carbon scrubbers fix airborne hydrocarbons into coal.",
    unpowered: "A slow-burning kiln that accumulates airborne soot into crude coal.",
    water: "Slurry separation recovers carbon suspended in the feed liquid.",
    cryo: "Cryogenic condensation deposits volatile carbon as solid coal.",
  },
  titanium: {
    powered: "Plasma reduction of airborne titanium chloride vapor into metal.",
    unpowered: "A chemical reactor that slowly reduces titanium-bearing dust from the air.",
    water: "Solvent extraction recovers titanium ions from the feed liquid.",
    cryo: "Cryogenic vapor deposition forces titanium out of suspension as crystals.",
  },
  scrap: {
    powered: "Magnetic separation sifts ferrous scrap from airborne dust.",
    unpowered: "A magnet bed that slowly pulls iron filings out of the air.",
    water: "Magnetic filtration recovers ferrous scrap from the feed liquid.",
    cryo: "Cryo-brittling fractures trapped metal into clean scrap.",
  },
  thorium: {
    powered: "Irradiation chambers transmute trace thorium from airborne dust.",
    unpowered: "A shielded hopper that gradually collects radioactive thorium dust.",
    water: "Acid leaching recovers thorium from the feed liquid.",
    cryo: "Cryogenic quenching forces thorium out of suspension as dense rods.",
  },
  sand: {
    powered: "Cyclonic sieving separates silica from airborne grit.",
    unpowered: "A wind winnower that settles sand grains out of the air.",
    water: "Hydrocyclone separation recovers sand from the feed liquid.",
    cryo: "Frost agglomeration forces sand out of suspension as grains.",
  },
  beryllium: {
    powered: "Electrolytic extraction of beryllium from airborne beryl dust.",
    unpowered: "A chemical scrubber that slowly collects beryllium-bearing dust.",
    water: "Solvent extraction recovers beryllium from the feed liquid.",
    cryo: "Cryogenic precipitation forces beryllium out of suspension as crystals.",
  },
  tungsten: {
    powered: "Arc furnace reduction of airborne tungsten ore into metal.",
    unpowered: "A refractory condenser that slowly gathers tungsten dust.",
    water: "Pressure leaching recovers tungsten from the feed liquid.",
    cryo: "Cryo-sintering forces tungsten out of suspension as dense crystals.",
  },
};

function makeRequirements(req) {
  let flat = [];
  for (let i = 0; i < req.length; i++) {
    flat.push(req[i][0], req[i][1]);
  }
  return ItemStack.with.apply(null, flat);
}

function makeCrafter(name, item, craftTime, size, req, power, liquid, localizedName, description, style, planet) {
  const block = extend(GenericCrafter, name, {});
  block.requirements = makeRequirements(req);
  block.outputItem = new ItemStack(item, 1);
  block.craftTime = craftTime;
  block.size = size;
  block.category = Category.production;
  block.buildVisibility = BuildVisibility.shown;
  block.shownPlanets.add(planet);
  block.itemCapacity = 30;
  block.health = 200 * size;
  block.localizedName = localizedName;
  block.description = description;
  block.warmupSpeed = 0.04;
  // research cost scales off build cost; keep it modest
  block.researchCostMultiplier = 0.1;
  if (liquid != null) {
    block.consumeLiquid(liquid.liquid, liquid.amount);
    block.liquidCapacity = 40;
  }
  if (power != null) {
    block.consumePower(power);
  }
  applyAmbiance(block, style);
  applyDrawer(block, style);
  return block;
}

// tier identity through sound + particles
function applyAmbiance(block, style) {
  if (style === "powered") {
    block.ambientSound = Sounds.loopElectricHum;
    block.ambientSoundVolume = 0.08;
    block.craftEffect = Fx.smokePuff;
  } else if (style === "water") {
    block.ambientSound = Sounds.loopCultivator;
    block.ambientSoundVolume = 0.10;
    block.craftEffect = Fx.airBubble;
    block.updateEffect = Fx.vaporSmall;
    block.updateEffectChance = 0.05;
  } else if (style === "cryo") {
    block.ambientSound = Sounds.loopCombustion;
    block.ambientSoundVolume = 0.08;
    block.craftEffect = Fx.steam;
    block.updateEffect = Fx.vapor;
    block.updateEffectChance = 0.04;
  } else {
    // unpowered: quiet mechanical grind
    block.ambientSound = Sounds.loopMachine;
    block.ambientSoundVolume = 0.05;
  }
}

// set an animated drawer: base sprite + pulsing glow + spinning crystal overlay.
// DrawBlurSpin needs <name>-spin and <name>-spin-blur; DrawGlowRegion needs <name>-glow.
function applyDrawer(block, style) {
  if (style == null || style === "unpowered") return; // static, no power -> no animation
  block.drawer = new DrawMulti(
    new DrawDefault(),
    new DrawGlowRegion(),
    new DrawBlurSpin("-spin", 1.0)
  );
}

// build a 4-tier chain for one ore; liquidTier is the liquid used by the 3rd tier
function buildChain(ore, liquidTier, planet) {
  const f = flavor[ore.id];
  const chain = {
    name: ore.name,
    powered: makeCrafter(ore.id + "-gen",
      ore.item, ore.powered.craftTime, 2, ore.powered.req, ore.powered.power, null,
      ore.name + " Generator",
      f.powered + "\n" +
      "Power: " + Math.round(ore.powered.power * 60) + " power/sec.", "powered", planet),
    unpowered: makeCrafter(ore.id + "-gen-unpowered",
      ore.item, ore.unpowered.craftTime, 2, ore.unpowered.req, null, null,
      ore.name + " Generator (Passive)",
      f.unpowered + "\n" +
      "No power required, but heavy and slow. Expensive to build.", "unpowered", planet),
    water: makeCrafter(ore.id + "-gen-water",
      ore.item, ore.water.craftTime, 3, ore.water.req, null, { liquid: liquidTier, amount: ore.water.liquid },
      ore.name + " Liquid Generator",
      f.water + "\n" +
      "Consumes " + liquidTier.name + ": " + Math.round(ore.water.liquid * 10) / 10 + " per second. No power required.", "water", planet),
    cryo: makeCrafter(ore.id + "-gen-cryo",
      ore.item, ore.cryo.craftTime, 3, ore.cryo.req, ore.cryo.power, { liquid: Liquids.cryofluid, amount: ore.cryo.liquid },
      ore.name + " Cryo Generator",
      f.cryo + "\n" +
      "The fastest generator type. Needs power and cryofluid.", "cryo", planet),
  };
  chains.push(chain);
  allGenerators.push(chain.powered, chain.unpowered, chain.water, chain.cryo);
}

// collect every block with the tech node of its tier-parent so we can chain research
let chains = [];
let allGenerators = [];
for (let i = 0; i < oreDefs.length; i++) {
  buildChain(oreDefs[i], Liquids.water, Planets.serpulo);
}
for (let i = 0; i < erekirOreDefs.length; i++) {
  buildChain(erekirOreDefs[i], Liquids.ozone, Planets.erekir);
}

// record base stats so upgrades can recompute from them
const baseCraftTime = {};
const baseCapacity = {};
const baseOutput = {};
const basePower = {};
for (let i = 0; i < allGenerators.length; i++) {
  const b = allGenerators[i];
  baseCraftTime[b.name] = b.craftTime;
  baseCapacity[b.name] = b.itemCapacity;
  baseOutput[b.name] = b.outputItem.amount;
  if (b.consPower != null) {
    basePower[b.name] = b.consPower.usage;
  }
}

// ---- research tree ----
// Chain per ore off the pneumatic drill node in the Serpulo tree:
// pneumatic-drill -> <ore>-gen -> <ore>-gen-unpowered -> <ore>-gen-water -> <ore>-gen-cryo
// Erekir chains anchor to plasmaBore instead.
const drillNode = TechTree.all.find(t => t.content === Blocks.pneumaticDrill);
const erekirNode = TechTree.all.find(t => t.content === Blocks.plasmaBore);
if (drillNode != null) {
  for (let i = 0; i < chains.length; i++) {
    const c = chains[i];
    if (!c.powered.shownPlanets.contains(Planets.serpulo)) continue;
    const n1 = new TechTree.TechNode(drillNode, c.powered, c.powered.researchRequirements());
    const n2 = new TechTree.TechNode(n1, c.unpowered, c.unpowered.researchRequirements());
    const n3 = new TechTree.TechNode(n2, c.water, c.water.researchRequirements());
    new TechTree.TechNode(n3, c.cryo, c.cryo.researchRequirements());
  }
} else {
  Log.err("ore-gens: could not find pneumatic drill tech node; research not attached.");
}
if (erekirNode != null) {
  for (let i = 0; i < chains.length; i++) {
    const c = chains[i];
    if (!c.powered.shownPlanets.contains(Planets.erekir)) continue;
    const n1 = new TechTree.TechNode(erekirNode, c.powered, c.powered.researchRequirements());
    const n2 = new TechTree.TechNode(n1, c.unpowered, c.unpowered.researchRequirements());
    const n3 = new TechTree.TechNode(n2, c.water, c.water.researchRequirements());
    new TechTree.TechNode(n3, c.cryo, c.cryo.researchRequirements());
  }
} else {
  Log.err("ore-gens: could not find plasmaBore tech node; Erekir research not attached.");
}

// ---- global research upgrades ----
// Hidden upgrade blocks act as research nodes. When unlocked they scale all generators.
const speedUpgrades = [];
const capacityUpgrades = [];
const outputUpgrades = [];
const efficiencyUpgrades = [];
const speedStep = 0.9;      // each level: craftTime *= 0.9  (-10%)
const capacityStep = 10;    // each level: itemCapacity += 10
const outputStep = 2;       // each level: output stack *= 2
const efficiencyStep = 0.85; // each level: power usage *= 0.85 (-15%)

function makeUpgrade(name, title, description, parent, cost) {
  const up = extend(GenericCrafter, name, {});
  up.requirements = ItemStack.empty;
  up.buildVisibility = BuildVisibility.hidden;
  up.category = Category.production;
  up.shownPlanets.add(Planets.serpulo);
  up.shownPlanets.add(Planets.erekir);
  up.size = 1;
  up.localizedName = title;
  up.description = description;
  const node = new TechTree.TechNode(parent, up, cost);
  return { block: up, node: node };
}

function makeUpgradeChain(prefix, parent, titles, descs, costs) {
  const blocks = [];
  const nodes = [];
  let lastNode = parent;
  for (let i = 0; i < titles.length; i++) {
    const m = makeUpgrade(prefix + "-" + (i + 1), titles[i], descs[i], lastNode, costs[i]);
    lastNode = m.node;
    blocks.push(m.block);
    nodes.push(m.node);
  }
  return { blocks: blocks, nodes: nodes, lastNode: lastNode };
}

if (drillNode != null) {
  const costs = [ItemStack.with(Items.copper, 300), ItemStack.with(Items.copper, 600, Items.lead, 400), ItemStack.with(Items.copper, 1200, Items.lead, 800, Items.titanium, 400)];
  const titles = ["Generator Speed I", "Generator Speed II", "Generator Speed III"];
  const descs = ["All generators produce 10% faster.", "All generators produce 10% faster.", "All generators produce 10% faster."];
  const speedMade = makeUpgradeChain("generator-speed", drillNode, titles, descs, costs);
  speedUpgrades.push.apply(speedUpgrades, speedMade.blocks);
  const capTitles = ["Generator Capacity I", "Generator Capacity II", "Generator Capacity III"];
  const capDescs = ["All generators hold 10 more items.", "All generators hold 10 more items.", "All generators hold 10 more items."];
  capacityUpgrades.push.apply(capacityUpgrades, makeUpgradeChain("generator-capacity", drillNode, capTitles, capDescs, costs).blocks);

  // output chain hangs off Speed I; efficiency chain off Speed III (late-game)
  const outCosts = [ItemStack.with(Items.copper, 1500, Items.titanium, 900), ItemStack.with(Items.copper, 3000, Items.titanium, 1800, Items.thorium, 600)];
  const outTitles = ["Generator Output I", "Generator Output II"];
  const outDescs = ["All generators double their output.", "All generators double their output again."];
  outputUpgrades.push.apply(outputUpgrades, makeUpgradeChain("generator-output", speedMade.nodes[0], outTitles, outDescs, outCosts).blocks);
  const effCosts = [ItemStack.with(Items.copper, 1500, Items.titanium, 900), ItemStack.with(Items.copper, 3000, Items.titanium, 1800, Items.thorium, 600)];
  const effTitles = ["Generator Efficiency I", "Generator Efficiency II"];
  const effDescs = ["Powered generators use 15% less power.", "Powered generators use 15% less power again."];
  efficiencyUpgrades.push.apply(efficiencyUpgrades, makeUpgradeChain("generator-efficiency", speedMade.lastNode, effTitles, effDescs, effCosts).blocks);
}

// recompute stats from base values; idempotent, safe to call on load and on research
function applyUpgrades() {
  // NOTE: can't call up.unlocked() from JS — "unlocked" is also a boolean field and
  // Rhino resolves the field, not the method. Read the persisted setting directly instead.
  function isResearched(block) {
    return Core.settings.getBool(block.name + "-unlocked", false);
  }
  let speedLevel = 0;
  for (let i = 0; i < speedUpgrades.length; i++) {
    if (isResearched(speedUpgrades[i])) speedLevel++;
  }
  let capacityLevel = 0;
  for (let i = 0; i < capacityUpgrades.length; i++) {
    if (isResearched(capacityUpgrades[i])) capacityLevel++;
  }
  let outputLevel = 0;
  for (let i = 0; i < outputUpgrades.length; i++) {
    if (isResearched(outputUpgrades[i])) outputLevel++;
  }
  let efficiencyLevel = 0;
  for (let i = 0; i < efficiencyUpgrades.length; i++) {
    if (isResearched(efficiencyUpgrades[i])) efficiencyLevel++;
  }
  const speedMult = Math.pow(speedStep, speedLevel);
  const capacityBoost = capacityStep * capacityLevel;
  const outputMult = Math.pow(outputStep, outputLevel);
  const powerMult = Math.pow(efficiencyStep, efficiencyLevel);
  for (let i = 0; i < allGenerators.length; i++) {
    const b = allGenerators[i];
    b.craftTime = baseCraftTime[b.name] * speedMult;
    b.itemCapacity = baseCapacity[b.name] + capacityBoost;
    b.outputItem.amount = baseOutput[b.name] * outputMult;
    if (b.consPower != null && basePower[b.name] != null) {
      b.consPower.usage = basePower[b.name] * powerMult;
    }
  }
}

Events.on(EventType.ContentInitEvent, () => applyUpgrades());
Events.on(EventType.ResearchEvent, e => {
  const name = e.content.name;
  if (name != null && (name.indexOf("generator-") === 0)) {
    applyUpgrades();
  }
});