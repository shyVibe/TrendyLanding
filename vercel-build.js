#!/usr/bin/env node

// This script is used by Vercel to build the project
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Execute a command and print its output
function runCommand(cmd) {
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing ${cmd}:`, error);
    process.exit(1);
  }
}

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';
console.log(`Building in ${isVercel ? 'Vercel' : 'standard'} environment`);

// Set environment variables needed for the build
process.env.NODE_ENV = 'production';

// First build the TypeScript files
runCommand('npm run build');

// If in Vercel environment, create necessary serverless function files
if (isVercel) {
  console.log('Setting up Vercel-specific configuration...');
  
  // Creating api directory if it doesn't exist
  if (!fs.existsSync('./api')) {
    fs.mkdirSync('./api', { recursive: true });
  }
  
  // Ensure the Vercel configuration is correct
  if (!fs.existsSync('./vercel.json')) {
    console.error('vercel.json not found. Please create this file first.');
    process.exit(1);
  }
  
  console.log('Vercel configuration complete');
}

console.log('Build completed successfully');