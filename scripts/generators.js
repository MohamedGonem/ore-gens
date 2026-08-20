// Ore Generators: 5 tiers x (7 Serpulo + 2 Erekir ores), liquid producers,
// multi-ore synthesizers, 10-level global upgrade lines.
// Items, Liquids, ItemStack, LiquidStack, Category, BuildVisibility, Planets,
// Blocks, TechTree, GenericCrafter, Sounds and Fx are engine globals.

const oreDefs = [
  { id: "copper",   name: "Copper",   item: Items.copper,   powered: { craftTime: 60, power: 0.05,   req: [[Items.copper, 80], [Items.lead, 40]] },
    unpowered: { craftTime: 150, req: [[Items.copper, 180], [Items.lead, 90], [Items.graphite, 30]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.copper, 140], [Items.lead, 80], [Items.graphite, 30]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.copper, 200], [Items.lead, 120], [Items.titanium, 30], [Items.graphite, 25]] },
    magma:     { craftTime: 22,  power: 0.12, liquid: [0.5, 0.4], req: [[Items.thorium, 50], [Items.titanium, 100], [Items.plastanium, 50], [Items.phaseFabric, 35], [Items.surgeAlloy, 25], [Items.silicon, 120]] } },
  { id: "lead",     name: "Lead",     item: Items.lead,    powered: { craftTime: 60, power: 0.05,   req: [[Items.copper, 80], [Items.lead, 50]] },
    unpowered: { craftTime: 150, req: [[Items.copper, 180], [Items.lead, 110], [Items.graphite, 30]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.copper, 140], [Items.lead, 90], [Items.graphite, 30]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.copper, 200], [Items.lead, 130], [Items.titanium, 30], [Items.graphite, 25]] },
    magma:     { craftTime: 22,  power: 0.12, liquid: [0.5, 0.4], req: [[Items.thorium, 50], [Items.titanium, 100], [Items.plastanium, 50], [Items.phaseFabric, 35], [Items.surgeAlloy, 25], [Items.silicon, 120]] } },
  { id: "coal",     name: "Coal",     item: Items.coal,    powered: { craftTime: 60, power: 0.05,   req: [[Items.copper, 80], [Items.lead, 50], [Items.graphite, 15]] },
    unpowered: { craftTime: 150, req: [[Items.copper, 180], [Items.lead, 110], [Items.graphite, 40], [Items.titanium, 25]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.copper, 140], [Items.lead, 90], [Items.graphite, 40], [Items.titanium, 20]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.copper, 200], [Items.lead, 130], [Items.titanium, 35], [Items.graphite, 30]] },
    magma:     { craftTime: 24,  power: 0.13, liquid: [0.55, 0.45], req: [[Items.thorium, 60], [Items.titanium, 120], [Items.plastanium, 60], [Items.phaseFabric, 40], [Items.surgeAlloy, 30], [Items.silicon, 140]] } },
  { id: "titanium", name: "Titanium", item: Items.titanium, powered: { craftTime: 70, power: 0.0667, req: [[Items.copper, 100], [Items.lead, 70], [Items.titanium, 20]] },
    unpowered: { craftTime: 170, req: [[Items.copper, 220], [Items.lead, 140], [Items.titanium, 60], [Items.graphite, 40]] },
    water:     { craftTime: 48,  liquid: 1.1, req: [[Items.copper, 170], [Items.lead, 110], [Items.titanium, 45]] },
    cryo:      { craftTime: 36,  liquid: 0.7, power: 0.0833, req: [[Items.copper, 230], [Items.lead, 150], [Items.titanium, 60]] },
    magma:     { craftTime: 26,  power: 0.15, liquid: [0.6, 0.5], req: [[Items.thorium, 70], [Items.titanium, 140], [Items.plastanium, 70], [Items.phaseFabric, 45], [Items.surgeAlloy, 35], [Items.silicon, 160]] } },
  { id: "scrap",    name: "Scrap",    item: Items.scrap,   powered: { craftTime: 50, power: 0.0333, req: [[Items.copper, 60], [Items.lead, 30]] },
    unpowered: { craftTime: 130, req: [[Items.copper, 150], [Items.lead, 80], [Items.graphite, 25]] },
    water:     { craftTime: 33,  liquid: 0.9, req: [[Items.copper, 110], [Items.lead, 60]] },
    cryo:      { craftTime: 25,  liquid: 0.5, power: 0.05, req: [[Items.copper, 150], [Items.lead, 80]] },
    magma:     { craftTime: 18,  power: 0.1,  liquid: [0.4, 0.35], req: [[Items.thorium, 40], [Items.titanium, 80], [Items.plastanium, 40], [Items.phaseFabric, 30], [Items.surgeAlloy, 20], [Items.silicon, 100]] } },
  { id: "thorium",  name: "Thorium",  item: Items.thorium, powered: { craftTime: 100, power: 0.0833, req: [[Items.copper, 120], [Items.lead, 80], [Items.titanium, 45], [Items.thorium, 25]] },
    unpowered: { craftTime: 240, req: [[Items.copper, 260], [Items.lead, 170], [Items.titanium, 100], [Items.thorium, 60], [Items.graphite, 50]] },
    water:     { craftTime: 75,  liquid: 1.3, req: [[Items.copper, 200], [Items.lead, 140], [Items.titanium, 85], [Items.thorium, 40]] },
    cryo:      { craftTime: 55,  liquid: 0.9, power: 0.1, req: [[Items.copper, 280], [Items.lead, 190], [Items.titanium, 110], [Items.thorium, 55]] },
    magma:     { craftTime: 40,  power: 0.2,  liquid: [0.8, 0.6], req: [[Items.thorium, 100], [Items.titanium, 180], [Items.plastanium, 90], [Items.phaseFabric, 60], [Items.surgeAlloy, 50], [Items.silicon, 200]] } },
  { id: "sand",     name: "Sand",     item: Items.sand,    powered: { craftTime: 50, power: 0.0333, req: [[Items.copper, 60], [Items.lead, 30]] },
    unpowered: { craftTime: 130, req: [[Items.copper, 150], [Items.lead, 80], [Items.graphite, 25]] },
    water:     { craftTime: 33,  liquid: 0.9, req: [[Items.copper, 110], [Items.lead, 60]] },
    cryo:      { craftTime: 25,  liquid: 0.5, power: 0.05, req: [[Items.copper, 150], [Items.lead, 80]] },
    magma:     { craftTime: 18,  power: 0.1,  liquid: [0.4, 0.35], req: [[Items.thorium, 40], [Items.titanium, 80], [Items.plastanium, 40], [Items.phaseFabric, 30], [Items.surgeAlloy, 20], [Items.silicon, 100]] } },
];

