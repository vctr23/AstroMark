# AstroMark 🚀

A modern SaaS platform and dashboard built with **Next.js**, **React**, and **Tailwind CSS**, featuring AI automation powered by **Google Genkit**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Authentication**: [Auth.js](https://authjs.dev/) (NextAuth v5)
- **AI Integration**: [Google Genkit](https://firebase.google.com/docs/genkit) (Gemini)

## ✨ Features

- **Robust Authentication**: Secure credential-based login using Auth.js with Prisma adapter.
- **AI Automations**: Smart actions powered by Google Genkit.
- **Modern UI/UX**: Beautiful, responsive components built with shadcn/ui and Radix Primitives.
- **Database Persistence**: Fully typed database access with Prisma Client.
- **Dashboard Layout**: Pre-built dashboard and settings pages.

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/vctr23/AstroMark.git
cd AstroMark
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root of the project (you can use `.env.example` if available) and add the following variables:

```env
# Your PostgreSQL Connection String
DATABASE_URL="postgres://user:password@host:5432/db?sslmode=require"

# Auth.js Secret (Generate one using: npx auth secret)
AUTH_SECRET="your-auth-secret-here"

# Google Genkit / Gemini API Key
GOOGLE_GENAI_API_KEY="your-google-api-key"
```

### 3. Database Setup

Push the Prisma schema to your database to create the necessary tables:

```bash
npx prisma db push
```

### 4. Run the Development Server

Start the Next.js frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌍 Deployment

This project is deployed on [Vercel](https://vercel.com).
