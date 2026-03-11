# AVN SmartTrade — izypay-web

> **Zimbabwe's Digital Commerce Platform** — Empowering vendors, securing payments, and building trust in Zimbabwe's digital economy, from informal markets to enterprise-level transactions.

---

## Overview

AVN SmartTrade is a multi-role digital commerce web application built for the Zimbabwean market. It provides a unified platform for customers, vendors, agents, administrators, and government officials to participate in a regulated, transparent digital economy.

---

## Features

### Roles & Portals

| Role | Portal Path | Key Capabilities |
|------|-------------|-----------------|
| **Customer** | `/customer` | Marketplace browsing, cart, checkout, payment, transaction history, wallet management |
| **Vendor** | `/vendor` | Product management, order management, payments, analytics, wallet |
| **Agent** | `/agent` | Territory management, commission tracking |
| **Admin** | `/admin` | Vendor approvals, transaction monitoring, user management, reports |
| **Government** | `/government` | Compliance reports, platform oversight |

### Shared Features (all roles)

- Wallet Management
- Dispute Resolution
- Settings
- Support

### Authentication Flow

- Registration & Login
- Forgot Password
- OTP Verification
- Biometric Prompt

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite 6](https://vitejs.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) + [MUI Icons](https://mui.com/material-ui/material-icons/) |
| Charts | [Recharts](https://recharts.org/) |
| Forms | [React Hook Form](https://react-hook-form.com/) |
| Animations | [Motion](https://motion.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## Project Structure

```
izypay-web/
├── index.html
├── vite.config.ts
├── postcss.config.mjs
├── package.json
├── guidelines/
│   └── Guidelines.md          # Design system & coding guidelines
└── src/
    ├── main.tsx
    ├── app/
    │   ├── App.tsx
    │   ├── routes.ts            # All application routes
    │   ├── components/
    │   │   ├── AdvancedFilter.tsx
    │   │   ├── NotificationCenter.tsx
    │   │   ├── figma/           # Figma-generated components
    │   │   ├── layout/          # DashboardLayout
    │   │   └── ui/              # shadcn/ui component library
    │   ├── lib/
    │   │   └── data.ts          # Shared mock/static data
    │   └── pages/
    │       ├── Landing.tsx
    │       ├── NotFound.tsx
    │       ├── auth/            # Login, Register, OTP, Biometric, ForgotPassword
    │       ├── customer/        # Customer portal pages
    │       ├── vendor/          # Vendor portal pages
    │       ├── agent/           # Agent portal pages
    │       ├── admin/           # Admin portal pages
    │       ├── government/      # Government portal pages
    │       └── shared/          # Wallet, Disputes, Settings, Support
    └── styles/
        ├── index.css
        ├── fonts.css
        ├── tailwind.css
        └── theme.css
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd izypay-web

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Path Aliases

The `@` alias maps to the `src/` directory.

```ts
// Instead of:
import { Button } from '../../components/ui/button';

// Use:
import { Button } from '@/app/components/ui/button';
```

---

## Route Reference

| Path | Page |
|------|------|
| `/` | Landing |
| `/register` | Registration |
| `/login` | Login |
| `/forgot-password` | Forgot Password |
| `/otp-verify` | OTP Verification |
| `/biometric` | Biometric Prompt |
| `/customer` | Customer Overview |
| `/customer/marketplace` | Marketplace |
| `/customer/cart` | Cart |
| `/customer/checkout` | Checkout |
| `/customer/payment-success` | Payment Success |
| `/customer/transactions` | Transaction History |
| `/customer/wallet` | Wallet Management |
| `/customer/disputes` | Dispute Resolution |
| `/vendor` | Vendor Overview |
| `/vendor/products` | Product Management |
| `/vendor/orders` | Orders Management |
| `/vendor/payments` | Vendor Payments |
| `/vendor/analytics` | Analytics |
| `/agent` | Agent Overview |
| `/agent/territories` | Territory Management |
| `/agent/commission` | Commission Tracking |
| `/admin` | Admin Overview |
| `/admin/approvals` | Vendor Approvals |
| `/admin/monitoring` | Transaction Monitoring |
| `/admin/users` | User Management |
| `/admin/reports` | Reports |
| `/government` | Government Overview |
| `/government/compliance` | Compliance Reports |

---

## Contributing

1. Follow the design and coding guidelines in [guidelines/Guidelines.md](guidelines/Guidelines.md).
2. Prefer flexbox/grid layouts over absolute positioning.
3. Keep components small — extract helpers and sub-components into their own files.
4. Use the existing `@/app/components/ui` component library before introducing new UI dependencies.
