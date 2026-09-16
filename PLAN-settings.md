# Ore Generators - Settings System Implementation Plan

## Overview
Add in-game settings to the Ore Generators mod that let players configure content
gating, cost scaling, and tier limits. Settings appear in the Mindustry Settings
menu under an "Ore Generators" category.

## Settings to Add

### Tier & Research
| Setting | Type | Key | Default | Range |
|---------|------|-----|---------|-------|
| Max Tier | slider | `oregens-max-tier` | 5 | 1–5 |
| Enable Research | checkbox | `oregens-research` | true | bool |
| Max Upgrade Level | slider | `oregens-max-upgrade` | 10 | 1–10 |
| Cost Mode | slider | `oregens-cost-mode` | 0 | 0=Normal, 1=Hard(2.5x), 2=Extreme(5x) |

### Ore Gates (checkboxes, all default true)
`oregens-gate-copper`, `oregens-gate-lead`, `oregens-gate-coal`,
`oregens-gate-titanium`, `oregens-gate-scrap`, `oregens-gate-thorium`,
`oregens-gate-sand`, `oregens-gate-beryllium`, `oregens-gate-tungsten`

### Liquid Gates (checkboxes, all default true)
`oregens-gate-water`, `oregens-gate-ozone`, `oregens-gate-cryofluid`,
`oregens-gate-slag`, `oregens-gate-gallium`, `oregens-gate-oil`

### Craftable Item Gates (checkboxes, all default true)
`oregens-gate-graphite`, `oregens-gate-silicon`, `oregens-gate-metaglass`,
`oregens-gate-plastanium`, `oregens-gate-phase-fabric`,
`oregens-gate-pyratite`, `oregens-gate-blast-compound`, `oregens-gate-surge-alloy`

## Gating Behavior
- Disabled content is still created but **hidden from the tech tree**
- Its craft time is set to 999999 (effectively uncraftable)
- Visible in-game if placed via sandbox, but impractical to use

## Files to Create/Modify

### 1. NEW: `scripts/settings.js`
Settings UI registration + helper API.

```
// Exports a global object: OregensSettings
// Provides:
//   OregensSettings.isEnabled(oreId)       -> bool
//   OregensSettings.isLiquidEnabled(id)    -> bool
//   OregensSettings.isItemEnabled(id)      -> bool
//   OregensSettings.getMaxTier()           -> int (1-5)
//   OregensSettings.getCostMode()          -> int (0,1,2)
//   OregensSettings.getCostMultiplier()    -> float (1.0, 2.5, or 5.0)
//   OregensSettings.isResearchEnabled()    -> bool
//   OregensSettings.getMaxUpgradeLevel()   -> int (1-10)
//   OregensSettings.applyGating(block, tier, oreId, category)
//       category: "ore" | "liquid" | "craftable"
//       If disabled: block.buildVisibility = hidden, block.craftTime = 999999
//       If tier > maxTier: same treatment
```

Uses `Vars.ui.settings.addCategory("Ore Generators", function(table){ ... })`
to add the settings panel. All values read via `Core.settings.getBool()` /
`Core.settings.getInt()` with sensible defaults.

### 2. MODIFY: `scripts/main.js`
```
require("settings");
require("generators");
```
Settings must load first so generators can read them.

### 3. MODIFY: `scripts/generators.js`
Changes needed at specific points:

#### a) Cost mode multiplier on build costs
After computing `enrichedReq()`, apply cost multiplier:
```js
function applyCostMultiplier(req) {
  var mult = OregensSettings.getCostMultiplier();
  if (mult == 1.0) return req;
  // multiply all amounts in the req array by mult, round to nearest 5
}
```
Apply to every `req` array in `oreDefs`, `erekirOreDefs`, liquid producers,
synthesizers, crafting generators, and upgrade costs.

#### b) Gating per-ore generators in `buildChain()`
After creating each tier block, call:
```js
OregensSettings.applyGating(chain.powered, 1, ore.id, "ore");
OregensSettings.applyGating(chain.unpowered, 2, ore.id, "ore");
OregensSettings.applyGating(chain.water, 3, ore.id, "ore");
OregensSettings.applyGating(chain.cryo, 4, ore.id, "ore");
OregensSettings.applyGating(chain.magma, 5, ore.id, "ore");
```

