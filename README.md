# AffiliatDesk — IB / Affiliate Management Dashboard

## 1. Project Overview

AffiliatDesk is a frontend-only IB (Introducing Broker) and affiliate management dashboard built for forex brokerages. It gives managers a single interface to monitor partner performance, track leads through the sales pipeline, review commission records, and analyze growth trends — all without a backend.

Authentication is handled client-side with mock credentials (any non-empty email/password is accepted), making the app fully self-contained and ready to run out of the box.

---

## 2. Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router DOM 7 |
| UI component library | MUI (Material UI) 9 |
| MUI icons | @mui/icons-material 9 |
| Styling engine | Emotion (`@emotion/react`, `@emotion/styled`) |
| Font | Roboto via `@fontsource/roboto` |
| Linting | ESLint 9 + eslint-plugin-react-hooks + eslint-plugin-react-refresh |
| Language | JavaScript (ESM) |

---

## 3. Features

### Login / Sign Up
- Mock authentication — any non-empty email and password grants access.
- Sign Up creates a session with the provided name, email, and IB Manager role.
- Public routes automatically redirect authenticated users to the dashboard.

### Dashboard (`/dashboard`)
- **KPI stat cards** — Total Leads, Active Affiliates, Commissions Due, and Conversion Rate, each with a month-over-month trend indicator.
- **Top Affiliates table** — ranks partners by leads, commission earned, and conversion rate with visual progress bars.
- **Recent Leads feed** — live-style list of the latest leads with country, affiliate code, and status badge.
- **Monthly Performance Targets** — progress bars for Leads, Conversions, Commission Paid, and New Affiliates targets.

### Leads (`/leads`)
- Summary count cards for Total, New, Qualified, Converted, and Lost leads.
- **Searchable, filterable table** — filter by status chip or free-text search across name, email, and country.
- Displays lead ID, contact info, country, referring affiliate, traffic source, estimated deal value, date, and status.
- Toolbar with Add Lead, Export CSV, and Refresh actions.

### Affiliates (`/affiliates`)
- Summary cards for Total, Active, Gold-Tier count, and average conversion rate.
- **Partner table** — searchable and filterable by status (Active / Pending / Inactive).
- Shows affiliate ID, country, tier (Gold / Silver / Bronze with star indicator), lead count, conversion rate bar, commission, and status.
- Per-row action menu (MoreVert) and Export button.

### Commissions (`/commissions`)
- Summary cards for Total Commissions, Paid Out, Pending Payout, and Pay Rate.
- **Payout progress bar** — shows current-month completion towards the total payout obligation.
- **Commission records table** — period, leads, conversions, commission rate, gross volume, commission amount, status (Paid / Processing / Pending), and payment date.
- Process Payouts and Export actions.

### Reports (`/reports`)
- **KPI row** — 6-month aggregates for Leads, Conversions, Commission, and Conversion Rate with growth indicators.
- **Monthly Lead Volume bar chart** — CSS-rendered bar chart for the last 6 months with summary totals.
- **Lead Sources breakdown** — horizontal progress bars showing volume and CPA per channel (Google Ads, Referral, Meta Ads, LinkedIn, Organic, Email).
- **Top Countries table** — lead volume, distribution bar, conversion rate, and share per country.
- Period selector (1M / 3M / 6M / 1Y) and Export Report button.

### Layout & Navigation
- Collapsible **sidebar** with dark navy background, active-route highlighting, and a badge on the Leads item.
- **Dark / light mode** toggle via a custom `ThemeContext`.
- Fully responsive — sidebar collapses to a drawer on mobile; all tables scroll horizontally on small screens.
- User profile footer in the sidebar with logout.

---

## 4. How to Run

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Navigate to the app directory
cd affiliate-desk

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.  
Log in with any email and password (e.g. `test@test.com` / `password`).

**Other scripts:**

```bash
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## 5. Folder Structure

```
affiliate-desk/src/
├── main.jsx                  # App entry point
├── App.jsx                   # Router, auth guards, top-level providers
├── index.css                 # Global base styles
├── App.css                   # App-level overrides
├── theme.js                  # MUI theme config (light + dark)
│
├── contexts/
│   ├── AuthContext.jsx       # Mock auth state (login, signup, logout)
│   └── ThemeContext.jsx      # Dark/light mode toggle
│
├── components/
│   ├── Layout.jsx            # Shell with sidebar + top bar + <Outlet />
│   └── Sidebar.jsx           # Navigation sidebar with user footer
│
├── pages/
│   ├── Login.jsx             # Login page
│   ├── SignUp.jsx            # Sign-up page
│   ├── Dashboard.jsx         # Overview KPIs, top affiliates, recent leads
│   ├── Leads.jsx             # Lead pipeline table
│   ├── Affiliates.jsx        # Affiliate partner table
│   ├── Commissions.jsx       # Commission records & payout tracker
│   └── Reports.jsx           # Performance analytics & charts
│
└── assets/
    ├── hero.png
    ├── react.svg
    └── vite.svg
```
