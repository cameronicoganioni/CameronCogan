echo "starting build!"
npm ci && npm run build
echo "npm Clean Install and npm Runbuild Successful!"
node prerender.js
echo "Prerender Complete!"