// Erekir ores. Liquid tier runs on ozone instead of water; magma tier runs on gallium.
const erekirOreDefs = [
  { id: "beryllium", name: "Beryllium", item: Items.beryllium, powered: { craftTime: 60, power: 0.05, req: [[Items.beryllium, 80], [Items.graphite, 40]] },
    unpowered: { craftTime: 150, req: [[Items.beryllium, 180], [Items.graphite, 90], [Items.silicon, 30]] },
    water:     { craftTime: 40,  liquid: 1,   req: [[Items.beryllium, 140], [Items.graphite, 80], [Items.silicon, 30]] },
    cryo:      { craftTime: 30,  liquid: 0.6, power: 0.0667, req: [[Items.beryllium, 200], [Items.graphite, 120], [Items.titanium, 30], [Items.silicon, 25]] },
    magma:     { craftTime: 22,  power: 0.12, liquid: [0.5, 0.4], req: [[Items.tungsten, 100], [Items.oxide, 50], [Items.plastanium, 60], [Items.phaseFabric, 40], [Items.surgeAlloy, 30], [Items.silicon, 140]] } },
  { id: "tungsten",  name: "Tungsten",  item: Items.tungsten, powered: { craftTime: 90, power: 0.0833, req: [[Items.beryllium, 120], [Items.graphite, 80], [Items.tungsten, 25]] },
    unpowered: { craftTime: 220, req: [[Items.beryllium, 260], [Items.graphite, 170], [Items.tungsten, 60], [Items.silicon, 50]] },
    water:     { craftTime: 65,  liquid: 1.2, req: [[Items.beryllium, 200], [Items.graphite, 140], [Items.tungsten, 45]] },
    cryo:      { craftTime: 48,  liquid: 0.8, power: 0.1, req: [[Items.beryllium, 280], [Items.graphite, 190], [Items.tungsten, 60], [Items.oxide, 20]] },
    magma:     { craftTime: 34,  power: 0.18, liquid: [0.7, 0.55], req: [[Items.tungsten, 140], [Items.oxide, 70], [Items.plastanium, 80], [Items.phaseFabric, 55], [Items.surgeAlloy, 40], [Items.silicon, 180]] } },
];

// Recipe rebalance: silicon/plastanium/phase on higher tiers keep costs real.
const tierSupplement = [
  [],
  [[Items.silicon, 35]],
  [[Items.silicon, 50]],
  [[Items.silicon, 70], [Items.plastanium, 35], [Items.phaseFabric, 20]],
  // magma recipes are explicit per ore (alloy + phase + plastanium)
];

function enrichedReq(req, tier) {
  return req.concat(tierSupplement[tier]);
}// Unique per-ore extraction flavor: every ore uses a different real-world-inspired
// process so no two generators behave the same on paper.
const flavor = {
  copper: {
    powered: "Electrodeposition of airborne copper onto charged cathodes.",
    unpowered: "A copper condenser that passively accretes trace copper dust from the air.",
    water: "Electrowinning recovers copper ions dissolved in the feed liquid.",
    cryo: "Cryogenic crystallization forces dissolved copper out of suspension as cathodes.",
    magma: "Molten electrolyte reduction of copper-bearing plasma streams.",
  },
  lead: {
    powered: "Gravity precipitation of airborne lead oxide fumes into ingots.",
    unpowered: "A settling chamber that lets heavy lead dust slowly fall out of the air.",
    water: "Dense-media separation recovers lead from the feed liquid.",
    cryo: "Cryo-densification forces lead out of suspension as heavy crystalline masses.",
    magma: "Cryo-slag densification of lead from plasma-quenched slag veins.",
  },
  coal: {
    powered: "Thermal carbon scrubbers fix airborne hydrocarbons into coal.",
    unpowered: "A slow-burning kiln that accumulates airborne soot into crude coal.",
    water: "Slurry separation recovers carbon suspended in the feed liquid.",
    cryo: "Cryogenic condensation deposits volatile carbon as solid coal.",
    magma: "Carbon fixation from superheated plasma-laden slag streams.",
  },
  titanium: {
    powered: "Plasma reduction of airborne titanium chloride vapor into metal.",
    unpowered: "A chemical reactor that slowly reduces titanium-bearing dust from the air.",
    water: "Solvent extraction recovers titanium ions from the feed liquid.",
    cryo: "Cryogenic vapor deposition forces titanium out of suspension as crystals.",
    magma: "Plasma-alloy reduction of titanium from dissolved slag flux.",
  },
  scrap: {
    powered: "Magnetic separation sifts ferrous scrap from airborne dust.",
    unpowered: "A magnet bed that slowly pulls iron filings out of the air.",
    water: "Magnetic filtration recovers ferrous scrap from the feed liquid.",
    cryo: "Cryo-brittling fractures trapped metal into clean scrap.",
    magma: "Magnetic cascade recovery of ferrous slag from molten streams.",
  },
  thorium: {
    powered: "Irradiation chambers transmute trace thorium from airborne dust.",
    unpowered: "A shielded hopper that gradually collects radioactive thorium dust.",
    water: "Acid leaching recovers thorium from the feed liquid.",
    cryo: "Cryogenic quenching forces thorium out of suspension as dense rods.",
    magma: "Fissile harvesting from enriched plasma-slag breeder baths.",
  },
  sand: {
    powered: "Cyclonic sieving separates silica from airborne grit.",
    unpowered: "A wind winnower that settles sand grains out of the air.",
    water: "Hydrocyclone separation recovers sand from the feed liquid.",
    cryo: "Frost agglomeration forces sand out of suspension as grains.",
    magma: "Vitreous sieving of silica from flash-cooled lava streams.",
  },
  beryllium: {
    powered: "Electrolytic extraction of beryllium from airborne beryl dust.",
    unpowered: "A chemical scrubber that slowly collects beryllium-bearing dust.",
    water: "Solvent extraction recovers beryllium from the feed liquid.",
    cryo: "Cryogenic precipitation forces beryllium out of suspension as crystals.",
    magma: "Beryl extraction from molten gallium-electrolysis baths.",
  },
  tungsten: {
    powered: "Arc furnace reduction of airborne tungsten ore into metal.",
    unpowered: "A refractory condenser that slowly gathers tungsten dust.",
    water: "Pressure leaching recovers tungsten from the feed liquid.",
    cryo: "Cryo-sintering forces tungsten out of suspension as dense crystals.",
    magma: "Carbide precipitation from plasma-slag tungsten melts.",
  },
};

function makeRequirements(req) {
  let flat = [];
  for (let i = 0; i < req.length; i++) {
    flat.push(req[i][0], req[i][1]);
  }
  return ItemStack.with.apply(null, flat);
}

