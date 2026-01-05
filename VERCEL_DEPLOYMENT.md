# Vercel Deployment Guide

This guide will walk you through deploying your Next.js frontend to Vercel step by step.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Your backend deployed to Railway (or another hosting service)
4. Your Railway backend URL

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. Make sure all your changes are committed and pushed to your Git repository:
   ```bash
   cd frontend
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

### Step 2: Create a Vercel Account and Project

1. Go to [vercel.com](https://vercel.com) and sign up/login
   - You can sign up with GitHub, GitLab, or Bitbucket for easier integration
2. Click **"Add New..."** → **"Project"** in the dashboard
3. Import your Git repository:
   - If you signed up with GitHub/GitLab/Bitbucket, select your `cabinrentals` repository
   - If not, click **"Import Git Repository"** and connect your Git provider
4. Select your repository

### Step 3: Configure the Project

1. **Framework Preset**: Vercel will automatically detect Next.js - leave it as is
2. **Root Directory**: Set to `frontend` (since your frontend code is in the frontend folder)
   - Click **"Edit"** next to Root Directory
   - Enter: `frontend`
3. **Build Command**: Leave as default (`npm run build` or `next build`)
4. **Output Directory**: Leave as default (`.next` for Next.js)
5. **Install Command**: Leave as default (`npm install`)

### Step 4: Set Environment Variables

1. In the project configuration, scroll down to **"Environment Variables"**
2. Add the following environment variables:

   **Required:**
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
   ```
   Replace `https://your-railway-app.up.railway.app` with your actual Railway backend URL

   **Optional (if you use Supabase directly in frontend):**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   **Optional (if you use other services):**
   ```
   NEXT_PUBLIC_R2_PUBLIC_URL=your-r2-public-url
   ```

3. **Important**: 
   - Variables starting with `NEXT_PUBLIC_` are exposed to the browser
   - Make sure you only expose public keys, never secret keys
   - You can set different values for Production, Preview, and Development environments

### Step 5: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your application (`npm run build`)
   - Deploy to production
3. Watch the build logs in real-time
4. Wait for deployment to complete (usually 2-5 minutes)

### Step 6: Get Your Application URL

1. Once deployed, Vercel will provide a public URL
2. Your app will be available at: `https://your-project-name.vercel.app`
3. You can also set a custom domain if you have one (see Step 8)

### Step 7: Verify Deployment

1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Test your pages:
   - Homepage: `https://your-project-name.vercel.app/`
   - About Us: `https://your-project-name.vercel.app/about-us`
   - FAQ: `https://your-project-name.vercel.app/faq`
   - Blogs: `https://your-project-name.vercel.app/blogs`
3. Check browser console for any errors
4. Verify API calls are working (check Network tab in DevTools)

### Step 8: Set Up Custom Domain (Optional)

1. Go to your project **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain name (e.g., `cabinrentals.com`)
4. Follow Vercel's instructions to configure DNS:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records as instructed
5. Wait for DNS propagation (can take up to 48 hours, usually much faster)
6. Vercel will automatically provision SSL certificates

### Step 9: Update Backend CORS Settings

1. After getting your Vercel URL, update your Railway backend's `CORS_ORIGINS` environment variable:
   ```
   CORS_ORIGINS=https://your-project-name.vercel.app,https://your-custom-domain.com
   ```
2. Redeploy your Railway backend for changes to take effect

## Continuous Deployment

Vercel automatically deploys when you push to your connected branch:
- **Production**: Deploys from your default branch (usually `main` or `master`)
- **Preview**: Creates preview deployments for every push to other branches and pull requests

### Preview Deployments

- Every branch gets its own preview URL
- Perfect for testing before merging to production
- Share preview URLs with team members for review

## Environment Variables Management

### Setting Variables for Different Environments

1. Go to **Settings** → **Environment Variables**
2. You can set variables for:
   - **Production**: Live production site
   - **Preview**: All preview deployments
   - **Development**: Local development (when using Vercel CLI)

