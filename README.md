# Project Augurbox

A full-stack tarot card application that generates AI-powered imagery for all 78 traditional tarot cards using Cloudflare's AI services, with a modern Next.js web interface deployed on Cloudflare Pages.

## 🔮 Project Vision

Project Augurbox creates a complete digital tarot experience by:
- **AI-Generated Card Art**: Using Cloudflare's Flux model to generate unique, beautiful imagery for all 78 tarot cards
- **Rich Card Data**: Complete with traditional meanings, descriptions, and detailed prompts for each card
- **Modern Web Interface**: Built with Next.js 15, React 19, and Tailwind CSS for a responsive, interactive experience
- **Edge-Deployed**: Hosted on Cloudflare Pages with Workers for optimal performance globally

## 📁 Directory Structure

```
project-augurbox/
├── apps/
│   └── augurbox-web/          # Next.js 15 web application
│       ├── app/               # Next.js App Router pages
│       ├── components/        # React components
│       ├── public/           # Static assets
│       └── package.json      # Web app dependencies
├── data/                      # Tarot card definitions
│   ├── cards.ts              # All 78 cards with prompts
│   └── masterPrompt.ts       # Base prompt template
├── scripts/                   # AI generation scripts
│   ├── build-prompts.ts      # Generate refined prompts (78 .txt files)
│   └── build-images.ts       # Generate card images (78 .png files)
├── generated/                 # AI-generated assets
│   ├── prompts/              # Text prompts for each card
│   └── images/               # Generated card artwork
├── .env.example              # Environment configuration template
├── wrangler.toml             # Cloudflare deployment config
└── package.json              # Root project scripts
```

## ⚡ Prerequisites

Before getting started, ensure you have:

1. **Node.js ≥ 20.0.0** - [Download from nodejs.org](https://nodejs.org/)
2. **Wrangler CLI** - Cloudflare's deployment tool
   ```bash
   npm install -g wrangler
   ```
3. **Cloudflare Account** - [Sign up at cloudflare.com](https://dash.cloudflare.com/sign-up)
   - Enable Cloudflare AI in your dashboard
   - Get your Account ID from the dashboard sidebar
   - Create an API token with AI permissions

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Clone and navigate to project
cd project-augurbox

# Copy environment template
cp .env.example .env

# Edit .env with your Cloudflare credentials
# AI_ACCOUNT_ID=your_cloudflare_account_id
# AI_API_TOKEN=your_cloudflare_api_token
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate AI Assets
```bash
# Generate refined prompts for all 78 cards (~30 seconds)
npm run generate:prompts

# Generate card images using Cloudflare Flux (~5-10 minutes)
npm run generate:images

# Copy generated images to web application
cp generated/images/*.png apps/augurbox-web/public/cards/
```

### 4. Run Development Server
```bash
# Start Next.js development server with Turbopack
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Cloudflare Pages

### Initial Deployment
```bash
# Build the application
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy apps/augurbox-web/out --project-name augurbox-web
```

### Configure Pages Project
1. Go to [Cloudflare Dashboard > Pages](https://dash.cloudflare.com/pages)
2. Connect your GitHub repository (optional)
3. Set build settings:
   - **Build command**: `npm run build`
   - **Build output**: `apps/augurbox-web/out`
   - **Node version**: `20`

### Custom Domain (Optional)
1. In Pages project settings, go to "Custom domains"
2. Add your domain and follow DNS setup instructions

## 🔄 Regenerating Assets

### Update Prompts Only
```bash
npm run generate:prompts
```

### Regenerate All Images
```bash
# Regenerate only missing images
npm run generate:images

# Force regenerate ALL images (including existing ones)
npm run generate:images -- --force

# Copy updated images to web application
cp generated/images/*.png apps/augurbox-web/public/cards/
```

### Update Specific Cards
Edit the card data in `data/cards.ts`, then regenerate:
```bash
npm run generate:prompts
npm run generate:images

# Copy updated images to web application
cp generated/images/*.png apps/augurbox-web/public/cards/
```

## 🛠️ Available Scripts

### Root Project
- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js application for production
- `npm run generate:prompts` - Generate AI prompts for all 78 cards
- `npm run generate:images` - Generate card images using Cloudflare Flux
- `npm run deploy` - Build and deploy to Cloudflare Pages
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Web Application (`apps/augurbox-web`)
- `npm run dev` - Next.js dev server with Turbopack
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Next.js linting

## 🔧 Troubleshooting

### Rate Limits & Retries
**Issue**: Cloudflare AI rate limiting during image generation

**Solutions**:
- The image generation script includes automatic retries with exponential backoff
- If generation fails, run `npm run generate:images` again - it will skip existing images
- For persistent rate limits, wait 5-10 minutes between attempts

**Monitor Progress**:
```bash
# Check how many images have been generated
ls generated/images/*.png | wc -l

# Should show 78 when complete
```

### Missing Images
**Issue**: Some cards don't have generated images

**Solution**:
```bash
# Regenerate missing images only
npm run generate:images

# Check which cards are missing
ls generated/images/ | grep -v ".png$" || echo "All images present"
```

### Build Errors
**Issue**: Next.js build fails

**Common fixes**:
1. Ensure all 78 images are generated: `ls generated/images/*.png | wc -l`
2. Clear Next.js cache: `rm -rf apps/augurbox-web/.next`
3. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

### Environment Issues
**Issue**: AI generation fails with authentication errors

**Solution**:
1. Verify `.env` file has correct credentials
2. Check Cloudflare AI is enabled in your account
3. Ensure API token has proper permissions:
   ```bash
   wrangler whoami
   ```

### Development Server Issues
**Issue**: `npm run dev` fails to start

**Solutions**:
1. Ensure Node.js ≥ 20: `node --version`
2. Check port 3000 availability: `lsof -i :3000`
3. Try alternative port: `npm run dev -- --port 3001`

## 📊 Project Stats

- **Total Cards**: 78 (22 Major Arcana + 56 Minor Arcana)
- **Generated Prompts**: 78 .txt files
- **Generated Images**: 78 .png files
- **Generation Time**: ~5-10 minutes total
- **Build Output**: Static site ready for CDN deployment

## 🏗️ Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI Generation**: Cloudflare AI (Flux model for images, LLM for prompts)
- **Deployment**: Cloudflare Pages + Workers
- **Development**: tsx, ESLint, Prettier
- **Build**: Next.js static export, Wrangler CLI

For questions or issues, check the troubleshooting section above or review the generated logs during asset creation.
