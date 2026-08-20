# Ore Generators

A Mindustry mod that adds blocks which extract and synthesize ore from airborne trace elements, dissolved ion suspensions and cryogenic precipitation — plus a fully self-contained liquid economy.

## Ores

- **Serpulo:** copper, lead, coal, titanium, scrap, thorium, sand
- **Erekir:** beryllium, tungsten

## Tiers

Every ore has five generator tiers:

| Tier | Size | Power | Input | Notes |
|------|------|-------|-------|-------|
| Powered | 2x2 | required | - | fast, moderate cost |
| Passive | 2x2 | none | - | slow, heavy, expensive |
| Liquid-fed | 3x3 | none | water (ozone on Erekir) | fast |
| Cryo | 3x3 | required | cryofluid | faster |
| Magma | 4x4 | required | slag (gallium on Erekir) + cryofluid | ultimate output |

Each ore uses a distinct real-world-inspired extraction process, so no two generators are alike on paper — electrowinning, gravity precipitation, carbon scrubbing, plasma reduction, magnetic separation, irradiation, cyclonic sieving and more.

## Self-contained liquids

Liquid producers generate every liquid the tiers consume, each progressively more expensive to build:

- **Water Generator / Ozone Generator** (3x3) — upgraded water extractor / ozone generator.
- **Cryofluid Generator** (3x3) — very expensive; a Serpulo and an Erekir variant.
- **Slag Generator** (Serpulo) / **Gallium Generator** (Erekir) (3x3) — very very very expensive.

## Multi-ore synthesizers

Big 4x4 Serpulo blocks that batch-produce several ores at once with fixed ratios:

- **Basic Ore Synthesizer** — outputs 30% copper, 30% lead, 20% scrap, 10% coal and 10% sand. Huge copper + lead cost.
- **Refined Ore Synthesizer** — adds titanium. Requires silicon + graphite to build.
- **Advanced Ore Synthesizer** — adds thorium. Requires titanium + plastanium to build.

## Research milestones

Every tier is gated behind a **3-step research quest** — hidden nodes in the tech tree that advance your progress along the chain. Each ore has 15 milestones (3 per tier), with costs that escalate by tier and scale with the ore's rarity. Spend the ore itself plus process reagents (graphite, titanium, thorium, plastanium, phase fabric on higher tiers) to push further.

## Global research upgrades

Hidden research nodes that boost every generator, each gated behind its own research step. **Ten levels per line**, with huge, escalating costs up to phase fabric and surge alloy:

- **Speed I-X** - 10% faster each level
- **Capacity I-X** - +10 item capacity each level
- **Output I-X** - doubles output each level
- **Efficiency I-X** - 15% less power draw each level

Upgrades apply to every generator in the mod — per-ore generators, liquid producers and synthesizers alike.

## Features

- Full tech-tree research chains (Serpulo under pneumatic drill, Erekir under plasma bore)
- Animated sprites: powered, liquid, cryo and magma tiers glow and spin while running
- Per-tier ambient sounds and particle effects
- Procedurally generated sprite art (`tools/gen_sprites.py`)

## Requirements

- Mindustry v159 or newer (JS mod, no compilation needed)

## Installation

In-game: **Mods -> Browse** and search for "Ore Generators", or from the mod import dialog type the GitHub endpoint:

```
MohamedGonem/ore-gens
```

Alternatively, clone or download the repo into your Mindustry mods folder.

## License

[MIT](LICENSE) © MohamedGonem