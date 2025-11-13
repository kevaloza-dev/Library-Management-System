# Library Management System

This is a full-stack Library Management System built with a React/Vite frontend, a NestJS backend, and a PostgreSQL database, all orchestrated with Docker Compose.

## Table of Contents

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

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Docker Desktop:** Includes Docker Engine and Docker Compose.

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
      POSTGRES_DB: librarydb
    # ...
```

### 2. Configure Backend Environment Variables

The backend service requires several environment variables. Create a file named `.env` inside the `backend/` directory (i.e., `backend/.env`).

Add the following content to `backend/.env`, customizing `JWT_SECRET` and `JWT_EXPIRES_IN` as desired:

```
DATABASE_URL="postgresql://postgres:password@db:5432/librarydb?schema=public"
JWT_SECRET="your_super_secret_jwt_key_here" # IMPORTANT: Change this to a strong, random key
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
PORT=3000
```

**Note:** The `DATABASE_URL` here uses `db` as the hostname, which is the name of the database service within the Docker network.

### 3. Configure Frontend Environment Variables

The frontend service needs to know where to find the backend API. Create a file named `.env` inside the `frontend/` directory (i.e., `frontend/.env`).

Add the following content to `frontend/.env`:

```
VITE_API_BASE_URL="http://backend:3000"
```

**Note:** `http://backend:3000` refers to the backend service by its name within the Docker network.

### 4. Run the Application

From the root directory of the project, execute the following command to build the Docker images and start all services in detached mode:

```bash
docker-compose up --build -d
```

This command will:
- Build the `backend` and `frontend` Docker images.
- Start the `db`, `backend`, and `frontend` services.
- Apply any pending Prisma database migrations.
- Seed the database with initial data.

### 5. Access the Application

Once all services are up and running, you can access the frontend application in your web browser:

[http://localhost:5173](http://localhost:5173)

### 6. Demo Credentials

You can log in with the following demo user:

-   **Email:** `admin@library.com`
-   **Password:** `password123`

## Troubleshooting Common Issues

### Network Error / Frontend cannot connect to Backend

If you encounter a "network error" on the login page, ensure that `VITE_API_BASE_URL` in your `frontend/.env` file is correctly set to `http://backend:3000`. This allows the frontend container to communicate with the backend service within the Docker network.

### Prisma Migration Issues

If the backend container gets stuck or fails during startup with messages related to Prisma migrations (e.g., asking for migration names, or "table does not exist"), it might be due to:

-   **Interactive `migrate dev`:** The `docker-compose.yml` uses `npx prisma migrate dev` which can be interactive. If you encounter this, you might need to generate the initial migration locally first.
-   **Missing Migration Files:** Ensure that migration files exist in `backend/prisma/migrations`. If not, you'll need to generate them.

To generate migrations locally (outside Docker):
1.  Ensure you have Node.js and npm installed.
2.  Ensure a local PostgreSQL database is running and accessible.
3.  Temporarily modify `backend/.env` to point `DATABASE_URL` to your local PostgreSQL (e.g., `postgresql://USER:PASSWORD@localhost:5432/librarydb?schema=public`).
4.  Navigate to the `backend` directory and run: `npx prisma migrate dev --name init`
5.  Once migrations are generated, you can revert `backend/.env` if you plan to use the Dockerized database.

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

## Local Development (Without Docker)

If you prefer to run the frontend and backend directly on your machine:

### Backend Setup

1.  **Prerequisites:** Node.js, npm, and a local PostgreSQL database server running.
2.  **Navigate:** `cd backend`
3.  **Install Dependencies:** `npm install`
4.  **Configure `.env`:** Create `backend/.env` with `DATABASE_URL` pointing to your local PostgreSQL (e.g., `postgresql://USER:PASSWORD@localhost:5432/librarydb?schema=public`).
5.  **Run Migrations:** `npx prisma migrate dev --name init`
6.  **Seed Database:** `npx prisma db seed`
7.  **Start Backend:** `npm run start:dev` (runs on `http://localhost:3000`)

### Frontend Setup

1.  **Prerequisites:** Node.js, npm.
2.  **Navigate:** `cd frontend`
3.  **Install Dependencies:** `npm install`
4.  **Configure `.env`:** Create `frontend/.env` with `VITE_API_BASE_URL="http://localhost:3000"`.
5.  **Start Frontend:** `npm run dev` (runs on `http://localhost:5173`)