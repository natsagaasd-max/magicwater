# Magic Water

Next.js App Router + TypeScript + Tailwind CSS. Mongolian storefront inspired by the AGS water animation; product content and images come from the supplied Figma file.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/admin.

## Current scope

- Responsive storefront, animated Canvas water field and floating water ring, pause and reduced-motion support.
- Product filtering, accessible native order dialog, input validation, demo order creation.
- Admin preview: search/filter orders, change statuses, add/edit products, upload images (PNG/JPEG/WebP up to 2 MB), change price, hide/show products.
- Products and orders use browser localStorage only. The same browser/origin sees updates after reload and across tabs. This is NOT a production database, authenticated admin, or real order delivery. Do not enter real customer information. Storage errors are surfaced.
- No Supabase account was accessed or changed. Later replace `src/lib/demo-store.ts` with Supabase-backed operations and implement admin Auth/RLS/Storage before production. Metadata currently disables indexing.
- Primary product prices are unspecified in Figma and display as quote requests. Replacement-filter prices and contact numbers are transcribed from Figma. Confirm all commercial copy before launch.

## Checks

```sh
npm run typecheck
npm run build
```

No environment variables are needed for this preview. Image assets are stored in `public/images`; `scripts/download-assets.mjs` records their source download process (Figma links expire).
