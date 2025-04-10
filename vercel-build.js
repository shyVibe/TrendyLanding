#!/usr/bin/env node

/**
 * Enhanced Vercel Build Script for EsportsCoaching
 * 
 * This script handles the build process specifically for Vercel deployment
 * with optimizations for serverless functions and database connections.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Enhanced command execution with timing
function runCommand(cmd) {
  console.log(`\n📋 Running: ${cmd}`);
  const startTime = Date.now();
  
  try {
    execSync(cmd, { stdio: 'inherit' });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Completed in ${duration}s`);
    return true;
  } catch (error) {
    console.error(`❌ Error executing ${cmd}:`, error.message);
    return false;
  }
}

// Detect environment
const isVercel = process.env.VERCEL === '1';
console.log(`\n🚀 Building in ${isVercel ? 'Vercel Serverless' : 'standard'} environment`);

// Set production environment
process.env.NODE_ENV = 'production';

// Step 1: Verify critical files
console.log('\n🔍 Verifying project structure...');
const criticalFiles = ['vercel.json', 'api/index.js', 'server/vercel-db.ts'];
let missingFiles = [];

criticalFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error(`⚠️ Warning: Missing critical files for Vercel deployment: ${missingFiles.join(', ')}`);
  
  // Auto-create api directory as a minimal recovery step
  if (missingFiles.includes('api/index.js') && !fs.existsSync('./api')) {
    console.log('📁 Creating api directory...');
    fs.mkdirSync('./api', { recursive: true });
  }
}

// Step 2: Ensure dist directory is clean
if (fs.existsSync('./dist')) {
  console.log('🧹 Cleaning previous build...');
  runCommand('rm -rf ./dist');
}

// Step 3: Build the application
console.log('\n🔨 Building application...');
const buildSuccess = runCommand('npm run build');

if (!buildSuccess) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Step 4: Verify the build output
if (!fs.existsSync('./dist/public') || !fs.existsSync('./dist/index.js')) {
  console.error('❌ Build completed but required output files are missing');
  process.exit(1);
}

// Step 5: Vercel-specific optimizations
if (isVercel) {
  console.log('\n⚙️ Applying Vercel optimizations...');
  
  // Ensure serverless function is properly set up
  if (fs.existsSync('./api/index.js')) {
    console.log('✅ API handler is ready');
  }
  
  // Create an empty .vercelignore if it doesn't exist to ensure clean deployments
  if (!fs.existsSync('./.vercelignore')) {
    fs.writeFileSync('./.vercelignore', 'node_modules\n.git\n');
    console.log('📝 Created .vercelignore file');
  }
}

console.log('\n🎉 Build completed successfully and ready for Vercel deployment');