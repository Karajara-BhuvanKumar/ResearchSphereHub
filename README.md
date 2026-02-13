# ResearchSphere

A comprehensive platform designed to help researchers, academics, and institutions discover and connect with conferences, journals, and publication opportunities worldwide.

## 🎯 Overview

ResearchSphere streamlines the research publication process by aggregating opportunities from diverse fields and providing powerful search and filtering tools. Our platform connects researchers worldwide with the best opportunities for publication, collaboration, and knowledge sharing.

## ✨ Features

- **Universal Search**: Search across conferences, journals, and calls for papers from a single search bar
- **Advanced Filtering**: Filter by domain, region, submission deadlines, impact factor, and more
- **Comprehensive Database**: Access thousands of conferences, journals, and publication opportunities
- **Multi-page Pagination**: Browse through extensive listings with smooth navigation
- **Responsive Design**: Fully responsive interface optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing
- **Professional Academic Aesthetic**: Clean, modern design tailored for the academic community

## 📄 Pages

### Home Page
- Hero section with prominent call-to-action
- Universal search bar for quick access
- Category tabs for browsing
- Featured conferences, journals, and publications
- Newsletter signup

### Conferences
- Filterable conference listings with detailed cards
- Search by name, location, or topic
- Filter by domain, region, dates, and submission deadlines
- Pagination with 8 conferences per page
- Conference details including dates, location, and submission info

### Journals
- Comprehensive journal database with 40+ entries
- Search and filter functionality
- Impact factor and category information
- Publisher details and submission links
- Clean table layout with colored category badges

### Publications / Calls for Papers
- Dedicated section for open calls (24+ active calls)
- Filter by category and deadline
- Detailed call cards with submission requirements
- Pagination with 8 calls per page
- Direct links to submission portals

### About
- Platform mission and values
- Core features overview
- Statistics and impact metrics
- Team information

### Contact
- Contact form for inquiries
- Office location and contact details
- Social media links
- Academic-themed illustration

## 🛠️ Technologies Used

- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **next-themes** - Dark mode support
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable components
│   ├── ui/         # shadcn/ui components
│   ├── Navigation.tsx
│   └── Footer.tsx
├── pages/          # Page components
│   ├── Index.tsx
│   ├── Conferences.tsx
│   ├── Journals.tsx
│   ├── Publications.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
├── lib/            # Utility functions
├── hooks/          # Custom React hooks
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles and design tokens
```

## 🎨 Design System

The project uses a comprehensive design system with semantic color tokens defined in `src/index.css` and `tailwind.config.ts`:

- **Primary Colors**: Teal-based palette for main actions and accents
- **Secondary Colors**: Blue tones for complementary elements
- **Badge Colors**: Color-coded categories (blue, green, purple, orange)
- **Typography**: Inter font family for clean, professional text
- **Dark Mode**: Full support with theme-specific color tokens

## 🤝 Contributing

This project is built by Bhuvan , Ayush , Pratham
