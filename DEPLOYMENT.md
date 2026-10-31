# Deployment Guide for Render

## Prerequisites
- GitHub repository with this code
- Render account (free tier available)

## Deployment Steps

### Option 1: Using render.yaml (Recommended)

1. **Push to GitHub**
   - Ensure all changes are committed and pushed to your GitHub repository
   - The `render.yaml` file will be automatically detected by Render

2. **Connect to Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +"
   - Select "Static Site"
   - Connect your GitHub repository

3. **Configuration (Auto-filled from render.yaml)**
   - **Name**: madhan-portfolio (or your preferred name)
   - **Branch**: main
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
   - **Environment**: Static Site

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your portfolio
   - You'll receive a URL like `https://madhan-portfolio.onrender.com`

### Option 2: Manual Configuration

If you prefer manual configuration without render.yaml:

1. Follow steps 1-2 from Option 1
2. Configure manually:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Branch**: `main`
3. Add the following in Render dashboard > Settings > Advanced:
   - Add Redirect Rules:
     - Source: `/(.*)`
     - Destination: `/index.html`
     - Type: Rewrite

## Environment Variables

No environment variables are required for this portfolio. All configuration is handled through build settings.

## Custom Domain (Optional)

1. In Render dashboard, go to your service > Settings > Custom Domains
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `madhanperam.com`)
4. Update your DNS records:
   - Type: CNAME
   - Name: www (or your subdomain)
   - Value: `[your-service-name].onrender.com`

## Build Verification

The build produces:
- `dist/index.html` - Main HTML file
- `dist/assets/` - CSS and JS bundles
- `dist/favicon.svg` - Favicon
- `dist/image.png` - Open Graph image
- `dist/robots.txt` - SEO robots file
- `dist/sitemap.xml` - Sitemap for SEO

## Security Headers

The `render.yaml` includes security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## Troubleshooting

### Build Fails
- Check that Node.js version is compatible (Render uses latest by default)
- Ensure `package.json` has correct build scripts
- Check build logs in Render dashboard

### 404 Errors on Navigation
- Ensure SPA routing is configured (rewrite rule in render.yaml)
- The rewrite rule sends all routes to `/index.html`

### Assets Not Loading
- Check that assets are in the `dist` folder
- Verify build command completed successfully
- Check that file paths are relative (not absolute)

## Updates

To update your portfolio:
1. Make changes locally
2. Commit and push to GitHub
3. Render automatically detects the push and redeploys

## Monitoring

- View build logs in Render dashboard
- Monitor deployment status
- Check analytics (Google Analytics is configured in index.html)

## Cost

- Render Free Tier: Available for static sites
- Includes SSL certificate
- Automatic HTTPS
- No cost for personal portfolio
