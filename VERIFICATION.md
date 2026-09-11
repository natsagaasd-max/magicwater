# Preview verification

Verified locally on 2026-09-11.

- `npm run build`: passed, home and `/admin` generated successfully.
- `npm run typecheck`: passed.
- Browser: storefront rendered with local Figma image assets; no broken images in the inspected page.
- Order form rejected a 3-digit phone number, accepted synthetic test data, and showed an explicit demo confirmation.
- The submitted order appeared in `/admin`; changing it to confirmed updated the order and summary counters.
- Product price edits appeared on the storefront. The temporary price was restored to an unspecified quote price through the admin UI.
- Mobile viewport (390 × 844): hero and menu rendered without document-level horizontal overflow. Product category filtering returned the two shower filters.
- Product editor uses a native modal dialog with focus containment and Escape dismissal.

One clearly labeled synthetic order remains in this browser for reviewing the admin preview. Supabase, authentication, cross-device persistence, real order delivery, and production deployment are intentionally not configured. Image upload and product creation are implemented but were not exercised through the browser in this pass.
