# Deploying EsportsCoaching to Vercel

This guide provides detailed instructions for deploying the EsportsCoaching landing page to Vercel with proper serverless functionality and database connection.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com/join) (recommended for easy deployment)
3. [Git](https://git-scm.com/downloads) installed on your local machine
4. [Node.js](https://nodejs.org/) (version 18 or higher) installed on your local machine

## Setting up the Database

This application requires PostgreSQL for storing lead information:

1. Create a PostgreSQL database on [Neon](https://neon.tech/) (recommended for Vercel compatibility)
   - Sign up for a free account
   - Create a new project
   - Create a new database within your project
   - Navigate to the "Connection Details" tab
   - Obtain your database connection string

2. The connection string format should be: 
   ```
   postgresql://username:password@hostname:port/database?sslmode=require
   ```

3. **Important**: Make sure to enable the "Pooled connection" option in Neon for better serverless performance

## Deployment Steps

### Option 1: Deploy from Vercel Dashboard (Recommended)

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for EsportsCoaching"
   git branch -M main
   git remote add origin https://github.com/yourusername/esportscoaching.git
   git push -u origin main
   ```

2. Visit the [Vercel dashboard](https://vercel.com/dashboard)
3. Click "Add New" > "Project"
4. Select your GitHub repository
5. Configure the project:
   - Framework Preset: **Other** (important: do not select Node.js)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   
   **Important**: Click "Override" when prompted rather than using framework defaults.

6. In the "Environment Variables" section, add:
   - `DATABASE_URL`: Your PostgreSQL connection string from Neon
   - `NODE_ENV`: `production`

7. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Answer the CLI prompts:
   - Set up and deploy: `y`
   - Which scope: Select your account
   - Link to existing project: `n`
   - Project name: `esportscoaching` (or your preferred name)
   - Directory: `.`
   - Override settings: `y`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Development command: Leave blank (press Enter)
   - Want to override the settings: `n`

5. Set environment variables:
   ```bash
   vercel env add DATABASE_URL
   ```
   Then enter your PostgreSQL connection string when prompted.

## Verifying Your Deployment

1. After deployment completes, Vercel will provide you with a production URL (e.g., `https://esportscoaching.vercel.app`)
2. Test the website thoroughly:
   - Check that all pages load correctly
   - Test the contact form submission
   - Verify animations and responsive design on different devices

## Production Optimizations

1. **Set up a custom domain**:
   - In the Vercel dashboard, go to your project
   - Click on "Domains"
   - Add your custom domain and follow the verification steps

2. **Enable Caching**:
   - Already configured in `vercel.json` with optimal cache headers
   - Assets will be cached for 1 year with immutability settings

3. **Analytics and Monitoring**:
   - Enable Vercel Analytics in your project settings
   - Set up status alerts for notifications if your site goes down

## Database Maintenance

1. **Backup Strategy**:
   - Neon automatically provides backup capabilities
   - Set up scheduled backups in your Neon dashboard

2. **Connection Pooling**:
   - Our application is configured to use Neon's connection pooling
   - The `vercel-db.ts` file handles efficient connection reuse

## Troubleshooting

If you encounter issues during deployment:

1. **Database Connection Issues**:
   - Verify that your PostgreSQL connection string includes `?sslmode=require`
   - Ensure you've enabled pooled connections in Neon
   - Check Neon dashboard for connection limits or errors

2. **API Routes Not Working**:
   - Verify paths start with `/api` in your fetch requests
   - Check Vercel Functions logs in your Vercel dashboard
   - Our custom API handler in `api/index.js` should automatically route requests

3. **Static Asset Issues**:
   - Assets should be in `dist/public/assets` after build
   - Check that the paths in HTML reference `/assets/filename` correctly

4. **Build Failures**:
   - Look for specific error messages in the Vercel build logs
   - Common ESM/CJS issues are fixed in our optimized configuration
   - We use Node.js 18 compatibility in the Vercel configuration

## Getting Support

- For technical issues with the codebase, create an issue in your GitHub repository
- For Vercel-specific deployment issues, refer to [Vercel Support](https://vercel.com/support)
- For database issues, check [Neon documentation](https://neon.tech/docs/)