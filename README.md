# Abun Dashboard – Modern React Dashboard

## 🚀 Project Overview

**Abun Dashboard** is a modern, responsive admin panel built with **React**, **TypeScript**, and **Tailwind CSS**. It features a clean, professional UI with:

- A collapsible sidebar
- Responsive, accessible design
- Advanced table functionalities (filtering, sorting, pagination)

The dashboard is primarily designed to manage and monitor article content efficiently.

🔗 **Live Demo**:  
[![Watch the video](https://cdn.loom.com/sessions/thumbnails/d86053ad8d0c4a24957ac57892e8fa68-ca9c128a64083367-full-play.gif)](https://www.loom.com/share/d86053ad8d0c4a24957ac57892e8fa68?sid=fc9a474b-0fef-4f50-bfca-475ce7a03bfe)

---

## 🧱 Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (based on Radix UI primitives)
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Notifications:** Sonner Toast

---

## 📁 Project Architecture

The project follows a modular, component-based architecture with clear separation of concerns.

### Directory Structure

```text
src/
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components (shadcn/ui)
│   └── ...            # Custom components (AppSidebar, PageLoader, etc.)
├── data/              # Mock data and API simulation
├── hooks/             # Custom React hooks
├── layouts/           # Layout components (DashboardLayout)
├── lib/               # Utility functions and helpers
├── pages/             # Page components
└── ...
```

### Key Components

- **App.tsx** – Entry point: sets up routing, providers, and global configs
- **DashboardLayout** – Layout containing the sidebar and header
- **AppSidebar** – Collapsible navigation sidebar
- **Articles.tsx** – Article management page with full filtering/sorting/pagination features

---

## 🎨 Design Principles

### 1. Componentization
- Reusable and composable UI components
- Enhances maintainability and code reusability

### 2. Responsive Design
- Mobile-first approach with progressive enhancement
- `useIsMobile` hook for screen detection
- Horizontal scroll support for tables on smaller screens

### 3. Accessibility
- Semantic HTML
- ARIA attributes
- Keyboard navigation support
- Screen reader and color contrast compliance

### 4. Performance Optimization
- Lazy loading and code splitting with `React.lazy` and `Suspense`
- Optimized render cycles
- Efficient state handling

---

## ✨ Features

- **Responsive Dashboard** – Seamlessly adapts to all screen sizes
- **Interactive Sidebar** – Collapsible with active state highlights
- **Tab-Based Navigation** – For different article statuses
- **Advanced Data Table**:
  - Multi-column sorting
  - Real-time filtering and search
  - Paginated views
  - Row selection
- **Toast Notifications** – Feedback for user actions
- **Skeleton Loaders** – Enhanced perceived performance during fetch

---

## 🛠 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd abun-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