#### c) Gating liquid producers
After creating each liquid producer block:
```js
OregensSettings.applyGating(waterGen, 0, "water", "liquid");
OregensSettings.applyGating(cryofluidGen, 0, "cryofluid", "liquid");
// etc.
```

#### d) Gating crafting generators
After creating each craft block:
```js
OregensSettings.applyGating(graphitePressGen, 0, "graphite", "craftable");
// etc.
```

#### e) Skip research tree for disabled content
Wrap the research milestone loops in checks:
```js
if (OregensSettings.isResearchEnabled()) {
  // existing research tree code
}
```
For individual ore chains, also skip if ore is gated:
```js
if (!OregensSettings.isEnabled(ore.id)) continue;
```

#### f) Limit upgrade levels
When linking upgrade lines, only link up to `maxUpgradeLevel`:
```js
var maxLevel = OregensSettings.getMaxUpgradeLevel();
// only create TechNodes for levels 0..maxLevel-1
```

### 4. MODIFY: `bundles/bundle.properties`
Add entries for every setting label and description. Example:
```properties
setting.oregens-max-tier.name = Max Generator Tier
setting.oregens-max-tier.description = Maximum tier of ore generators available (1=Powered only, 5=all tiers).

setting.oregens-research.name = Enable Research
setting.oregens-research.description = When enabled, generators must be unlocked via the tech tree.

setting.oregens-max-upgrade.name = Max Upgrade Level
setting.oregens-max-upgrade.description = Maximum level for global generator upgrades (Speed, Capacity, Output, Efficiency).

setting.oregens-cost-mode.name = Cost Mode
setting.oregens-cost-mode.description = Normal: default costs. Hard: 2.5x costs. Extreme: 5x costs.

setting.oregens-gate-copper.name = Enable Copper Generator
setting.oregens-gate-lead.name = Enable Lead Generator
setting.oregens-gate-coal.name = Enable Coal Generator
setting.oregens-gate-titanium.name = Enable Titanium Generator
setting.oregens-gate-scrap.name = Enable Scrap Generator
setting.oregens-gate-thorium.name = Enable Thorium Generator
setting.oregens-gate-sand.name = Enable Sand Generator
setting.oregens-gate-beryllium.name = Enable Beryllium Generator
setting.oregens-gate-tungsten.name = Enable Tungsten Generator

setting.oregens-gate-water.name = Enable Water Generator
setting.oregens-gate-ozone.name = Enable Ozone Generator
setting.oregens-gate-cryofluid.name = Enable Cryofluid Generator
setting.oregens-gate-slag.name = Enable Slag Generator
setting.oregens-gate-gallium.name = Enable Gallium Generator
setting.oregens-gate-oil.name = Enable Oil Generator

setting.oregens-gate-graphite.name = Enable Graphite Generator
setting.oregens-gate-silicon.name = Enable Silicon Generator
setting.oregens-gate-metaglass.name = Enable Metaglass Generator
setting.oregens-gate-plastanium.name = Enable Plastanium Generator
setting.oregens-gate-phase-fabric.name = Enable Phase Fabric Generator
setting.oregens-gate-pyratite.name = Enable Pyratite Generator
setting.oregens-gate-blast-compound.name = Enable Blast Compound Generator
setting.oregens-gate-surge-alloy.name = Enable Surge Alloy Generator
```

## Implementation Order
1. Create `scripts/settings.js` (settings UI + OregensSettings API)
2. Update `scripts/main.js` to require settings first
3. Modify `scripts/generators.js`:
   - Add `applyCostMultiplier()` helper
   - Apply cost multiplier to all recipe costs
   - Add gating calls after block creation
   - Wrap research tree in research-enabled check
   - Skip gated ores in research tree
   - Limit upgrade levels
4. Add all bundle entries
5. Verify the mod loads (syntax check, no undefined references)

## Risks & Notes
- `Cons<SettingsTable>` callback: from Rhino JS, pass a plain `function(table){}` - Rhino auto-wraps it
- `Core.settings` defaults must be set via `settings.defaults()` in the settings.js init
- Cost multiplier should round to nearest 5 to keep numbers clean
- Setting reads happen at content init time (during `loadContent`), not at build time
- The `buildVisibility = BuildVisibility.hidden` hides from tech tree but not from sandbox
