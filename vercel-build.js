// This script runs during Vercel deployment
const { execSync } = require('child_process');

console.log('Running Vercel build script...');

// Run the build script from package.json
try {
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}