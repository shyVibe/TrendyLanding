# Deploying to Vercel

This guide provides instructions for deploying the EsportsCoaching landing page to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com/join) (recommended for easy deployment)
3. [Git](https://git-scm.com/downloads) installed on your local machine
4. [Node.js](https://nodejs.org/) installed on your local machine

## Setting up the Database

This application uses PostgreSQL, which needs to be set up before deployment.

1. Create a PostgreSQL database on a service like [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)
2. Save your database connection string (it should look like `postgresql://username:password@hostname:port/database`)

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. Visit the [Vercel dashboard](https://vercel.com/dashboard)
3. Click "Add New" > "Project"
4. Select your GitHub repository
5. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

6. In the "Environment Variables" section, add:
   - `DATABASE_URL`: Your PostgreSQL connection string

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

4. Follow the prompts and provide the required environment variables when asked

## After Deployment

1. Once deployed, Vercel will provide you with a production URL (e.g., `https://your-project.vercel.app`)
2. Test your website thoroughly to ensure all features are working correctly
3. Set up a custom domain if needed through the Vercel dashboard

## Monitoring and Maintenance

- Monitor your application's performance and errors through the Vercel dashboard
- For any database issues, check your PostgreSQL database logs

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure your database connection string is correct
3. Verify that all required environment variables are set
4. Check for any syntax errors in your code

For more help, refer to the [Vercel documentation](https://vercel.com/docs) or contact Vercel support.