// outputs: { item: ItemStack } | { items: ItemStack[] } | { liquid: LiquidStack }
// liquid: { liquid: Liquid, amount: number } or array of those (consumed inputs)
// consumeItems: array of [item, amount] pairs (consumed item inputs)
function makeCrafter(name, craftTime, size, req, power, liquid, consumeItems, localizedName, description, style, planet, outputs, capacity) {
  const block = extend(GenericCrafter, name, {});
  block.requirements = makeRequirements(req);
  if (outputs != null && outputs.items != null) {
    block.outputItems = outputs.items;
  } else if (outputs != null && outputs.liquid != null) {
    block.outputLiquid = outputs.liquid;
  } else {
    block.outputItem = outputs != null && outputs.item != null ? outputs.item : new ItemStack(Items.copper, 1);
  }
  block.craftTime = craftTime;
  block.size = size;
  block.category = Category.production;
  block.buildVisibility = BuildVisibility.shown;
  block.shownPlanets.add(planet);
  block.itemCapacity = capacity || 30;
  block.health = 200 * size;
  block.localizedName = localizedName;
  block.description = description;
  block.warmupSpeed = 0.04;
  // research cost scales off build cost; keep it modest
  block.researchCostMultiplier = 0.1;
  if (consumeItems != null) {
    for (let i = 0; i < consumeItems.length; i++) {
      block.consumeItem(consumeItems[i][0], consumeItems[i][1]);
    }
  }
  if (liquid != null) {
    const list = Array.isArray(liquid) ? liquid : [liquid];
    for (let i = 0; i < list.length; i++) {
      block.consumeLiquid(list[i].liquid, list[i].amount);
    }
    block.liquidCapacity = 40;
  }
  if (outputs != null && outputs.liquid != null) {
    block.liquidCapacity = 60;
  }
  if (power != null) {
    block.consumePower(power);
  }
  applyAmbiance(block, style);
  applyDrawer(block, style);
  return block;
}

// weighted random single-output crafter: consumes the recipe once, then emits
// exactly ONE of the listed items chosen by weight (used by the synthesizers).
function makeRandomCrafter(name, craftTime, size, req, power, consumeItems, localizedName, description, planet, entries, capacity) {
  let totalWeight = 0;
  const stacks = [];
  for (let i = 0; i < entries.length; i++) {
    totalWeight += entries[i].weight;
    stacks.push(new ItemStack(entries[i].item, entries[i].amount));
  }
  const block = extend(GenericCrafter, name, {});
  block.outputItems = stacks;
  block.requirements = makeRequirements(req);
  block.craftTime = craftTime;
  block.size = size;
  block.category = Category.production;
  block.buildVisibility = BuildVisibility.shown;
  block.shownPlanets.add(planet);
  block.itemCapacity = capacity || 30;
  block.health = 200 * size;
  block.localizedName = localizedName;
  block.description = description;
  block.warmupSpeed = 0.04;
  block.researchCostMultiplier = 0.1;
  if (consumeItems != null) {
    for (let i = 0; i < consumeItems.length; i++) {
      block.consumeItem(consumeItems[i][0], consumeItems[i][1]);
    }
  }
  if (power != null) block.consumePower(power);
  applyAmbiance(block, "synthesizer");
  applyDrawer(block, "synthesizer");
  // craft() lives on the building, not the block: override it via buildType so
  // each cycle emits exactly ONE weighted output instead of all outputs at once.
  block.buildType = () => extend(GenericCrafter.GenericCrafterBuild, block, {
    craft() {
      this.consume();
      let r = Math.random() * totalWeight;
      let chosen = entries[entries.length - 1];
      for (let i = 0; i < entries.length; i++) {
        r -= entries[i].weight;
        if (r <= 0) {
          chosen = entries[i];
          break;
        }
      }
      this.items.add(chosen.item, chosen.amount);
      if (this.wasVisible) this.block.craftEffect.at(this.x, this.y, this.rotation);
    }
  });
  return block;
}

