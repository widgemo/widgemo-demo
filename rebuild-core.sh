#!/bin/bash

# Script to rebuild widgemo-core and restart widgemo-demo development server
# Usage: ./rebuild-core.sh

echo "🔨 Rebuilding widgemo-core..."
cd /home/chunto/projects/widgemo-core
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Core build successful"
    echo "🔄 Restarting widgemo-demo development server..."
    pm2 restart widgemo-demo
    echo "✅ Demo restarted - changes should be live!"
else
    echo "❌ Core build failed - check for errors above"
    exit 1
fi