# Web Field 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-blue?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.0-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Ready%20Components-1F2937?logo=tailwindcss&logoColor=white)](https://ui.shadcn.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5.0.0-beta.29-3B82F6?logo=next.js&logoColor=white)](https://next-auth.js.org/)
[![Sanity.io](https://img.shields.io/badge/Sanity.io-4.10.2-FF3E00?logo=sanity&logoColor=white)](https://www.sanity.io/)
[![Netlify](https://img.shields.io/badge/Netlify-Deploy-success?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Sentry](https://img.shields.io/badge/Sentry-Monitoring-3B4252?logo=sentry&logoColor=white)](https://sentry.io/)
[![Markdown-it](https://img.shields.io/badge/Markdown--it-14.1.0-000000?logo=markdown&logoColor=white)](https://github.com/markdown-it/markdown-it)
[![lucide-react](https://img.shields.io/badge/Lucide-React-4B5563?logo=react&logoColor=white)](https://lucide.dev/)
[![Styled Components](https://img.shields.io/badge/Styled%20Components-6.1.19-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.0.0-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

---

## Description

Web Field is a modern platform for showcasing startups and curated content. Built with Next.js, React 19+, and Sanity.io, it supports SSR, ISR, and PPR for fast and dynamic content delivery.

[Live Demo](https://web-field.netlify.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Developer](#developer)

---

## Features

- User authentication with GitHub OAuth (NextAuth.js)
- Create and view startups with Markdown-based pitch descriptions
- Editor-curated playlists (e.g., “Mohanad Picks”)
- Dynamic images via Sanity.io
- Server-side rendering (SSR), incremental static regeneration (ISR), and partial page rendering (PPR)
- Analytics integration via Sentry
- Ready-to-use UI components via [shadcn/ui](https://ui.shadcn.com/)

---

## Tech Stack

| Layer           | Technology                                            |
| --------------- | ----------------------------------------------------- |
| Framework       | Next.js 16 (App Router)                               |
| Frontend        | React 19+                                             |
| Styling         | Tailwind CSS 4.x, Tailwind Typography, Tailwind Merge |
| Authentication  | NextAuth.js (GitHub OAuth)                            |
| CMS / Backend   | Sanity.io                                             |
| Markdown Editor | @uiw/react-md-editor, markdown-it                     |
| Analytics       | Sentry                                                |
| Deployment      | Netlify                                               |

---

## Project Structure

```
├─ app/ # Next.js App Router pages
│ ├─ startup/ # Startup dynamic pages
│ └─ user/ # User pages
├─ components/ # Reusable UI components
│ ├─ StartupCard.tsx
│ ├─ UserStartups.tsx
│ └─ ui/ # Shadcn/ui custom components
├─ lib/ # Utilities and helpers
│ ├─ utils.ts
│ ├─ client.ts # Sanity client
│ └─ actions.ts # Server actions
├─ sanity/ # Sanity studio & schema
├─ public/ # Static assets
├─ styles/ # Tailwind & global CSS
├─ pages/api/ # API routes for NextAuth
└─ package.json
```

---

## Developer

**Mohanad Ayoub** [GitHub profile](https://github.com/zlmohanadlz) - [Linkedin Profile](https://www.linkedin.com/in/mohanad-ayoub-55bb29382)