// tier identity through sound + particles
function applyAmbiance(block, style) {
  if (style === "powered" || style === "synthesizer") {
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
  } else if (style === "magma") {
    block.ambientSound = Sounds.loopCombustion;
    block.ambientSoundVolume = 0.10;
    block.craftEffect = Fx.smoke;
    block.updateEffect = Fx.fire;
    block.updateEffectChance = 0.06;
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

// build a 5-tier chain for one ore; liquidTier is the liquid used by the 3rd tier,
// magmaTier the liquid used by the 5th tier (slag on Serpulo, gallium on Erekir).
function buildChain(ore, liquidTier, magmaTier, planet) {
  const f = flavor[ore.id];
  const chain = {
    id: ore.id,
    name: ore.name,
    powered: makeCrafter(ore.id + "-gen",
      ore.powered.craftTime, 2, enrichedReq(ore.powered.req, 0), ore.powered.power, null, null,
      ore.name + " Generator",
      f.powered + "\n" +
      "Power: " + Math.round(ore.powered.power * 60) + " power/sec.", "powered", planet, { item: new ItemStack(ore.item, 1) }),
    unpowered: makeCrafter(ore.id + "-gen-unpowered",
      ore.unpowered.craftTime, 2, enrichedReq(ore.unpowered.req, 1), null, null, null,
      ore.name + " Generator (Passive)",
      f.unpowered + "\n" +
      "No power required, but heavy and slow. Expensive to build.", "unpowered", planet, { item: new ItemStack(ore.item, 1) }),
    water: makeCrafter(ore.id + "-gen-water",
      ore.water.craftTime, 3, enrichedReq(ore.water.req, 2), null, { liquid: liquidTier, amount: ore.water.liquid }, null,
      ore.name + " Liquid Generator",
      f.water + "\n" +
      "Consumes " + liquidTier.name + ": " + Math.round(ore.water.liquid * 10) / 10 + " per second. No power required.", "water", planet, { item: new ItemStack(ore.item, 1) }),
    cryo: makeCrafter(ore.id + "-gen-cryo",
      ore.cryo.craftTime, 3, enrichedReq(ore.cryo.req, 3), ore.cryo.power, { liquid: Liquids.cryofluid, amount: ore.cryo.liquid }, null,
      ore.name + " Cryo Generator",
      f.cryo + "\n" +
      "The fastest generator type. Needs power and cryofluid.", "cryo", planet, { item: new ItemStack(ore.item, 1) }),
    magma: makeCrafter(ore.id + "-gen-magma",
      ore.magma.craftTime, 4, ore.magma.req, ore.magma.power,
      [{ liquid: magmaTier, amount: ore.magma.liquid[0] }, { liquid: Liquids.cryofluid, amount: ore.magma.liquid[1] }], null,
      ore.name + " Magma Generator",
      f.magma + "\n" +
      "The ultimate generator. Consumes " + magmaTier.name + " and cryofluid with power for maximum output.", "magma", planet, { item: new ItemStack(ore.item, 1) }, 60),
  };
  chains.push(chain);
  allGenerators.push(chain.powered, chain.unpowered, chain.water, chain.cryo, chain.magma);
}

// collect every block so upgrades can recompute stats from base values
let chains = [];
let allGenerators = [];
for (let i = 0; i < oreDefs.length; i++) {
  buildChain(oreDefs[i], Liquids.water, Liquids.slag, Planets.serpulo);
}
for (let i = 0; i < erekirOreDefs.length; i++) {
  buildChain(erekirOreDefs[i], Liquids.ozone, Liquids.gallium, Planets.erekir);
}// ---- liquid-producing generators (self-contained resource generation) ----
// 3x3 on both planets: a clear upgrade over the vanilla 2x2 water/ozone generators.
function makeLiquidProducer(name, title, desc, liquidOut, outAmount, craftTime, size, req, power, liquid, consumeItems, planet, style) {
  const b = makeCrafter(name, craftTime, size, req, power, liquid, consumeItems,
    title, desc, style, planet,
    { liquid: new LiquidStack(liquidOut, outAmount) }, 40);
  return b;
}

// Serpulo
const waterGen = makeLiquidProducer("water-gen", "Water Generator",
  "Condenses atmospheric moisture into clean water at industrial rates.\n" +
  "Produces water: 6/sec. Needs power. An upgraded water extractor.",
  Liquids.water, 1, 10, 3,
  [[Items.copper, 350], [Items.lead, 250], [Items.graphite, 150], [Items.silicon, 100]],
  0.1, null, null, Planets.serpulo, "water");

const cryofluidGen = makeLiquidProducer("cryofluid-gen", "Cryofluid Generator",
  "Freezes refined water and titanium into supercooled cryofluid.\n" +
  "Consumes water and titanium. Produces cryofluid: 2/sec. Very expensive.",
  Liquids.cryofluid, 1, 30, 3,
  [[Items.titanium, 300], [Items.graphite, 220], [Items.silicon, 220], [Items.plastanium, 150]],
  0.15, { liquid: Liquids.water, amount: 1 }, [[Items.titanium, 1]], Planets.serpulo, "cryo");

const slagGen = makeLiquidProducer("slag-gen", "Slag Generator",
  "Melts coal and sand into molten slag in an alloy-ceramic crucible.\n" +
  "Consumes sand and coal. Produces slag: 2/sec. Absurdly expensive.",
  Liquids.slag, 1, 30, 3,
  [[Items.thorium, 200], [Items.plastanium, 180], [Items.phaseFabric, 150], [Items.surgeAlloy, 100], [Items.silicon, 300]],
  0.2, null, [[Items.sand, 1], [Items.coal, 1]], Planets.serpulo, "magma");

// Erekir
const ozoneGen = makeLiquidProducer("ozone-gen", "Ozone Generator",
  "Electrolyzes trace atmosphere into reactive ozone at industrial rates.\n" +
  "Produces ozone: 6/sec. Needs power. An upgraded ozone generator.",
  Liquids.ozone, 1, 10, 3,
  [[Items.beryllium, 350], [Items.graphite, 250], [Items.silicon, 100], [Items.tungsten, 60]],
  0.1, null, null, Planets.erekir, "water");

const cryofluidGenErekir = makeLiquidProducer("erekir-cryofluid-gen", "Cryofluid Generator",
  "Condenses ozone and tungsten dust into supercooled cryofluid.\n" +
  "Consumes ozone and tungsten. Produces cryofluid: 2/sec. Very expensive.",
  Liquids.cryofluid, 1, 30, 3,
  [[Items.tungsten, 300], [Items.oxide, 120], [Items.silicon, 220], [Items.plastanium, 150]],
  0.15, { liquid: Liquids.ozone, amount: 1 }, [[Items.tungsten, 1]], Planets.erekir, "cryo");

const galliumGen = makeLiquidProducer("gallium-gen", "Gallium Generator",
  "Vaporizes tungsten anodes and condenses the vapor into liquid gallium.\n" +
  "Consumes ozone and tungsten. Produces gallium: 2/sec. Absurdly expensive.",
  Liquids.gallium, 1, 30, 3,
  [[Items.thorium, 200], [Items.tungsten, 240], [Items.phaseFabric, 150], [Items.surgeAlloy, 100], [Items.silicon, 300]],
  0.2, { liquid: Liquids.ozone, amount: 1 }, [[Items.tungsten, 1]], Planets.erekir, "magma");

allGenerators.push(waterGen, cryofluidGen, slagGen, ozoneGen, cryofluidGenErekir, galliumGen);

// ---- multi-ore variant synthesizers (Serpulo only) ----
// Each cycle emits ONE output chosen by weight (not a bulk of all outputs).
const basicSynth = makeRandomCrafter("basic-synthesizer", 120, 4,
  [[Items.copper, 1500], [Items.lead, 1200], [Items.graphite, 300]],
  0.15, null,
  "Basic Ore Synthesizer",
  "Synthesizes basic ores from a single heavy feedstock bed.\n" +
  "Each cycle emits ONE output chosen by weight: 30% copper, 30% lead, 20% scrap, 10% coal and 10% sand. Huge copper and lead cost.",
  Planets.serpulo,
  [
    { item: Items.copper, amount: 3, weight: 30 },
    { item: Items.lead, amount: 3, weight: 30 },
    { item: Items.scrap, amount: 2, weight: 20 },
    { item: Items.coal, amount: 1, weight: 10 },
    { item: Items.sand, amount: 1, weight: 10 },
  ], 80);

const refinedSynth = makeRandomCrafter("refined-synthesizer", 130, 4,
  [[Items.silicon, 500], [Items.graphite, 400], [Items.copper, 500], [Items.lead, 400]],
  0.18, null,
  "Refined Ore Synthesizer",
  "Refines the base feedstock to also yield titanium.\n" +
  "Each cycle emits ONE output chosen by weight from copper, lead, coal, scrap, sand and titanium. Requires silicon and graphite to build.",
  Planets.serpulo,
  [
    { item: Items.copper, amount: 3, weight: 30 },
    { item: Items.lead, amount: 3, weight: 30 },
    { item: Items.coal, amount: 1, weight: 10 },
    { item: Items.scrap, amount: 1, weight: 10 },
    { item: Items.sand, amount: 1, weight: 10 },
    { item: Items.titanium, amount: 1, weight: 10 },
  ], 80);

const advancedSynth = makeRandomCrafter("advanced-synthesizer", 140, 4,
  [[Items.titanium, 400], [Items.plastanium, 250], [Items.silicon, 300], [Items.thorium, 200], [Items.copper, 400], [Items.lead, 300]],
  0.2, null,
  "Advanced Ore Synthesizer",
  "The apex synthesizer, adding radioactive thorium to the output stream.\n" +
  "Each cycle emits ONE output chosen by weight from copper, lead, coal, scrap, sand, titanium and thorium. Requires titanium and plastanium to build.",
  Planets.serpulo,
  [
    { item: Items.copper, amount: 2, weight: 25 },
    { item: Items.lead, amount: 2, weight: 25 },
    { item: Items.coal, amount: 1, weight: 10 },
    { item: Items.scrap, amount: 1, weight: 10 },
    { item: Items.sand, amount: 1, weight: 10 },
    { item: Items.titanium, amount: 1, weight: 10 },
    { item: Items.thorium, amount: 1, weight: 10 },
  ], 80);

allGenerators.push(basicSynth, refinedSynth, advancedSynth);

// cheap coal-from-scrap refiner (Serpulo only): no graphite, no power, works on Ground Zero.
const scrapCoalExtractor = makeCrafter("scrap-coal-extractor", 1.5, 2,
  [[Items.copper, 50], [Items.lead, 30], [Items.scrap, 25]],
  null, null, [[Items.scrap, 10]],
  "Scrap Coal Extractor",
  "Recovers carbon from scrap metal and reclaims it as coal.\n" +
  "Consumes 10 scrap per cycle, outputs 1 coal. No power and no graphite required — usable on Ground Zero.",
  "unpowered", Planets.serpulo, { item: new ItemStack(Items.coal, 1) });
allGenerators.push(scrapCoalExtractor);

// record base stats so upgrades can recompute from them
const baseCraftTime = {};
const baseCapacity = {};
const baseOutput = {};
const baseOutputs = {};
const baseLiquid = {};
const basePower = {};
for (let i = 0; i < allGenerators.length; i++) {
  const b = allGenerators[i];
  baseCraftTime[b.name] = b.craftTime;
  baseCapacity[b.name] = b.itemCapacity;
  if (b.outputItem != null) baseOutput[b.name] = b.outputItem.amount;
  if (b.outputItems != null) {
    baseOutputs[b.name] = [];
    for (let k = 0; k < b.outputItems.length; k++) {
      baseOutputs[b.name].push(b.outputItems[k].amount);
    }
  }
  if (b.outputLiquid != null) baseLiquid[b.name] = b.outputLiquid.amount;
  if (b.consPower != null) basePower[b.name] = b.consPower.usage;
}

// ---- research tree ----
// Serpulo chains anchor to pneumatic drill, Erekir to plasmaBore.
// Each tier is gated by 3 research milestones (see below).
const drillNode = TechTree.all.find(t => t.content === Blocks.pneumaticDrill);
const erekirNode = TechTree.all.find(t => t.content === Blocks.plasmaBore);

// ---- global research upgrades ----
// Hidden blocks act as research nodes; unlocking them scales all generators.
const speedUpgrades = [];
const capacityUpgrades = [];
const outputUpgrades = [];
const efficiencyUpgrades = [];
const speedStep = 0.9;      // each level: craftTime *= 0.9  (-10%)
const capacityStep = 10;    // each level: itemCapacity += 10
const outputStep = 2;       // each level: output stack *= 2
const efficiencyStep = 0.85; // each level: power usage *= 0.85 (-15%)

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// creates hidden upgrade content (no tech node), linked into both planet trees.
function makeUpgrade(name, title, description) {
  const up = extend(GenericCrafter, name, {});
  up.requirements = ItemStack.empty;
  up.buildVisibility = BuildVisibility.hidden;
  up.category = Category.production;
  up.shownPlanets.add(Planets.serpulo);
  up.shownPlanets.add(Planets.erekir);
  up.size = 1;
  up.localizedName = title;
  up.description = description;
  return up;
}

// a hidden content-only gate block (no tech node); linked via makeUpgradePairChain.
function makeGate(name, title, description) {
  const m = extend(GenericCrafter, name, {});
  m.requirements = ItemStack.empty;
  m.buildVisibility = BuildVisibility.hidden;
  m.category = Category.production;
  m.shownPlanets.add(Planets.serpulo);
  m.shownPlanets.add(Planets.erekir);
  m.size = 1;
  m.localizedName = title;
  m.description = description;
  return m;
}

// a research milestone: a hidden block used purely as a tech-tree gate.
function makeMilestone(name, title, description, parent, cost) {
  const m = extend(GenericCrafter, name, {});
  m.requirements = ItemStack.empty;
  m.buildVisibility = BuildVisibility.hidden;
  m.category = Category.production;
  m.shownPlanets.add(Planets.serpulo);
  m.shownPlanets.add(Planets.erekir);
  m.size = 1;
  m.localizedName = title;
  m.description = description;
  const node = new TechTree.TechNode(parent, m, cost);
  return { block: m, node: node };
}

// build an interleaved chain: parent -> gate1 -> upgrade1 -> gate2 -> upgrade2 -> ...
// on a single planet's tree. gates[i]/ups[i] are content blocks; costs[i] are gate costs.
function makeUpgradePairChain(parent, gates, ups, gateCosts, upCosts) {
  let cur = parent;
  const nodes = [];
  for (let i = 0; i < ups.length; i++) {
    cur = new TechTree.TechNode(cur, gates[i], gateCosts[i]);
    cur = new TechTree.TechNode(cur, ups[i], upCosts[i]);
    nodes.push(cur);
  }
  return nodes; // nodes[i] = tech node of upgrade i
}

// define a full upgrade line: 10 gate+upgrade pairs. Returns the content arrays.
function defineUpgradeLine(kind, title, gateDescs, upDesc) {
  const gates = [];
  const ups = [];
  for (let i = 0; i < 10; i++) {
    const gd = typeof gateDescs === "function" ? gateDescs(i + 1) : gateDescs[i];
    const ud = typeof upDesc === "function" ? upDesc(i + 1) : upDesc;
    gates.push(makeGate("upgrade-research-" + kind + "-" + (i + 1), title + " Research " + roman[i], gd));
    ups.push(makeUpgrade("generator-" + kind + "-" + (i + 1), title + " " + roman[i], ud));
  }
  return { gates: gates, ups: ups };
}

// 10-level cost curve; each level is pricier and demands more advanced materials.
const upgradeStages = [
  [[Items.copper, 400], [Items.lead, 250]],
  [[Items.copper, 650], [Items.lead, 400]],
  [[Items.copper, 950], [Items.lead, 600], [Items.titanium, 200]],
  [[Items.copper, 1300], [Items.lead, 850], [Items.titanium, 350], [Items.graphite, 300]],
  [[Items.copper, 1800], [Items.lead, 1200], [Items.titanium, 550], [Items.graphite, 500], [Items.thorium, 150]],
  [[Items.copper, 2400], [Items.lead, 1600], [Items.titanium, 800], [Items.graphite, 700], [Items.thorium, 300]],
  [[Items.copper, 3200], [Items.lead, 2100], [Items.titanium, 1100], [Items.thorium, 500], [Items.plastanium, 150], [Items.silicon, 800]],
  [[Items.copper, 4200], [Items.lead, 2800], [Items.titanium, 1500], [Items.thorium, 800], [Items.plastanium, 300], [Items.silicon, 1200], [Items.phaseFabric, 150]],
  [[Items.copper, 5600], [Items.lead, 3700], [Items.titanium, 2000], [Items.thorium, 1200], [Items.plastanium, 500], [Items.silicon, 1800], [Items.phaseFabric, 300], [Items.surgeAlloy, 120]],
  [[Items.copper, 7400], [Items.lead, 4900], [Items.titanium, 2600], [Items.thorium, 1800], [Items.plastanium, 800], [Items.silicon, 2600], [Items.phaseFabric, 500], [Items.surgeAlloy, 250]],
];
function upgradeCost(n) {
  const pairs = upgradeStages[n - 1];
  let flat = [];
  for (let i = 0; i < pairs.length; i++) {
    flat.push(pairs[i][0], pairs[i][1]);
  }
  return ItemStack.with.apply(null, flat);
}

const speedGateDescs = [
  "Study high-yield atmospheric capture techniques.",
  "Refine synthesis throughput and energy efficiency.",
  "Develop vacuum-assisted capture manifolds.",
  "Engineer hypersonic intake cyclones.",
  "Stabilize resonant capture frequencies.",
  "Integrate toroidal capture rings.",
  "Achieve quantum-adjacent capture meshes.",
  "Master relativistic intake compression.",
  "Harness exotic capture resonance.",
  "Reach the absolute ceiling of capture speed.",
];
const capGateDescs = [
  "Study stockpile and buffer design.",
  "Engineer larger internal storage bays.",
  "Develop modular expansion cartridges.",
  "Integrate compressed storage lattices.",
  "Engineer dimensional cargo pockets.",
  "Install phased buffer reservoirs.",
  "Route alloy-reinforced silo frames.",
  "Deploy self-assembling storage lattices.",
  "Fold space into the buffer bays.",
  "Attain the ultimate internal volume.",
];
const outGateDescs = [
  "Develop multi-output crystallization.",
  "Refine density to double output again.",
  "Introduce phase-shifted crystallizers.",
  "Harness alloy-braced output cores.",
  "Deploy resonant doubling chambers.",
  "Engineer entangled output matrices.",
  "Install plasma-forged ejectors.",
  "Achieve exponential crystallite growth.",
  "Master metadimensional stacking.",
  "Unlock infinite recursion of output.",
];
const effGateDescs = [
  "Study power-efficient synthesis.",
  "Refine energy recovery systems.",
  "Introduce superconducting bus bars.",
  "Harness waste-heat recapture.",
  "Deploy harmonic power routing.",
  "Install inertial energy storage.",
  "Engineer self-cooling converters.",
  "Achieve lossless energy loops.",
  "Master zero-point efficiency.",
  "Reach perfect energy circulation.",
];

const speedLine = defineUpgradeLine("speed", "Generator Speed", speedGateDescs, "All generators produce 10% faster.");
const capLine = defineUpgradeLine("capacity", "Generator Capacity", capGateDescs, "All generators hold 10 more items.");
const outLine = defineUpgradeLine("output", "Generator Output", outGateDescs, "All generators double their output.");
const effLine = defineUpgradeLine("efficiency", "Generator Efficiency", effGateDescs, "Powered generators use 15% less power.");

speedUpgrades.push.apply(speedUpgrades, speedLine.ups);
capacityUpgrades.push.apply(capacityUpgrades, capLine.ups);
outputUpgrades.push.apply(outputUpgrades, outLine.ups);
efficiencyUpgrades.push.apply(efficiencyUpgrades, effLine.ups);

// link each line into a planet tree, interleaving gate and upgrade:
// parent -> gate1 -> upgrade1 -> gate2 -> upgrade2 -> ... -> gate10 -> upgrade10
// returns the array of upgrade tech nodes (index i = upgrade i).
function linkUpgradeLine(root, line) {
  const gateCosts = [];
  const upCosts = [];
  for (let i = 0; i < 10; i++) {
    gateCosts.push(upgradeCost(i + 1));
    upCosts.push(upgradeCost(i + 1));
  }
  return makeUpgradePairChain(root, line.gates, line.ups, gateCosts, upCosts);
}

// ---- per-ore research milestones ----
const oreScale = {
  copper: 1.0, lead: 1.1, coal: 1.2, titanium: 1.6, scrap: 0.9,
  thorium: 2.2, sand: 0.8, beryllium: 1.4, tungsten: 2.0,
};

// milestone base amounts per tier (primary cost, multiplied by ore scale, rounded to 50)
const milestoneTiers = [
  { base: [150, 300, 500] },    // tier 1 (powered)
  { base: [700, 1000, 1400] },  // tier 2 (unpowered)
  { base: [1800, 2400, 3200] }, // tier 3 (liquid)
  { base: [4500, 6000, 8000] }, // tier 4 (cryo)
  { base: [12000, 16000, 22000] }, // tier 5 (magma): huge
];

const milestoneTitles = [
  ["Atmospheric Analysis", "Ion Capture Theory", "Electrostatic Prototype"],
  ["Passive Condensation", "Settling Chamber", "Mechanical Condenser"],
  ["Filtration Membranes", "Solvent Recovery", "Liquid Extraction Cell"],
  ["Cryogenic Theory", "Freeze Bath Design", "Cryo Synthesis Unit"],
  ["Magma Channeling", "Plasma Crucible", "Alloy Core"],
];

const tierNames = ["Powered", "Passive", "Liquid", "Cryo", "Magma"];

// cost helper: primary amount = round(base * scale, 50); secondaries scale with tier depth.
function milestoneCost(ore, tierIndex, stepIndex) {
  const scale = oreScale[ore.id] || 1.0;
  const base = milestoneTiers[tierIndex].base[stepIndex];
  const primary = Math.round((base * scale) / 50) * 50;
  const flat = [ore.item, primary];
  // secondaries per tier: tier 2 graphite, tier 3 rare metal, tier 4 deep metal.
  // Serpulo: graphite / titanium / thorium. Erekir: graphite / tungsten / oxide.
  if (tierIndex >= 1) flat.push(Items.graphite, Math.round(primary * 0.3 / 25) * 25);
  if (tierIndex >= 2) {
    const rare = ore.id === "beryllium" ? Items.tungsten : Items.titanium;
    flat.push(rare, Math.round(primary * 0.15 / 25) * 25);
  }
  if (tierIndex >= 3) {
    const deep = ore.id === "tungsten" ? Items.oxide : Items.thorium;
    flat.push(deep, Math.round(primary * 0.08 / 25) * 25);
  }
  if (tierIndex >= 4) {
    flat.push(Items.plastanium, Math.round(primary * 0.06 / 25) * 25);
    flat.push(Items.phaseFabric, Math.round(primary * 0.04 / 25) * 25);
  }
  return ItemStack.with.apply(null, flat);
}

const oreMilestoneBlocks = [];
// attach research gates per ore chain, before the tier unlocks
if (drillNode != null) {
  for (let i = 0; i < chains.length; i++) {
    const c = chains[i];
    if (!c.powered.shownPlanets.contains(Planets.serpulo)) continue;
    const f = flavor[c.id];
    const tiers = [c.powered, c.unpowered, c.water, c.cryo, c.magma];
    let cur = drillNode;
    for (let t = 0; t < 5; t++) {
      for (let s = 0; s < 3; s++) {
        const title = c.name + " Generator: " + milestoneTitles[t][s];
        const desc = "Research milestone for the " + tierNames[t] + " " + c.name.toLowerCase() + " generator.\n" +
          (f ? f[["powered", "unpowered", "water", "cryo", "magma"][t]] : "") + "\n" +
          "Unlocks the " + tierNames[t].toLowerCase() + " tier.";
        const made = makeMilestone(c.id + "-research-" + (t + 1) + "-" + (s + 1), title, desc, cur, milestoneCost({ id: c.id, item: c.powered.outputItem.item }, t, s));
        oreMilestoneBlocks.push(made.block);
        cur = made.node;
      }
      const tierNode = new TechTree.TechNode(cur, tiers[t], tiers[t].researchRequirements());
      cur = tierNode;
    }
  }
} else {
  Log.err("ore-gens: could not find pneumatic drill tech node; research not attached.");
}

if (erekirNode != null) {
  for (let i = 0; i < chains.length; i++) {
    const c = chains[i];
    if (!c.powered.shownPlanets.contains(Planets.erekir)) continue;
    const f = flavor[c.id];
    const tiers = [c.powered, c.unpowered, c.water, c.cryo, c.magma];
    let cur = erekirNode;
    for (let t = 0; t < 5; t++) {
      for (let s = 0; s < 3; s++) {
        const title = c.name + " Generator: " + milestoneTitles[t][s];
        const desc = "Research milestone for the " + tierNames[t] + " " + c.name.toLowerCase() + " generator.\n" +
          (f ? f[["powered", "unpowered", "water", "cryo", "magma"][t]] : "") + "\n" +
          "Unlocks the " + tierNames[t].toLowerCase() + " tier.";
        const made = makeMilestone(c.id + "-research-" + (t + 1) + "-" + (s + 1), title, desc, cur, milestoneCost({ id: c.id, item: c.powered.outputItem.item }, t, s));
        oreMilestoneBlocks.push(made.block);
        cur = made.node;
      }
      const tierNode = new TechTree.TechNode(cur, tiers[t], tiers[t].researchRequirements());
      cur = tierNode;
    }
  }
} else {
  Log.err("ore-gens: could not find plasmaBore tech node; Erekir research not attached.");
}

// ---- liquid generator research chains ----
// Milestone chains are built inline (module scope) exactly like the per-ore
// chains; the chainResearch helper below is kept for reference only.
function chainResearch(root, names, titles, desc, costs, capstone) {
  let cur = root;
  let i = 0;
  while (i < 3) {
    var made = makeMilestone(names[i], titles[i], desc + " (Step " + (i + 1) + " of 3).", cur, costs[i]);
    oreMilestoneBlocks.push(made.block);
    cur = made.node;
    i++;
  }
  return new TechTree.TechNode(cur, capstone, capstone.researchRequirements());
}

const waterCosts = [
  ItemStack.with(Items.copper, 300, Items.lead, 200, Items.graphite, 80),
  ItemStack.with(Items.copper, 500, Items.lead, 350, Items.graphite, 150, Items.silicon, 100),
  ItemStack.with(Items.copper, 800, Items.lead, 550, Items.graphite, 250, Items.silicon, 180),
];
const cryoCosts = [
  ItemStack.with(Items.titanium, 250, Items.graphite, 200, Items.silicon, 150),
  ItemStack.with(Items.titanium, 400, Items.graphite, 300, Items.silicon, 250, Items.plastanium, 80),
  ItemStack.with(Items.titanium, 650, Items.graphite, 450, Items.silicon, 400, Items.plastanium, 150, Items.phaseFabric, 80),
];
const slagCosts = [
  ItemStack.with(Items.thorium, 400, Items.plastanium, 200, Items.silicon, 400, Items.phaseFabric, 120),
  ItemStack.with(Items.thorium, 700, Items.plastanium, 350, Items.silicon, 700, Items.phaseFabric, 200, Items.surgeAlloy, 100),
  ItemStack.with(Items.thorium, 1100, Items.plastanium, 550, Items.silicon, 1100, Items.phaseFabric, 320, Items.surgeAlloy, 180),
];
const ozoneCosts = [
  ItemStack.with(Items.beryllium, 300, Items.graphite, 200, Items.tungsten, 80),
  ItemStack.with(Items.beryllium, 500, Items.graphite, 350, Items.tungsten, 150, Items.silicon, 100),
  ItemStack.with(Items.beryllium, 800, Items.graphite, 550, Items.tungsten, 250, Items.silicon, 200),
];
const erekirCryoCosts = [
  ItemStack.with(Items.tungsten, 250, Items.oxide, 100, Items.silicon, 150),
  ItemStack.with(Items.tungsten, 400, Items.oxide, 160, Items.silicon, 250, Items.plastanium, 80),
  ItemStack.with(Items.tungsten, 650, Items.oxide, 250, Items.silicon, 400, Items.plastanium, 150, Items.phaseFabric, 80),
];
const galliumCosts = [
  ItemStack.with(Items.thorium, 400, Items.tungsten, 400, Items.phaseFabric, 120, Items.silicon, 400),
  ItemStack.with(Items.thorium, 700, Items.tungsten, 700, Items.phaseFabric, 200, Items.silicon, 700, Items.surgeAlloy, 100),
  ItemStack.with(Items.thorium, 1100, Items.tungsten, 1100, Items.phaseFabric, 320, Items.silicon, 1100, Items.surgeAlloy, 180),
];

if (drillNode != null) {
  // cheap coal-from-scrap refiner, available early (Ground Zero)
  new TechTree.TechNode(drillNode, scrapCoalExtractor, ItemStack.with(Items.copper, 150, Items.lead, 100, Items.scrap, 75));
  // liquid producers stack one chain under the next (water -> cryofluid -> slag),
  // using the exact same inline milestone-loop pattern as the per-ore chains.
  let cur = drillNode;
  const wTitles = [
    ["Water Extraction Theory", "Condensation Cycles", "Atmospheric Capture Unit"],
    ["Cryofluid Chilling", "Cryo Bath Design", "Cryofluid Synthesis Unit"],
    ["Magma Channeling", "Crucible Metallurgy", "Molten Slag Vessel"],
  ];
  const wNames = [["water-research-1", "water-research-2", "water-research-3"],
                  ["cryofluid-research-1", "cryofluid-research-2", "cryofluid-research-3"],
                  ["slag-research-1", "slag-research-2", "slag-research-3"]];
  const wCosts = [waterCosts, cryoCosts, slagCosts];
  const wGens = [waterGen, cryofluidGen, slagGen];
  const wDesc = ["Water Generator", "Cryofluid Generator", "Slag Generator"];
  for (let c = 0; c < 3; c++) {
    for (let s = 0; s < 3; s++) {
      const made = makeMilestone(wNames[c][s], wTitles[c][s], "Research milestone for the " + wDesc[c] + ". (Step " + (s + 1) + " of 3).", cur, wCosts[c][s]);
      oreMilestoneBlocks.push(made.block);
      cur = made.node;
    }
    cur = new TechTree.TechNode(cur, wGens[c], wGens[c].researchRequirements());
  }

  // synthesizer chains (Serpulo only), same inline pattern
  let s = drillNode;
  const sTitles = [
    ["Feedstock Blending", "Multiplex Casting", "Basic Synthesizer Frame"],
    ["Refining Catalysts", "Titanium Reduction", "Refined Synthesizer Frame"],
    ["Thorium Enrichment", "Plastanium Casting", "Advanced Synthesizer Frame"],
  ];
  const sCosts = [
    [ItemStack.with(Items.copper, 1200, Items.lead, 900),
     ItemStack.with(Items.copper, 2000, Items.lead, 1500, Items.graphite, 400),
     ItemStack.with(Items.copper, 3200, Items.lead, 2400, Items.graphite, 700, Items.silicon, 300)],
    [ItemStack.with(Items.silicon, 400, Items.graphite, 350, Items.copper, 600),
     ItemStack.with(Items.silicon, 700, Items.graphite, 600, Items.copper, 1000, Items.titanium, 200),
     ItemStack.with(Items.silicon, 1100, Items.graphite, 900, Items.titanium, 350, Items.plastanium, 150)],
    [ItemStack.with(Items.titanium, 400, Items.plastanium, 250, Items.silicon, 500, Items.thorium, 150),
     ItemStack.with(Items.titanium, 700, Items.plastanium, 450, Items.silicon, 900, Items.thorium, 250, Items.phaseFabric, 100),
     ItemStack.with(Items.titanium, 1100, Items.plastanium, 700, Items.silicon, 1400, Items.thorium, 400, Items.phaseFabric, 180)],
  ];
  const sGens = [basicSynth, refinedSynth, advancedSynth];
  const sDesc = ["Basic Ore Synthesizer", "Refined Ore Synthesizer", "Advanced Ore Synthesizer"];
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 3; i++) {
      const made = makeMilestone("synthesizer-research-" + (c + 1) + "-" + (i + 1), sTitles[c][i], "Research milestone for the " + sDesc[c] + ". (Step " + (i + 1) + " of 3).", s, sCosts[c][i]);
      oreMilestoneBlocks.push(made.block);
      s = made.node;
    }
    s = new TechTree.TechNode(s, sGens[c], sGens[c].researchRequirements());
  }
}

