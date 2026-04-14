# Shape — Pre-Launch Checklist

Things that are fine for dev/testing but must be flipped before exposing the site
to real users.

## Supabase

- [ ] **Re-enable email confirmation.**
      Dashboard → Authentication → Sign In / Providers → Email → toggle
      "Confirm email" **ON**. Phase 1 was tested with it OFF so signup would
      land directly in the dashboard.
- [ ] **Set the Site URL** to `https://theshapecommunity.com` under
      Authentication → URL Configuration. Add `https://theshapecommunity.com/reset-password.html`
      to the redirect allow-list so password reset emails work in prod.
- [ ] **Review row-level security policies.** Right now `profiles` is readable
      by any authenticated user so marketplace pages can show trainer cards.
      When Phase 2 adds workouts/meals/messages, each new table needs its own
      RLS policies — do not ship any table without them.
- [ ] **Rotate keys if they leak.** The publishable key in `supabase.js` is
      designed to be public, but if the `service_role` key is ever committed
      or shared, rotate it immediately in Settings → API.

## Content & legal

- [ ] Update `privacy.html` to reflect actual data handling (Supabase, Cloudflare,
      Stripe when added).
- [ ] Update `terms.html` to reflect the real product.
- [ ] GDPR: add an "export my data" and "delete my account" flow if serving EU users.

## Future phases (reminder)

- **Phase 2:** real data — workouts, meals, check-ins, weights, messages,
      subscriptions. One table at a time with full RLS.
- **Phase 3:** Stripe Connect for trainer/nutritionist payouts.
- **Phase 4:** transactional email (Resend/Postmark) for welcome, check-in
      reminders, etc.
