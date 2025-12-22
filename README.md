# Widgemo Demo

A demonstration application showcasing the features and usage of the Widgemo Core library.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Include Bootstrap CSS in your HTML (required for widgemo-core styling):
   ```html
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Features Demonstrated

- Multiple table configurations (simple, advanced with sorting/filtering/pagination, compact, minimal)
- Card view modes (with/without labels, with actions, minimal)
- Theme switching (light and dark variants)
- Configurable actions (create, edit, delete, view)
- Data adapters for CRUD operations

## Requirements

- Node.js 18+
- Bootstrap CSS (see setup above)
- React 18+
- TypeScript

## Related Projects

- [widgemo-core](https://github.com/your-org/widgemo-core) - The core library
- [widgemo-landing](https://github.com/your-org/widgemo-landing) - Landing page
