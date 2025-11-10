# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Sitemap and SEO

This project includes comprehensive SEO optimization with automatic sitemap generation, dynamic meta tags, structured data (JSON-LD), and Open Graph/Twitter Card support.

### Features

- ✅ **Automatic Sitemap Generation**: Generates sitemap.xml with all routes during build
- ✅ **Dynamic Meta Tags**: Page-specific SEO meta tags (title, description, keywords)
- ✅ **Open Graph & Twitter Cards**: Social media sharing optimization
- ✅ **Structured Data (JSON-LD)**: Organization, Service, Article, and Breadcrumb schemas
- ✅ **Canonical URLs**: Prevents duplicate content issues
- ✅ **Breadcrumb Navigation**: Structured breadcrumb data for better navigation
- ✅ **Robots.txt**: Automatically generated with sitemap reference

### Configuration

To set your site's base URL:

1. **For Vercel deployments**: Set the `VITE_SITE_URL` or `SITE_URL` environment variable in your Vercel project settings
   - Go to your project settings → Environment Variables
   - Add `VITE_SITE_URL` with your production domain (e.g., `https://hlcc.africa`)

2. **For local development**: Create a `.env.local` file (not committed to git) with:

   ```
   VITE_SITE_URL=https://hlcc.africa
   ```

The sitemap will be available at `/sitemap.xml` and `robots.txt` will reference it automatically.

### Manual Sitemap Generation

You can manually generate the sitemap by running:

```bash
npm run generate-sitemap
```

### SEO Implementation

#### Page-Specific SEO

Each page includes:

- **Dynamic title tags** with page-specific content
- **Meta descriptions** optimized for search engines
- **Open Graph tags** for social media sharing
- **Twitter Card tags** for Twitter sharing
- **Structured data** (JSON-LD) for rich snippets
- **Breadcrumb navigation** for better UX and SEO

#### Pages with SEO

- Home page: Organization and WebSite schema
- About page: Organization schema + breadcrumbs
- Services: Organization schema + Service schema (for each service)
- Insights: Organization schema + Article schema (for each article)
- Contact: Organization schema + breadcrumbs
- Register pages: Organization schema + breadcrumbs

#### Structured Data Types

- **Organization**: Company information, contact details, social links
- **WebSite**: Site-wide search functionality
- **Service**: Service-specific information for each service page
- **Article**: Article metadata for blog posts/insights
- **BreadcrumbList**: Navigation hierarchy for all pages

### Customizing SEO

To customize SEO for a specific page, edit `src/lib/seo.ts`:

- Update `pageSEO` object for page-specific metadata
- Modify `siteConfig` for site-wide settings
- Update `defaultSEO` for fallback values

### Favicon Configuration

If Google Search is showing your favicon with a white circle background, see [FAVICON_GUIDE.md](./docs/FAVICON_GUIDE.md) for instructions on creating favicons without transparency.

**Quick fix**: Ensure your favicon files (especially `android-chrome-192x192.png`) have a solid background color, not transparency. Google adds a white background to transparent favicons.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
