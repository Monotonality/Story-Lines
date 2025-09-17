# Story Line

A modern, Obsidian-inspired story development and note-taking application built with React, TypeScript, and Vite.

![Story Line](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-cyan)

## ✨ Features

- **📝 Advanced Markdown Editor**: Powered by CodeMirror 6 with syntax highlighting and dark theme
- **🔍 Intelligent Search**: Fast fuzzy search across documents using Fuse.js
- **🕸️ Interactive Graph**: Visualize story connections with Cytoscape.js
- **🎨 Dark Obsidian Theme**: Beautiful dark UI with purple/blue accents
- **⚡ Fast & Modern**: Built with Vite for lightning-fast development
- **📱 Responsive**: Works seamlessly across desktop and mobile devices

## 🎨 Design System

### Color Scheme
The application uses a carefully crafted Obsidian-inspired dark color palette:

- **Primary Background**: `#1e1e2e` - Deep dark base
- **Secondary Background**: `#25273a` - Sidebar and panels  
- **Tertiary Background**: `#2a2d3a` - Cards and elevated surfaces
- **Text Colors**: 
  - Primary: `#e5e7eb` (gray-200)
  - Secondary: `#9ca3af` (gray-400)
  - Muted: `#6b7280` (gray-500)
- **Accent Colors**:
  - Purple: `#8b5cf6` - Primary actions
  - Blue: `#3b82f6` - Secondary actions
  - Green: `#10b981` - Success states
  - Yellow: `#f59e0b` - Warning states

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd story-line
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeMirrorEditor.tsx    # Advanced markdown editor
│   ├── SearchComponent.tsx     # Fuzzy search with filters
│   └── GraphVisualization.tsx  # Interactive story graph
├── App.tsx                     # Main application component
├── App.css                     # Custom styles and utilities
├── index.css                   # TailwindCSS base styles
└── main.tsx                    # Application entry point

config/
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

## 🛠️ Tech Stack

### Core Framework
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Vite 7.1** - Ultra-fast build tool and dev server

### Styling & UI
- **TailwindCSS 4.1** - Utility-first CSS framework
- **Custom Design System** - Obsidian-inspired dark theme
- **Responsive Design** - Mobile-first approach

### Editor & Text Processing
- **CodeMirror 6** - Advanced code editor
  - `@codemirror/view` - Editor view layer
  - `@codemirror/state` - State management
  - `@codemirror/lang-markdown` - Markdown language support
  - `@codemirror/theme-one-dark` - Dark theme
  - `@codemirror/commands` - Editor commands

### Search & Data
- **Fuse.js 7.1** - Powerful fuzzy search library
- **TypeScript Types** - Full type safety throughout

### Visualization
- **Cytoscape.js 3.33** - Graph theory library for visualization
- **@types/cytoscape** - TypeScript definitions

## 🎯 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📱 Components Overview

### 1. CodeMirror Editor
**Features:**
- Markdown syntax highlighting
- Real-time word and character count
- Dark theme integration
- Customizable editor settings
- Full-screen editing mode

**Usage:**
```tsx
import CodeMirrorEditor from './components/CodeMirrorEditor'

<CodeMirrorEditor />
```

### 2. Search Component
**Features:**
- Fuzzy search with Fuse.js
- Filter by document type (documents, characters, locations)
- Highlighted search results
- Real-time search as you type

**Usage:**
```tsx
import SearchComponent from './components/SearchComponent'

<SearchComponent />
```

### 3. Graph Visualization
**Features:**
- Interactive node-based graph
- Different node shapes for different types
- Relationship visualization
- Export to PNG functionality
- Multiple layout algorithms

**Usage:**
```tsx
import GraphVisualization from './components/GraphVisualization'

<GraphVisualization />
```

## 🎨 Customization

### Theme Customization
Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      obsidian: {
        'bg-primary': '#your-color',
        'purple': '#your-accent-color',
        // ... other colors
      }
    }
  }
}
```

### Component Styling
The project uses Tailwind's `@layer components` for reusable component styles:

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-obsidian-purple text-white rounded-md;
    @apply hover:bg-obsidian-purple-light transition-colors;
  }
}
```

## 🔧 Development

### Adding New Components
1. Create component in `src/components/`
2. Export from component file
3. Import in `App.tsx` or parent component
4. Add TypeScript types as needed

### Styling Guidelines
- Use Tailwind utility classes for styling
- Follow the established color scheme
- Use component classes for reusable patterns
- Maintain responsive design principles

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
The built files in `dist/` can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Obsidian** - For design inspiration
- **CodeMirror** - For the excellent editor framework
- **TailwindCSS** - For the utility-first CSS approach
- **React Team** - For the amazing framework
- **Vite Team** - For the blazing-fast build tool

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**