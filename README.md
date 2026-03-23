# SpendWise

SpendWise is a personal finance web application that helps you track expenses, manage budgets, and get AI-powered spending tips.

## Features

- **Expense Tracking** – Log expenses with an amount, category, and date.
- **Expense Summary** – View your spending broken down by category with charts.
- **Budget Management** – Set monthly budgets per category and compare them against actual spending.
- **AI Spending Tips** – Receive personalized money-saving suggestions powered by Google Gemini via Firebase Genkit.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/) for data visualization
- [Firebase Genkit](https://firebase.google.com/docs/genkit) for AI flows
- [React Hook Form](https://react-hook-form.com/) for form validation

## Getting Started

### Prerequisites

- Node.js >= 18.18 (or Node.js 20+ recommended)
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

### Run the Genkit AI dev server (optional)

To develop or inspect AI flows locally:

```bash
npm run genkit:dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server on port 9002 |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start the Genkit AI dev UI |
| `npm run genkit:watch` | Watch Genkit AI flows for changes |

## Deployment

Deploy to [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) using the Firebase CLI:

```bash
firebase deploy
```
