#!/bin/bash

# Script to build for production testing and restart production server
# Usage: ./build-prod.sh

echo "🔨 Building widgemo-core for production..."
cd /home/chunto/projects/widgemo-core
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Core build successful"
    echo "🔨 Building widgemo-demo for production..."
    cd /home/chunto/projects/widgemo-demo
    npm run build

    if [ $? -eq 0 ]; then
        echo "✅ Demo build successful"
        echo "🔄 Restarting widgemo-demo production server..."
        pm2 restart widgemo-demo-prod
        echo "✅ Production server restarted!"
        echo "🌐 Access at: http://localhost:4173 (or your configured host port)"
    else
        echo "❌ Demo build failed - check for errors above"
        exit 1
    fi
else
    echo "❌ Core build failed - check for errors above"
    exit 1
fi