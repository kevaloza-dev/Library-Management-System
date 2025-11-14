# Library Management System

This is a full-stack Library Management System built with a React/Vite frontend, a NestJS backend, and a PostgreSQL database, all orchestrated with Docker Compose.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started with Docker Compose](#getting-started-with-docker-compose)
  - [1. Configure PostgreSQL Credentials](#1-configure-postgresql-credentials)
  - [2. Configure Backend Environment Variables](#2-configure-backend-environment-variables)
  - [3. Configure Frontend Environment Variables](#3-configure-frontend-environment-variables)
  - [4. Run the Application](#4-run-the-application)
  - [5. Access the Application](#5-access-the-application)
  - [6. Demo Credentials](#6-demo-credentials)
- [Troubleshooting Common Issues](#troubleshooting-common-issues)
  - [Network Error / Frontend cannot connect to Backend](#network-error--frontend-cannot-connect-to-backend)
  - [Prisma Migration Issues](#prisma-migration-issues)
  - [Invalid ELF Header / bcrypt error](#invalid-elf-header--bcrypt-error)
  - [Tailwind CSS not rendering](#tailwind-css-not-rendering)
- [Local Development (Without Docker)](#local-development-without-docker)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

---

## Project Structure

```
C:\Users\dhrumiloza\Desktop\Keval_Docs\InternshiProjectLMS\LibraryManagementSystem\
├───.gitignore
├───API_DOCUMENTATION.md
├───components.json
├───docker-compose.yml
├───next.config.mjs
├───package.json
├───pnpm-lock.yaml
├───postcss.config.mjs
├───README.md
├───SYSTEM_SETUP.md
├───tsconfig.json
├───.git\...
├───app\
│   ├───globals.css
│   ├───layout.tsx
│   └───page.tsx
├───backend\
│   ├───.dockerignore
│   ├───Dockerfile
│   ├───package-lock.json
│   ├───package.json
│   ├───tsconfig.json
│   ├───node_modules\...
│   ├───prisma\
│   │   ├───package.json
│   │   ├───schema.prisma
│   │   └───seed.ts
│   └───src\
│       ├───app.module.ts
│       ├───main.ts
│       ├───auth\
│       │   ├───auth.controller.ts
│       │   ├───auth.module.ts
│       │   ├───auth.service.ts
│       │   ├───dto\
│       │   │   └───login.dto.ts
│       │   ├───guards\
│       │   │   └───jwt.guard.ts
│       │   └───strategies\
│       │       └───jwt.strategy.ts
│       ├───authors\
│       │   ├───authors.controller.ts
│       │   ├───authors.module.ts
│       │   ├───authors.service.ts
│       │   └───dto\
│       │       ├───create-author.dto.ts
│       │       └───update-author.dto.ts
│       ├───books\
│       │   ├───books.controller.ts
│       │   ├───books.module.ts
│       │   ├───books.service.ts
│       │   └───dto\
│       │       ├───create-book.dto.ts
│       │       └───update-book.dto.ts
│       ├───borrow-records\
│       │   ├───borrow-records.controller.ts
│       │   ├───borrow-records.module.ts
│       │   ├───borrow-records.service.ts
│       │   └───dto\
│       │       ├───create-borrow-record.dto.ts
│       │       └───update-borrow-record.dto.ts
│       ├───prisma\
│       │   ├───prisma.module.ts
│       │   └───prisma.service.ts
│       └───users\
│           ├───users.controller.ts
│           ├───users.module.ts
│           ├───users.service.ts
│           └───dto\
│               ├───create-user.dto.ts
│               └───update-user.dto.ts
├───components\
│   ├───theme-provider.tsx
│   └───ui\
│       ├───accordion.tsx
│       ├───alert-dialog.tsx
│       ├───alert.tsx
│       ├───aspect-ratio.tsx
│       ├───avatar.tsx
│       ├───badge.tsx
│       ├───breadcrumb.tsx
│       ├───button-group.tsx
│       ├───button.tsx
│       ├───calendar.tsx
│       ├───card.tsx
│       ├───carousel.tsx
│       ├───chart.tsx
│       ├───checkbox.tsx
│       ├───collapsible.tsx
│       ├───command.tsx
│       ├───context-menu.tsx
│       ├───dialog.tsx
│       ├───drawer.tsx
│       ├───dropdown-menu.tsx
│       ├───empty.tsx
│       ├───field.tsx
│       ├───form.tsx
│       ├───hover-card.tsx
│       ├───input-group.tsx
│       ├───input-otp.tsx
│       ├───input.tsx
│       ├───item.tsx
│       ├───kbd.tsx
│       ├───label.tsx
│       ├───menubar.tsx
│       ├───navigation-menu.tsx
│       ├───pagination.tsx
│       ├───popover.tsx
│       ├───progress.tsx
│       ├───radio-group.tsx
│       ├───resizable.tsx
│       ├───scroll-area.tsx
│       ├───select.tsx
│       ├───separator.tsx
│       ├───sheet.tsx
│       ├───sidebar.tsx
│       ├───skeleton.tsx
│       ├───slider.tsx
│       ├───sonner.tsx
│       ├───spinner.tsx
│       ├───switch.tsx
│       ├───table.tsx
│       ├───tabs.tsx
│       ├───textarea.tsx
│       ├───toast.tsx
│       ├───toaster.tsx
│       ├───toggle-group.tsx
│       ├───toggle.tsx
│       ├───tooltip.tsx
│       ├───use-mobile.tsx
│       └───use-toast.ts
├───frontend\
│   ├───Dockerfile
│   ├───FRONTEND_README.md
│   ├───index.html
│   ├───package-lock.json
│   ├───package.json
│   ├───postcss.config.js
│   ├───tailwind.config.js
│   ├───tsconfig.app.json
│   ├───tsconfig.json
│   ├───vite.config.ts
│   ├───node_modules\...
│   └───src\
│       ├───index.css
│       ├───main.tsx
│       ├───components\
│       │   ├───AuthorForm.tsx
│       │   ├───AuthorList.tsx
│       │   ├───BookCard.tsx
│       │   ├───BookForm.tsx
│       │   ├───BookList.tsx
│       │   ├───BorrowHistory.tsx
│       │   ├───Layout.tsx
│       │   ├───ProtectedRoute.tsx
│       │   └───Sidebar.tsx
│       ├───context\
│       │   └───AuthContext.tsx
│       ├───hooks\
│       │   └───useAuth.ts
│       ├───pages\
│       │   ├───App.tsx
│       │   ├───AuthorsPage.tsx
│       │   ├───BooksPage.tsx
│       │   ├───BorrowedPage.tsx
│       │   ├───DashboardPage.tsx
│       │   ├───LoginPage.tsx
│       │   ├───RegisterPage.tsx
│       │   └───UsersPage.tsx
│       ├───services\
│       │   └───api.ts
│       └───types\
│           └───index.ts
├───hooks\
│   ├───use-mobile.ts
│   └───use-toast.ts
├───lib\
│   └───utils.ts
├───public\
│   ├───apple-icon.png
│   ├───icon-dark-32x32.png
│   ├───icon-light-32x32.png
│   ├───icon.svg
│   ├───placeholder-logo.png
│   ├───placeholder-logo.svg
│   ├───placeholder-user.jpg
│   ├───placeholder.jpg
│   └───placeholder.svg
└───styles\
    └───globals.css
```

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Docker Desktop:** Includes Docker Engine and Docker Compose.
-   **Node.js & npm:** For local development without Docker.

---

## Getting Started with Docker Compose

Follow these steps to set up and run the application using Docker Compose.

### 1. Configure PostgreSQL Credentials

The `docker-compose.yml` file defines the PostgreSQL database service. You can customize the database credentials by modifying the `environment` section of the `db` service.

Open `docker-compose.yml` and locate the `db` service:

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres    # <--- Change this
      POSTGRES_PASSWORD: password # <--- Change this
      POSTGRES_DB: librarydb    # ...
```

### 2. Configure Backend Environment Variables

The backend service requires several environment variables. Create a file named `.env` inside the `backend/` directory (i.e., `backend/.env`).

Add the following content to `backend/.env`, customizing `JWT_SECRET` and `JWT_EXPIRES_IN` as desired:

```dotenv
DATABASE_URL="postgresql://postgres:password@db:5432/librarydb"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="1h"
```

### 3. Configure Frontend Environment Variables

The frontend service also requires environment variables. Create a file named `.env` inside the `frontend/` directory (i.e., `frontend/.env`).

Add the following content to `frontend/.env`:

```dotenv
VITE_API_BASE_URL="http://localhost:3000"
```

### 4. Run the Application

Navigate to the root directory of the project and run the following command to build and start all services:

```bash
docker compose up --build
```

This command will:
- Build the Docker images for the backend and frontend.
- Start the PostgreSQL database, backend, and frontend services.
- Run Prisma migrations and seed the database (as defined in `docker-compose.yml`).

### 5. Access the Application

Once all services are up and running, you can access the application:

-   **Frontend:** Open your web browser and navigate to `http://localhost:5173`
-   **Backend API:** The backend API will be running on `http://localhost:3000`

### 6. Demo Credentials

(Add demo credentials here if applicable, e.g., for a default admin user)

---

## Troubleshooting Common Issues

### Network Error / Frontend cannot connect to Backend

If your frontend cannot connect to the backend, ensure that the `VITE_API_BASE_URL` in `frontend/.env` is correctly set to `http://localhost:3000` when running locally, or `http://backend:3000` when running within Docker Compose.

### Prisma Migration Issues

If the backend container gets stuck or fails during startup with messages related to Prisma migrations (e.g., asking for migration names, or "table does not exist"), it might be due to:

-   **Interactive `migrate dev`:** The `docker-compose.yml` uses `npx prisma migrate dev` which can be interactive. If you encounter this, you might need to generate the initial migration locally first.
-   **Missing Migration Files:** Ensure that migration files exist in `backend/prisma/migrations`. If not, you'll need to generate them.

To generate migrations locally (outside Docker):

1.  **Ensure Prerequisites:** You have Node.js and npm installed, and a local PostgreSQL database is running and accessible.
2.  **Modify `backend/.env`:** Temporarily modify `backend/.env` to point `DATABASE_URL` to your local PostgreSQL (e.g., `postgresql://USER:PASSWORD@localhost:5432/librarydb?schema=public`).
3.  **Navigate to Backend:**
    ```bash
    cd backend
    ```
4.  **Run Migration Command:**
    ```bash
    npx prisma migrate dev --name init
    ```
5.  **Revert `backend/.env`:** Once migrations are generated, you can revert `backend/.env` if you plan to use the Dockerized database.

### Invalid ELF Header / bcrypt error

This error typically occurs when native Node.js modules (like `bcrypt`) are compiled for one environment (e.g., Windows) and then run in another (e.g., Linux Docker container).

This project includes a `.dockerignore` file in the `backend` directory that excludes `node_modules` from being copied. This ensures that `npm install` runs inside the Docker container, compiling native modules for the correct Linux environment. If you encounter this, ensure your `.dockerignore` is correctly configured and rebuild your Docker images.

### Tailwind CSS not rendering

If the frontend appears unstyled (white background, black text), it indicates that Tailwind CSS is not being processed correctly.

-   Ensure `frontend/postcss.config.js` exists with the correct configuration:
    ```javascript
    export default {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
    ```
-   Ensure `frontend/tailwind.config.js` is correctly configured to scan your source files.
-   Ensure `frontend/src/index.css` contains the `@tailwind` directives.
-   Rebuild your frontend Docker image after making any changes to these configuration files.

---

## Local Development (Without Docker)

If you prefer to run the frontend and backend directly on your machine:

### Backend Setup

1.  **Prerequisites:** Node.js, npm, and a local PostgreSQL database server running.
2.  **Navigate to Backend Directory:**
    ```bash
    cd backend
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Configure `.env`:** Create `backend/.env` with `DATABASE_URL` pointing to your local PostgreSQL.
    ```dotenv
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/librarydb?schema=public"
    JWT_SECRET="your_jwt_secret_key"
    JWT_EXPIRES_IN="1h"
    ```
    *(Replace `USER` and `PASSWORD` with your local PostgreSQL credentials)*
5.  **Run Migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```
6.  **Seed Database:**
    ```bash
    npx prisma db seed
    ```
7.  **Start Backend:**
    ```bash
    npm run start:dev
    ```
    The backend will run on `http://localhost:3000`.

### Frontend Setup

1.  **Prerequisites:** Node.js, npm.
2.  **Navigate to Frontend Directory:**
    ```bash
    cd frontend
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Configure `.env`:** Create `frontend/.env` with the API base URL.
    ```dotenv
    VITE_API_BASE_URL="http://localhost:3000"
    ```
5.  **Start Frontend:**
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:5173`