if (erekirNode != null) {
  // same stacking as Serpulo: ozone -> cryofluid -> gallium, inline milestone loop.
  let cur = erekirNode;
  const eTitles = [
    ["Ozone Discharge", "Corona Cycling", "Atmospheric Ozone Unit"],
    ["Cryofluid Chilling", "Cryo Bath Design", "Cryofluid Synthesis Unit"],
    ["Gallium Compression", "Magma Pressure", "Molten Gallium Vessel"],
  ];
  const eNames = [["ozone-research-1", "ozone-research-2", "ozone-research-3"],
                  ["erekir-cryofluid-research-1", "erekir-cryofluid-research-2", "erekir-cryofluid-research-3"],
                  ["gallium-research-1", "gallium-research-2", "gallium-research-3"]];
  const eCosts = [ozoneCosts, erekirCryoCosts, galliumCosts];
  const eGens = [ozoneGen, cryofluidGenErekir, galliumGen];
  const eDesc = ["Ozone Generator", "Cryofluid Generator", "Gallium Generator"];
  for (let c = 0; c < 3; c++) {
    for (let i = 0; i < 3; i++) {
      const made = makeMilestone(eNames[c][i], eTitles[c][i], "Research milestone for the " + eDesc[c] + ". (Step " + (i + 1) + " of 3).", cur, eCosts[c][i]);
      oreMilestoneBlocks.push(made.block);
      cur = made.node;
    }
    cur = new TechTree.TechNode(cur, eGens[c], eGens[c].researchRequirements());
  }
}

