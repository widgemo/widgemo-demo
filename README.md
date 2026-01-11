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

3. Start the development server (runs on HTTPS):
   ```bash
   npm run dev
   ```
   The server will be available at:
   - Local: `https://localhost:5173` (or next available port)
   - Network: `https://10.0.0.229:5173` (or next available port)

   **Note**: Self-signed SSL certificates are automatically generated for development. Your browser may show a security warning - this is normal for self-signed certificates.

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
- **FontAwesome Icon Integration** - Custom icon renderer using react-icons

## Icon System Configuration

Widgemo Demo includes a custom FontAwesome icon renderer that maps widgemo's icon names to FontAwesome icons from the `react-icons` library.

### Custom Icon Renderer

The demo uses a custom `fontAwesomeRenderIcon` function located in `src/utils/fontAwesomeIconRenderer.tsx` that provides:

- **25+ mapped icons** covering all widgemo UI elements
- **FontAwesome integration** using react-icons/fa
- **Theme-aware colors** that respect the current theme
- **Consistent sizing** across all components

### Icon Mapping Examples

| Widgemo Icon Name | FontAwesome Icon | Usage |
|-------------------|------------------|-------|
| `plus`, `add` | `FaPlus` | Add/Create buttons |
| `edit`, `pencil` | `FaEdit` | Edit actions |
| `delete`, `trash` | `FaTrash` | Delete actions |
| `view`, `eye` | `FaEye` | View/Detail actions |
| `settings`, `cog` | `FaCog` | Settings menus |
| `table` | `FaTable` | Table view indicator |
| `grid` | `FaTh` | Grid view indicator |
| `chart-bar` | `FaChartBar` | Chart type selector |

### Using Different Icon Libraries

To use a different icon library, modify `src/utils/fontAwesomeIconRenderer.tsx` or create a new renderer:

```tsx
// Example: Using Heroicons instead
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

const heroIconRenderer = ({ name, size = 16, className, color = 'currentColor' }) => {
  const props = { width: size, height: size, className, style: { color } };

  switch (name) {
    case 'plus':
    case 'add':
      return <PlusIcon {...props} />;
    case 'edit':
    case 'pencil':
      return <PencilIcon {...props} />;
    // ... more mappings
  }
};
```

Then update the import in `src/components/SandboxSection.tsx`:

```tsx
import { heroIconRenderer } from '../utils/heroIconRenderer';
```

And pass it to the Widgemo component:

```tsx
<Widgemo
  config={config}
  adapters={dynamicAdapters}
  renderIcon={heroIconRenderer}
  // ... other props
/>
```

### Overriding Custom Classes

The demo showcases how to override widgemo's default styles. Key customizable classes include:

#### Icon and Button Styling

```css
/* Custom icon button hover effects */
.icon-button:hover {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Custom copy button styling */
.copy-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border-radius: 20px !important;
}
```

#### Component-Specific Overrides

```css
/* Custom table header styling */
.widgemo-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Custom modal styling */
.widgemo-modal .modal-content {
  border-radius: 15px;
  border: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Custom toolbar button effects */
.widgemo-toolbar .btn {
  border-radius: 25px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.widgemo-toolbar .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
```

#### Theme Integration

The demo's theme system integrates with widgemo's icon colors. Icons automatically adapt to light/dark themes through CSS variables:

```css
.theme-light {
  --icon-color: #2c3e50;
  --icon-hover-color: #34495e;
}

.theme-dark {
  --icon-color: #ecf0f1;
  --icon-hover-color: #bdc3c7;
}
```

## Requirements

- Node.js 18+
- Bootstrap CSS (see setup above)
- React 18+
- TypeScript

## Related Projects

- [widgemo-core](https://github.com/your-org/widgemo-core) - The core library
- [widgemo-landing](https://github.com/your-org/widgemo-landing) - Landing page