### Updating Variables

1. Go to **Settings** → **Environment Variables**
2. Edit or add new variables
3. **Important**: After adding/updating variables, you need to redeploy:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **"Redeploy"**

## Troubleshooting

### Build Fails

**Common Issues:**
- **Missing dependencies**: Check `package.json` is correct
- **TypeScript errors**: Run `npm run type-check` locally first
- **Build errors**: Check build logs in Vercel dashboard

**Solutions:**
- Check the build logs in Vercel dashboard for specific errors
- Ensure `package.json` has all required dependencies
- Run `npm run build` locally to test before deploying

### API Calls Failing

**Common Issues:**
- **CORS errors**: Backend CORS not configured for Vercel domain
- **Wrong API URL**: `NEXT_PUBLIC_API_URL` not set correctly
- **Network errors**: Backend not accessible

**Solutions:**
1. Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
2. Update backend `CORS_ORIGINS` to include your Vercel URL
3. Test backend URL directly: `https://your-backend-url/health`
4. Check browser console and Network tab for specific errors

### Images Not Loading

**Common Issues:**
- **Image domains not configured**: Next.js blocks external images by default
- **R2 images not accessible**: R2 public URL not configured

**Solutions:**
1. Update `next.config.js` to include image domains:
   ```js
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'your-domain.com',
       },
       {
         protocol: 'https',
         hostname: '**.r2.dev',
       },
     ],
   }
   ```
2. Redeploy after updating `next.config.js`

### Environment Variables Not Working

**Common Issues:**
- Variables not prefixed with `NEXT_PUBLIC_` for client-side access
- Variables not set in Vercel dashboard
- Need to redeploy after adding variables

**Solutions:**
1. Client-side variables must start with `NEXT_PUBLIC_`
2. Server-side variables don't need the prefix
3. Always redeploy after adding/updating environment variables

## Performance Optimization

### Vercel Automatic Optimizations

Vercel automatically provides:
- **Edge Network**: Global CDN for fast content delivery
- **Image Optimization**: Automatic image optimization via Next.js Image component
- **Automatic HTTPS**: SSL certificates for all domains
- **Serverless Functions**: API routes run as serverless functions

### Best Practices

1. **Use Next.js Image Component**: For automatic optimization
2. **Enable ISR (Incremental Static Regeneration)**: For dynamic content
3. **Use Static Generation**: For pages that don't change often
4. **Optimize Bundle Size**: Use dynamic imports for large components

## Monitoring and Analytics

### Vercel Analytics (Optional)

1. Go to **Settings** → **Analytics**
2. Enable Vercel Analytics (may require a paid plan)
3. Get insights into:
   - Page views
   - Performance metrics
   - User behavior

### Logs

1. Go to **Deployments** → Select a deployment → **Functions** tab
2. View real-time logs
3. Debug issues with detailed error messages

## Cost Management

### Free Tier

Vercel offers a generous free tier:
- Unlimited personal projects
- 100GB bandwidth per month
- 100 serverless function executions per day
- Automatic SSL certificates

### Paid Plans

Upgrade if you need:
- More bandwidth
- More function executions
- Team collaboration features
- Advanced analytics

## Additional Tips

1. **Preview Deployments**: Use preview deployments for testing before production
2. **Branch Protection**: Set up branch protection in Git for production branch
3. **Webhooks**: Set up webhooks to trigger external services
4. **Redirects**: Configure redirects in `vercel.json` if needed
5. **Headers**: Add security headers in `next.config.js` or `vercel.json`

## Next Steps

After deployment:
1. Test all pages and functionality
2. Set up monitoring and error tracking (e.g., Sentry)
3. Configure custom domain if you have one
4. Set up CI/CD workflows if needed
5. Enable analytics for insights

## Quick Reference

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js on Vercel**: [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)

