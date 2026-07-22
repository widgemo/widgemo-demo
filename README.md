# Widgemo Demo

Widgemo Demo is the interactive reference app for `@widgemo/widgemo-core`.
It showcases real-world configurations, curated examples, and a live JSON sandbox.

## Requirements

- Node.js 18+
- npm 9+
- Sibling checkout of `widgemo-core` (the demo currently uses `"@widgemo/widgemo-core": "file:../widgemo-core"`)

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

3. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Main Routes

- `/` - Marketing-style overview and featured examples
- `/examples` - Curated example gallery
- `/sandbox` - JSON configuration playground
- `/lab` - Progressive examples and advanced behavior validation

## Architecture Notes

- React + TypeScript + Vite frontend
- Uses Bootstrap and react-bootstrap for layout primitives
- Registers custom Widgemo modes, field renderers, themes, and icons through `widgemoRegistry`
- Uses lazy-loaded routes for heavier demo surfaces (`/examples`, `/sandbox`, `/lab`)

## Related Repositories

- [widgemo-core](https://github.com/widgemo/widgemo-core)
- [widgemo-docs](https://github.com/widgemo/widgemo-docs)
- [widgemo-landing](https://github.com/Mark-Enet/widgemo-landing)
