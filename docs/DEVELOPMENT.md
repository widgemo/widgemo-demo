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