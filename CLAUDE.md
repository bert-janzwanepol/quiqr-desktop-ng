# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quiqr Desktop is a local-first CMS for static files and engines like Quarto or Hugo SSG. It's an Electron application with a React frontend and Express backend that provides a desktop interface for managing static sites.

## Development Commands

### Setup
```bash
npm install                           # Install root dependencies (includes electron)
cd frontend && npm install --legacy-peer-deps  # Install frontend dependencies (legacy peer deps needed for Material-UI v4)
```

**Important**: Make sure `electron` is installed in the root project. If you get `spawn electron ENOENT` errors, run `npm install` in the root directory.

### Development
```bash
npm run dev                    # Start both frontend and electron in development mode (sequenced startup)
npm run dev:frontend           # Start frontend only (React dev server on port 4001)
npm run dev:electron           # Start electron only
npm run dev:electron:wait      # Start electron after waiting for frontend on port 4001
```

**✅ Fixed**: Development servers now start in proper sequence using `wait-on` package. The frontend dev server starts first, and electron waits until port 4001 is available before launching.

### Building
```bash
npm run build                  # Build frontend and create electron distributables
npm run build:frontend         # Build React frontend only
npm run dist                   # Create electron distributables (alias for electron-builder)
```

**Note**: The project has been upgraded to React 17 and react-scripts 5.0.1 for modern Node.js compatibility.

### Manual Platform Builds
```bash
electron-builder build --mac    # Build macOS installer
electron-builder build --win    # Build Windows installer  
electron-builder build --linux  # Build Linux installer
```

## Architecture

### Project Structure
- **Root**: Main electron configuration and scripts
- **frontend/**: React application (port 4001 in dev, built to frontend/build/)
- **backend/**: Express server and main electron processes
- **electron/**: Electron main process entry point
- **resources/**: Application resources and Hugo versions data

### Key Components

#### Electron Main Process (`electron/main.js`)
- Entry point that starts the Express backend server
- Manages main window and UI managers
- Sets up global application state and configuration

#### Backend (`backend/`)
- **server.js**: Express server (port 5150) with API endpoints
- **src-main/**: Core application logic including:
  - Site management and workspace services
  - Hugo integration and server management
  - Git/GitHub synchronization
  - File operations and build actions
  - Background job processing

#### Frontend (`frontend/src/`)
- React 16.14 application using Material-UI v4
- Router-based navigation with workspace and site management
- Form components for content editing (HoForm, SukohForm)
- Theme support (light/dark modes)

### Communication Architecture
- Frontend communicates with backend via HTTP API calls to `localhost:5150/api/*`
- Backend dynamically creates Express routes from `apiMain` object methods
- Global state management through electron main process globals

### Site and Workspace Management
- Sites are managed through the SiteLibrary system
- Workspaces represent different views/contexts within a site
- Hugo integration for static site generation
- Sync capabilities with folder, GitHub, and system git

## Development Notes

### Legacy Code Patterns
- Uses older React patterns (class components, componentDidMount)
- Material-UI v4 (not the latest version)
- Some commented out electron IPC code marked as "PORTQUIQR"

### Environment Configuration
- ESLint is disabled during builds via `DISABLE_ESLINT_PLUGIN=true` in frontend/.env (due to legacy code patterns)
- Electron runs in development mode when `NODE_ENV=development`
- Source maps are disabled for faster builds (`GENERATE_SOURCEMAP=false`)

### Current Upgrade Status
- ✅ **React**: Upgraded from 16.14.0 → 17.0.2
- ✅ **react-scripts**: Upgraded from 3.2.0 → 5.0.1
- ✅ **Build system**: Now compatible with Node.js 18+ (no more OpenSSL errors)
- ✅ **Dependencies**: Resolved Node.js path polyfill issues in browser components
- ✅ **Material-UI**: **COMPLETED** - Migrated from @material-ui v4 → @mui v5.18.0
- ⚠️ **react-router-dom**: Still on v4 (very old) - should upgrade to v6+

### Completed TODO Items
- [x] **Fix dev server startup order** ✅ **COMPLETED** - Now uses `wait-on` to ensure frontend is ready on port 4001 before starting electron
- [x] **Migrate from @material-ui to @mui** ✅ **COMPLETED** - Successfully migrated to MUI v5.18.0 with React 17 compatibility
  - All imports transformed from `@material-ui/*` to `@mui/*`
  - Theme system updated with `adaptV4Theme` and `StyledEngineProvider` 
  - Replaced deprecated `material-ui-color` with native HTML color input
  - Bundle size reduced by 50.56 kB
- [x] **Migrate from require() to import syntax** ✅ **COMPLETED** - Systematically converted CommonJS to ES6 modules
  - Converted `App.jsx` and `Workspace.jsx` dynamic style requires to static imports
  - Updated `style-light.js` and `style-dark.js` from CommonJS exports to ES6 default exports
  - Preserved `window.require('electron')` calls for Electron API access
  - Fixed export/import mismatches that caused runtime errors
  - All 17+ JSX files now use modern ES6 import syntax for regular modules

### Remaining TODO Items
- [ ] **Upgrade Electron** (medium priority) 
- [ ] **Clean up ESLint warnings** (~200+ unused variables, no-undef issues)
- [ ] **Upgrade react-router-dom v4 → v6** (breaking changes in routing API)
- [ ] **Code splitting and bundle size optimization** (current: 997.04 kB, reduced from 1.05 MB)

### Build System
- Uses electron-builder for packaging
- Frontend builds to `frontend/build/`
- Distribution files output to `dist/`
- Supports Windows (nsis, portable), macOS (dmg), and Linux (AppImage, deb, rpm)