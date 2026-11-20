# Finaidvice

A small, portable static website with a country-to-country money transfer guide.

## Run locally

Install the project dependencies, then run `npm run dev`. The site uses the Cascade UI package for its animated feature menu; the country-route tool itself runs in the browser without an API or account.

## Deploy or move to another host

Run `npm run build` and copy the contents of `dist/` to any static host's public web directory. The generated site is static and portable; the destination host does not need Node.js or a server runtime.

## Current features

- Select sending and receiving countries to get a route-specific transfer checklist.
- Swap the selected countries.
- Copy or share the page and route tip using browser sharing, WhatsApp, or email.
- Responsive layout and accessible native form controls.
- Cascade FLIP animation for opening and closing the feature list.

The guidance is educational only. It does not retrieve live rates or provider fees and is not financial advice.
