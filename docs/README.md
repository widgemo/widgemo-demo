# Widgemo Demo Documentation

## Project Structure

```
widgemo-demo/
├── scripts/           # Build and deployment scripts
│   ├── build-prod.sh
│   └── rebuild-core.sh
├── docs/             # Documentation
│   ├── DEVELOPMENT.md
│   └── tests.md
├── ssl/              # SSL certificates
│   ├── cert.pem
│   └── key.pem
├── assets/           # Static assets
│   └── annotated.jpg
├── src/
│   ├── components/
│   │   ├── main-page/     # Main landing page sections
│   │   ├── navigation/    # Navigation components
│   │   ├── sandbox/       # Interactive sandbox components
│   │   ├── custom-fields/ # Custom field type implementations
│   │   ├── custom-modes/  # Custom mode implementations
│   │   └── index.ts       # Component exports
│   ├── data/              # Sample data and configurations
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   └── utils/             # Utility functions
└── package.json
```

## Key Directories

### Components
- **main-page/**: Landing page sections (Teaser, Anatomy, Gallery, etc.)
- **navigation/**: Navbar and theme toggle components
- **sandbox/**: Interactive demo components and modals
- **custom-fields/**: Custom field type implementations (progress bars, JSON viewer)
- **custom-modes/**: Custom display mode implementations (timeline, etc.)

### Data
- **sampleData.ts**: Sample data for demonstrations
- **widgemoExamples.tsx**: Pre-configured examples and configurations
- **configReference.ts**: Configuration reference data
- **types.ts**: Shared TypeScript interfaces

### Scripts
- **build-prod.sh**: Production build and deployment
- **rebuild-core.sh**: Rebuild widgemo-core and restart demo

## Development Workflow

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed development instructions.