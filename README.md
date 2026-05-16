# Savings Calculator App

A polished, responsive Savings Calculator built with React, Vite, and Tailwind CSS.

## Features

- **Real-time Calculations**: Instant updates as you type MRP and discount percentage.
- **Dynamic Feedback**: Animated emojis and labels based on the discount amount.
- **Responsive Design**: Mobile-first design with specific enhancements for phone views.
- **Logo Support**: Upload and persist your own logo via LocalStorage.

## Deployment on Vercel

This project is optimized for deployment on Vercel. 

### Steps to Deploy:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click "Add New" -> "Project".
3. Import your repository.
4. Framework Preset: **Vite** (Automatically detected).
5. Output Directory: **dist** (Automatically detected).
6. Click **Deploy**.

### Routing

The `vercel.json` file handles the SPA routing to ensure that refreshes on sub-routes work correctly.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Animations**: Motion
- **Icons**: Lucide React
