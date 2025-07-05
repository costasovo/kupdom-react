# Deployment Guide for Kupdom

This guide will help you deploy your Kupdom application to Railway with your custom domain `kupdom.cz`.

## Prerequisites

1. A Railway account (free tier available)
2. Your domain `kupdom.cz` with DNS access
3. Git repository with your code

## Step 1: Prepare Your Repository

Your repository is now ready for deployment with the following files:
- `railway.json` - Railway configuration
- `Dockerfile` - Container configuration
- `package.json` - Updated with production start script
- Environment variables configured

## Step 2: Deploy to Railway

### Option A: Deploy via Railway Dashboard

1. Go to [Railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select your repository
4. Railway will automatically detect the configuration and start building

### Option B: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## Step 3: Configure Environment Variables

In your Railway project dashboard:

1. Go to your project → Variables tab
2. Add the following environment variables:

```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://kupdom.cz
HOSTNAME=0.0.0.0
PORT=3001
DATABASE_PATH=/app/data/kupdom.db
```

## Step 4: Set Up Custom Domain

### In Railway:
1. Go to your project → Settings → Domains
2. Add your domain: `kupdom.cz`
3. Railway will provide you with DNS records to configure

### In Your Domain Provider:
1. Go to your domain's DNS settings
2. Add the CNAME record provided by Railway:
   - Name: `@` (or leave empty for root domain)
   - Value: `[your-railway-app].railway.app`
   - TTL: 3600 (or default)

3. If you want to use `www.kupdom.cz` as well:
   - Name: `www`
   - Value: `[your-railway-app].railway.app`
   - TTL: 3600

## Step 5: Initialize Database

After deployment, you need to initialize your database:

1. Go to your Railway project → Deployments
2. Click on the latest deployment
3. Go to the "Logs" tab
4. Run the database initialization command:

```bash
railway run npm run init-db
```

## Step 6: Verify Deployment

1. Visit `https://kupdom.cz` to ensure your app is working
2. Test WebSocket functionality by creating a shopping list
3. Check that real-time updates work between different browser tabs

## Alternative Hosting Options

### Render (Free Tier)
- Similar setup to Railway
- Supports WebSocket connections
- Persistent storage available

### DigitalOcean App Platform
- More control but requires more setup
- $5/month minimum
- Good for scaling

## Troubleshooting

### Common Issues:

1. **WebSocket not connecting**: Check that `NEXT_PUBLIC_APP_URL` is set correctly
2. **Database not persisting**: Ensure `DATABASE_PATH` points to a persistent directory
3. **Domain not working**: Wait for DNS propagation (can take up to 48 hours)

### Logs and Debugging:
- Use Railway's built-in logging: Project → Deployments → Logs
- Check application logs for errors
- Verify environment variables are set correctly

## Cost Estimation

- **Railway Free Tier**: $5/month credit (sufficient for small apps)
- **Domain**: ~$10-15/year for kupdom.cz
- **Total**: ~$15-20/year

## Security Considerations

1. **HTTPS**: Railway provides automatic SSL certificates
2. **Environment Variables**: Never commit sensitive data to your repository
3. **Database**: SQLite is fine for small apps, consider PostgreSQL for larger scale
4. **Admin Access**: Ensure your admin credentials are secure

## Monitoring and Maintenance

1. **Uptime Monitoring**: Set up monitoring for your domain
2. **Backups**: Railway provides automatic backups
3. **Updates**: Keep your dependencies updated regularly
4. **Scaling**: Monitor usage and upgrade if needed

Your app should now be successfully deployed and accessible at `https://kupdom.cz`! 