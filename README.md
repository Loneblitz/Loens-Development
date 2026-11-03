# Lones Development — storefront starter

A multi-page Next.js storefront based on the supplied Lones Development HTML. Includes home, store, product detail pages, Supabase customer authentication, account purchase history, custom requests, a basic admin view, Stripe Checkout, and a Stripe webhook.

## Important architecture note

GitHub is used to store the source code. Deploy this Next.js app to **Vercel** (recommended) or another server-capable host. GitHub Pages is static-only and cannot safely run the Stripe secret-key API routes in this project.

## 1. Requirements

- Node.js 20.9+
- A GitHub account/repository
- A Vercel account
- A Supabase project
- A Stripe account

## 2. Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The app shell and product catalog can be viewed, but authentication, requests, and payments require Supabase and Stripe credentials.

## 3. Configure Supabase

1. Create a project at https://supabase.com.
2. Open Project Settings -> API and copy the Project URL, anon/public key, and service_role key.
3. Put them in `.env.local` using the names in `.env.example`.
4. In Supabase -> SQL Editor, run `supabase/schema.sql`.
5. In Authentication -> URL Configuration, set the Site URL to your deployed domain and add redirect URL `https://YOUR-DOMAIN/auth/callback` plus `http://localhost:3000/auth/callback` for local testing.
6. Create your account through `/login`. Find your user UUID in Supabase Authentication -> Users.
7. Set `ADMIN_USER_IDS` to your UUID (comma-separated for multiple admins).

Never put the Supabase service-role key in a `NEXT_PUBLIC_` variable or in browser code.

## 4. Configure Stripe test payments

1. Create/activate your Stripe account and use **test mode** first.
2. Open Stripe Developers -> API keys and copy the test secret key (`sk_test_...`) into `STRIPE_SECRET_KEY`.
3. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` locally.
4. Install Stripe CLI, then run:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

5. Copy the webhook signing secret printed by Stripe CLI (`whsec_...`) into `STRIPE_WEBHOOK_SECRET`.
6. Test a checkout with Stripe's test card `4242 4242 4242 4242`, a future expiry, any CVC, and any ZIP.
7. Confirm the purchase appears in Supabase `purchases` and `/account`.

For production, create a webhook endpoint in Stripe pointing to:
`https://YOUR-DOMAIN/api/stripe-webhook`
Subscribe to `checkout.session.completed`, then use that endpoint's signing secret as `STRIPE_WEBHOOK_SECRET`. Switch to live Stripe API keys only after testing and reviewing your policies.

**Security:** prices are read from the server-side catalog (`src/lib/products.ts`), not trusted from the browser. The webhook verifies Stripe's signature before writing a purchase. Do not expose secret keys.

## 5. Deploy with GitHub + Vercel

1. Create a new GitHub repository, e.g. `lones-development`.
2. Upload/commit the contents of this folder to the repository root.
3. In Vercel, choose Add New -> Project and import that GitHub repository.
4. Keep the default Next.js build settings.
5. Add every variable from `.env.example` in Vercel Project Settings -> Environment Variables.
6. Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS domain.
7. Deploy. Each GitHub push can trigger a new Vercel deployment.
8. Add the production Stripe webhook endpoint and update its signing secret in Vercel, then redeploy.

## 6. Customize products

Edit `src/lib/products.ts`. Prices are integer cents: `1999` means $19.99. Product IDs should be URL-safe and unique.

## 7. Important items before going live

- Add real product images and replace any placeholder marketing copy.
- Connect private file storage and a verified download entitlement flow. This starter intentionally does **not** expose downloadable files or pretend a payment automatically delivers files.
- Review your refund, license, privacy, and terms policies before selling.
- Add support contact details and your actual Discord invite.
- Add order emails/receipts if desired; Stripe sends payment receipts when configured in its dashboard.
- Test failed payments, duplicate webhook delivery, account email confirmation, and mobile layouts.
