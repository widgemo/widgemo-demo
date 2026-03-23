# Widgemo Development Workflow

## 🚀 Quick Start

### Development Mode (Daily Work)
```bash
# Start development server (with devMode features)
pm2 start "npm run dev -- --host" --name widgemo-demo
```

### Production Testing (Verify Production Gate)
```bash
# Build and start production server (no devMode features)
./build-prod.sh
```

## 📋 Your PM2 Processes

- **`widgemo-demo`** - Development server (`npm run dev`) - **HAS** devMode features
- **`widgemo-demo-prod`** - Production server (`npm run preview`) - **NO** devMode features

## 🔧 Development Workflow

### When You Change widgemo-core:
```bash
./rebuild-core.sh
```
This rebuilds the core library and restarts your development server.

### When You Change widgemo-demo:
Just save your files - hot reloading will update automatically!

### When You Change Both:
```bash
./rebuild-core.sh  # Rebuilds core and restarts demo
# Then make your demo changes - they'll hot reload
```

## 🎯 Testing Production Gate

1. **Development Mode**: Visit your dev server - you'll see "DEVELOPMENT MODE" subtitle and devMode buttons
2. **Production Mode**: Run `./build-prod.sh` then visit production server - no subtitle, no devMode buttons

## 📊 Environment Indicators

- **"DEVELOPMENT MODE" subtitle in navbar** = You're in development mode
- **No subtitle in navbar** = You're in production mode (devMode disabled)

## 🛠️ Available Scripts

- **`./rebuild-core.sh`** - Rebuild widgemo-core and restart development server
- **`./build-prod.sh`** - Build both projects and start production server for testing

## 🔍 Verifying Setup

Your setup is now optimized for:
- ✅ Fast development with hot reloading
- ✅ Easy core library updates
- ✅ Reliable production gate testing
- ✅ Clear visual indicators of current mode

---

## 📝 Recent Work — March 23 2026

### `wrap?: boolean` feature (widgemo-core)

A new `wrap` property was added at three levels: `FieldConfig`, `ItemConfig`, and `ColumnConfig`.

**Behaviour:**
- `wrap: false` (default in all table cells) — single-line truncation with ellipsis; full value shown as tooltip on hover.
- `wrap: true` — multi-line wrapping. Two CSS classes are used depending on field type:
  - `field-wrap-allow` — natural word-boundary wrap (`text`, `number`, `date`, `textarea`, `boolean`, `select`, `relation`).
  - `field-wrap-allow-break` — forced break-word wrap (`email`, `url`, `renderAs: 'link'`), preventing long unbreakable strings from overflowing their cell.
- Images are excluded from both wrap paths.

**Table default:** Both `TableRenderer.tsx` (traditional layout via `item.fields`) and `TableMode.tsx` (columns-based layout) default `wrap` to `false`, so all table cells truncate unless explicitly opted in.

**Non-table contexts** (grid, card, list, board): No wrap wrapper is applied — browser default behaviour is preserved.

**Files changed in widgemo-core:**
- `src/types.ts` — `wrap?: boolean` added to `FieldConfig`, `ItemConfig`, `ColumnConfig`
- `src/components/renderers/core/FieldRenderer.tsx` — wrap wrapper logic (`renderRaw()` + outer condition)
- `src/components/renderers/core/FieldRenderer.css` — `.field-wrap-clip`, `.field-wrap-allow`, `.field-wrap-allow-break`
- `src/components/renderers/core/ItemRenderer.tsx` — propagates `config.wrap` to each field
- `src/components/renderers/core/TableRenderer.tsx` — merges `config.item.wrap ?? false` into field config
- `src/components/renderers/modes/TableMode.tsx` — same default-false propagation at both FieldRenderer call sites

**Demo examples updated (`src/data/widgemoExamples.tsx`):**
- **Traditional Table** — Email column: `{ key: 'email', type: 'email', wrap: true }` → break-word wrap demo
- **Grouped Traditional Table** — `item: { wrap: true }` → all columns wrap naturally (item-level override)
- **renderas-link** — removed explicit `wrap: false` (table default now covers it)

### Other work completed this session
- **Gallery modal theme fix** — `<Widgemo>` instances in `GallerySection.tsx` wrapped with `<WidgemoThemeProvider theme={currentTheme}>`
- **26 new examples** added to `widgemoExamples.tsx` covering every major config surface (renderAs, linkOptions, badge icons, progress, rating, currency, grid maxColumns, etc.)
- **`maxColumns` in GridMode** — was defined in types but never implemented; now applied via `repeat(N, 1fr)` with CSS custom property `--widgemo-max-cols` so breakpoint `!important` rules also respect it