// ---- upgrade research gates ----
// Each line is linked into both planet trees; Output hangs off Speed I,
// Efficiency off Speed X.
if (drillNode != null) {
  const speedNodes = linkUpgradeLine(drillNode, speedLine);
  linkUpgradeLine(drillNode, capLine);
  linkUpgradeLine(speedNodes[0], outLine);
  linkUpgradeLine(speedNodes[speedLine.ups.length - 1], effLine);
}
if (erekirNode != null) {
  const speedNodes = linkUpgradeLine(erekirNode, speedLine);
  linkUpgradeLine(erekirNode, capLine);
  linkUpgradeLine(speedNodes[0], outLine);
  linkUpgradeLine(speedNodes[speedLine.ups.length - 1], effLine);
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
    if (baseOutput[b.name] != null) {
      b.outputItem.amount = baseOutput[b.name] * outputMult;
    }
    if (baseOutputs[b.name] != null) {
      for (let k = 0; k < b.outputItems.length; k++) {
        b.outputItems[k].amount = Math.floor(baseOutputs[b.name][k] * outputMult);
      }
    }
    if (baseLiquid[b.name] != null) {
      b.outputLiquid.amount = baseLiquid[b.name] * outputMult;
    }
    if (b.consPower != null && basePower[b.name] != null) {
      b.consPower.usage = basePower[b.name] * powerMult;
    }
  }
}

Events.on(EventType.ContentInitEvent, () => applyUpgrades());
// applyUpgrades is idempotent, so just recompute on every research event.
Events.on(EventType.ResearchEvent, () => applyUpgrades());