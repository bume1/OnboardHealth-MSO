# OnboardHealth - Healthcare Implementation Platform

## Overview

OnboardHealth is a white-label implementation platform designed for healthcare practices. Originally built for clinical laboratory implementations, it has been generalized to serve DPC practices, primary care clinics, medical spas, and diagnostic labs.

### Who It's For
- DPC practices
- Primary care clinics
- Medical spas
- Diagnostic labs

### Use Cases
- Patient onboarding
- New service line launches (like physician office labs)
- New facility setup
- Partner/referring provider onboarding

**Core Value Proposition**: One system where practices house protocols, manage implementation workflows, and give both internal teams AND stakeholders clear access to everything they need. Turn 20 hours of scattered manual work into 2 hours of streamlined execution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Express.js REST API server
- **Authentication**: JWT-based auth with bcryptjs password hashing
- **Data Storage**: Replit Database (key-value store) - not a traditional SQL database
- **Data Structure**: 
  - Users stored under `users` key as array
  - Projects stored under `projects` key as array
  - Tasks stored per-project under `tasks_{projectId}` keys
  - Documents stored per-project under `documents_{projectId}` keys
  - Protocols stored under `protocol_library` key
  - Branding settings stored under `branding_settings` key

### Frontend Architecture
- **Framework**: React 18 loaded via CDN (no build step)
- **Transpilation**: Babel standalone for JSX in browser
- **Styling**: Tailwind CSS via CDN
- **Font**: Inter (via Google Fonts)
- **Structure**: Single-page application with components in `public/app.js`
- **Client Portal**: Separate `public/client.html` for unauthenticated embeddable views

### URL Structure
- **Primary App Path**: `/app` (e.g., `https://yourdomain.com/app`)
- **Client Portal**: `/app/{client-slug}` (e.g., `/app/acme-medical`)
- **Internal View**: `/app/{client-slug}-internal`
- **Legacy Support**: `/thrive365labslaunch/*` paths redirect to `/app/*`

### Authentication Model
- Admin user auto-created on startup (configurable via environment variables)
- Default admin: admin@onboardhealth.com
- User signup available for team members
- Role-based access: admin vs regular user
- Client portal uses project-specific embed links (no login required)

### White-Label Branding System
- **Database-Stored Configuration**: Branding settings persist in database
- **Admin Configurable**: Product name, tagline, colors, footer text, support email
- **API Endpoints**:
  - `GET /api/settings/branding` - Get current branding (public)
  - `PUT /api/settings/branding` - Update branding (admin only)
- **Default Colors**: Primary #0891B2 (cyan), Accent #164E63 (dark teal)

## Key Features

### Project Management
- Multi-project dashboard with status tracking (In Progress, Paused, Completed)
- Template-based project creation
- Cloning projects for quick duplication
- HubSpot CRM integration for deal sync
- Google Drive integration for document storage

### Knowledge Hub
- Per-project document repository
- Categories: General, Protocols, SOPs, Forms, Training, Client Resources, Compliance
- Client visibility toggle for each document
- Links to Google Drive, external URLs, or other resources
- **API Endpoints**:
  - `GET /api/projects/:id/documents` - List documents
  - `POST /api/projects/:id/documents` - Add document
  - `PUT /api/projects/:id/documents/:docId` - Update document
  - `DELETE /api/projects/:id/documents/:docId` - Delete document
  - `GET /api/client/:slug/documents` - Client-visible documents only

### Protocol Library
- Reusable protocol playbooks across projects
- Categories for organization
- Steps with owners and linked documents
- Attach protocols to projects
- **API Endpoints**:
  - `GET /api/protocols` - List all protocols
  - `POST /api/protocols` - Create protocol (admin)
  - `PUT /api/protocols/:id` - Update protocol (admin)
  - `DELETE /api/protocols/:id` - Delete protocol (admin)
  - `GET /api/projects/:id/protocols` - List project protocols
  - `POST /api/projects/:id/protocols` - Attach protocol to project

### Task Management
- Phase-based organization (0-4 phases)
- Subtasks with independent owners and status
- Bulk operations for efficiency
- Notes and comments
- CSV import/export
- Client visibility toggles

### Standard Phases
- **Phase 0**: Agreement & Kickoff (Contract Signature)
- **Phase 1**: Pre-Implementation (Kickoff, Data & Systems Prep)
- **Phase 2**: Implementation (Core Setups, Testing & Validation, Pilot)
- **Phase 3**: Go-Live (Training/Validation, Go-Live)
- **Phase 4**: Optimization (KPIs, Monitoring & Support)

### Client Portal
- Unauthenticated access via project-specific URLs
- List, Timeline, and Calendar views
- Shows only client-visible tasks
- Displays owner names (resolved from emails)
- Access to client-visible documents

## Templates

### Available Templates
1. **Biolis AU480 CLIA Lab Setup** (`template-biolis-au480-clia.json`) - 102 tasks for lab installations
2. **Healthcare Onboarding** (`template-healthcare-onboarding.json`) - 27 tasks for general healthcare practice onboarding

### Industry Presets (White-Label)
- DPC Practice
- Primary Care
- Medical Spa
- Diagnostics Lab
- Healthcare Clinic

## External Dependencies

### Third-Party Services
- **HubSpot**: CRM sync for deals, tasks, and notes
- **Google Drive**: Document storage and soft-pilot checklist uploads
- **Replit Database**: Primary data persistence

### NPM Packages
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `uuid` - Unique ID generation
- `@replit/database` - Replit's key-value database
- `body-parser` - Request body parsing
- `googleapis` - Google Drive API
- `@hubspot/api-client` - HubSpot API

### Environment Variables
- `PORT` - Server port (defaults to 5000)
- `JWT_SECRET` - Token signing secret
- `DEFAULT_ADMIN_EMAIL` - Initial admin email
- `DEFAULT_ADMIN_PASSWORD` - Initial admin password
- `DEFAULT_ADMIN_NAME` - Initial admin name

## API Overview

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project (admin)
- `POST /api/projects/:id/clone` - Clone project

### Tasks
- `GET /api/projects/:id/tasks` - List tasks
- `POST /api/projects/:id/tasks` - Create task
- `PUT /api/projects/:id/tasks/:taskId` - Update task
- `DELETE /api/projects/:id/tasks/:taskId` - Delete task

### Settings
- `GET /api/settings/branding` - Get branding
- `PUT /api/settings/branding` - Update branding (admin)
- `GET /api/settings/client-portal-domain` - Get portal domain
- `PUT /api/settings/client-portal-domain` - Set portal domain (admin)

## Recent Changes (January 2026)

### White-Label Transformation
- Rebranded from "Thrive 365 Labs" to "OnboardHealth"
- Updated primary color scheme from blue (#045E9F) to cyan (#0891B2)
- Changed font from Open Sans to Inter
- Generalized terminology from lab-specific to universal healthcare onboarding
- Updated route structure from `/thrive365labslaunch` to `/app`

### New Features
- **Knowledge Hub**: Centralized document repository per project
- **Protocol Library**: Reusable protocol playbooks
- **Branding Settings**: Admin-configurable white-label settings
- **Healthcare Templates**: Generic templates for various practice types

### Technical Improvements
- Configurable default admin credentials via environment variables
- Legacy URL redirects for backwards compatibility
- Cleaner URL structure for better SEO
