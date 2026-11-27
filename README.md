# Finaidvice

A small, portable static website with a country-to-country money transfer guide. The homepage keeps the feature menu and site-sharing options separate from the focused transfer tool page.

## Run locally

Install the project dependencies, then run `npm run dev`. The site uses the Cascade UI package to animate the homepage feature menu. Selecting the international transfer option opens `transfer.html`, where the country-route tool runs in the browser without an API or account.

## Deploy or move to another host

Set the repository's Pages source to **GitHub Actions** in Settings → Pages. Pushing to `main` then builds and deploys the site to [https://finaidvice.github.io/finaidvice/](https://finaidvice.github.io/finaidvice/). To deploy elsewhere, run `npm run build` and copy the contents of `dist/` to the host's public web directory. The generated site is static and portable; the destination host does not need Node.js or a server runtime.

## Current features

- Open the international transfer tool from the homepage's Financial function menu.
- Select sending and receiving countries to get a route-specific transfer checklist on its own page.
- Swap the selected countries.
- Copy or share the page and route tip using browser sharing, WhatsApp, or email.
- Responsive layout and accessible native form controls.
- Cascade FLIP animation for opening and closing the feature list.

The guidance is educational only. It does not retrieve live rates or provider fees and is not financial advice.
