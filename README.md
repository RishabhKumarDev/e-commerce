# MERN E-Commerce Platform (Backend-Focused)

A full-stack MERN e-commerce platform with a strong emphasis on **backend architecture, API design, and role-based access control**.  
The frontend acts primarily as a client to demonstrate real-world backend workflows such as authentication, authorization, payments, image uploads, and data consistency.

This project started from a guided tutorial baseline and is currently being **incrementally refactored to production-level patterns**, mirroring how real-world teams improve existing codebases instead of rewriting from scratch.

---

## Why This Project Exists

The goal of this project is **not UI polish**, but to practice and demonstrate:
- scalable backend architecture
- real-world role separation (Admin / Seller / User)
- secure authentication & authorization
- optimized data fetching and pagination
- incremental refactoring strategies used in industry

Rather than building a greenfield app, the project is intentionally evolved feature-by-feature to reflect how engineers work with **existing systems**.

---

## Core Architecture & Design Decisions

- **Backend-first design** with RESTful APIs
- **Role-Based Access Control (RBAC)** enforced at API level
- **Ownership checks** for seller-scoped resources
- **Admin override** capabilities where appropriate
- **Consistent API response structure**
- **Global error handling middleware**
- **Incremental refactor strategy** (one feature end-to-end at a time)
- **Frontend kept intentionally simple** to act as a consumer of backend logic

---

## User Roles & Permissions

### Admin
- Platform-level control
- Manage users and sellers
- Moderate products and banners
- Full access override for operational control

### Seller
- Manage own products and inventory
- View and process own orders
- No access to other sellers’ data

### User
- Browse products
- Search, filter, and paginate listings
- Manage cart and place orders
- Complete payments

---

## Backend Features (Current & In Progress)

- JWT-based authentication
- Cookie-based session handling
- Password hashing with bcrypt
- Role-aware route protection
- Zod-based request validation
- Centralized error handling
- Pagination, filtering, and search (backend-optimized)
- Product, cart, order, and banner management
- Cloudinary image upload lifecycle
  - Image stored in Cloudinary
  - URL + metadata persisted in database
- Payment integration
  - PayPal (current)
  - Razorpay (planned)
- OAuth integration (planned)

---

## Frontend Architecture

- React with Redux Toolkit
- RTK Query (being introduced incrementally)
- Redux used for UI / client state only
- Custom hooks to reduce component complexity
- Minimal UI focused on functionality, not styling
- Role-aware routing and guarded views

---

## Incremental Refactor Strategy

The application is being refactored **feature-by-feature**, not file-by-file.

Each feature is:
1. Fully migrated from async thunks to RTK Query
2. Cleaned at both API and UI level
3. Validated for role correctness
4. Committed independently

This avoids mixed patterns and reflects real production refactors.

---

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB & Mongoose
- JWT
- bcrypt
- Zod
- Cloudinary
- Multer
- PayPal SDK
- Razorpay (planned)
- OAuth (planned)

### Frontend
- React
- Redux Toolkit
- RTK Query
- React Router
- Tailwind CSS

---

## Project Status

**Active Development**

The project is currently undergoing incremental refactoring to:
- adopt RTK Query
- reduce component-level logic
- improve API consistency
- strengthen backend validation and permissions

---

## Notes

This project prioritizes **engineering correctness and scalability** over UI polish.  
Design simplicity is intentional to keep the focus on backend workflows and system design.

