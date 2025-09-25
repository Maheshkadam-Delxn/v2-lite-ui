This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```
v2-lite-ui
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ image.jpeg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ src
   ├─ app
   │  ├─ admin
   │  │  ├─ email
   │  │  │  └─ page.jsx
   │  │  ├─ layout.jsx
   │  │  ├─ my-projects
   │  │  │  └─ [id]
   │  │  │     ├─ approvals
   │  │  │     │  ├─ inspection-report
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ rfi
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ snagging
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ submittal
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ dashboard
   │  │  │     │  └─ page.jsx
   │  │  │     ├─ payment
   │  │  │     │  ├─ bill-Payment
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ expense
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ indent
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ purchase-order
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ receive-note
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ product
   │  │  │     │  └─ page.jsx
   │  │  │     ├─ project-planning
   │  │  │     │  ├─ activity
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ resources
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ timeline
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ project-resources
   │  │  │     │  ├─ boq
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ drawings
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ files
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ reports
   │  │  │     │  ├─ daily-progress-report
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ material-consumption-report
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ timeline-report
   │  │  │     │     └─ page.jsx
   │  │  │     └─ work-order
   │  │  │        ├─ Adv-payments
   │  │  │        │  └─ page.jsx
   │  │  │        ├─ bill
   │  │  │        │  └─ page.jsx
   │  │  │        ├─ bill-payments
   │  │  │        │  └─ page.jsx
   │  │  │        └─ page.jsx
   │  │  ├─ page.jsx
   │  │  ├─ profile
   │  │  │  └─ page.jsx
   │  │  ├─ projects
   │  │  │  └─ page.jsx
   │  │  ├─ settings
   │  │  │  ├─ event
   │  │  │  │  └─ page.jsx
   │  │  │  ├─ reminder
   │  │  │  │  └─ page.jsx
   │  │  │  ├─ role
   │  │  │  │  └─ page.jsx
   │  │  │  └─ scheduleReport
   │  │  │     └─ page.jsx
   │  │  └─ users
   │  │     ├─ member
   │  │     │  └─ page.jsx
   │  │     └─ vendor
   │  │        └─ page.jsx
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.js
   │  ├─ login
   │  │  └─ page.jsx
   │  ├─ page.js
   │  └─ register
   │     └─ page.jsx
   └─ components
      ├─ DashboardSlidebar.jsx
      ├─ landing
      │  ├─ Features.jsx
      │  ├─ Footer.jsx
      │  ├─ Header.jsx
      │  ├─ Hero.jsx
      │  ├─ Process.jsx
      │  ├─ Services.jsx
      │  ├─ SkyStructPricing .jsx
      │  └─ Testimonials.jsx
      ├─ LandingPage.jsx
      ├─ my-project
      │  └─ header.jsx
      └─ ProfilePage.jsx

```
```
v2-lite-ui
├─ eslint.config.mjs
├─ jsconfig.json
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ image.jpeg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ src
   ├─ app
   │  ├─ admin
   │  │  ├─ email
   │  │  │  └─ page.jsx
   │  │  ├─ layout.jsx
   │  │  ├─ my-projects
   │  │  │  └─ [id]
   │  │  │     ├─ approvals
   │  │  │     │  ├─ inspection-report
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ rfi
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ snagging
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ submittal
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ dashboard
   │  │  │     │  └─ page.jsx
   │  │  │     ├─ payment
   │  │  │     │  ├─ bill-Payment
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ expense
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ indent
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ purchase-order
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ receive-note
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ product
   │  │  │     │  └─ page.jsx
   │  │  │     ├─ project-planning
   │  │  │     │  ├─ activity
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ resources
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ timeline
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ project-resources
   │  │  │     │  ├─ boq
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ drawings
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ files
   │  │  │     │     └─ page.jsx
   │  │  │     ├─ reports
   │  │  │     │  ├─ daily-progress-report
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  ├─ material-consumption-report
   │  │  │     │  │  └─ page.jsx
   │  │  │     │  └─ timeline-report
   │  │  │     │     └─ page.jsx
   │  │  │     └─ work-order
   │  │  │        ├─ Adv-payments
   │  │  │        │  └─ page.jsx
   │  │  │        ├─ bill
   │  │  │        │  └─ page.jsx
   │  │  │        ├─ bill-payments
   │  │  │        │  └─ page.jsx
   │  │  │        └─ page.jsx
   │  │  ├─ page.jsx
   │  │  ├─ profile
   │  │  │  └─ page.jsx
   │  │  ├─ projects
   │  │  │  └─ page.jsx
   │  │  ├─ settings
   │  │  │  ├─ event
   │  │  │  │  └─ page.jsx
   │  │  │  ├─ reminder
   │  │  │  │  └─ page.jsx
   │  │  │  ├─ role
   │  │  │  │  └─ page.jsx
   │  │  │  └─ scheduleReport
   │  │  │     └─ page.jsx
   │  │  └─ users
   │  │     ├─ member
   │  │     │  └─ page.jsx
   │  │     └─ vendor
   │  │        └─ page.jsx
   │  ├─ favicon.ico
   │  ├─ globals.css
   │  ├─ layout.js
   │  ├─ login
   │  │  └─ page.jsx
   │  ├─ page.js
   │  └─ register
   │     └─ page.jsx
   ├─ components
   │  ├─ DashboardSlidebar.jsx
   │  ├─ landing
   │  │  ├─ Features.jsx
   │  │  ├─ Footer.jsx
   │  │  ├─ Header.jsx
   │  │  ├─ Hero.jsx
   │  │  ├─ Process.jsx
   │  │  ├─ Services.jsx
   │  │  ├─ SkyStructPricing .jsx
   │  │  └─ Testimonials.jsx
   │  ├─ LandingPage.jsx
   │  ├─ my-project
   │  │  └─ header.jsx
   │  └─ ProfilePage.jsx
   └─ context
      └─ ProjectContext.js

```