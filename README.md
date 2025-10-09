# MERNcommerce - Full-Stack E-Commerce Platform

MERNcommerce is a modern, feature-rich, and scalable e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and powered by Next.js for a high-performance frontend. It features a completely decoupled architecture with a robust Node.js REST API backend and a dynamic, server-rendered React frontend.

![MERNcommerce Screenshot](./screenshot.png)

## ✨ Key Features

- **Full Product Catalog:** Manage products with complex variations (size, color), multiple images per variation, and detailed specifications.
- **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens).
- **Shopping Cart & Wishlist:** Persistent cart and wishlist functionality that saves user selections even after closing the browser.
- **Complete Order Workflow:** Seamless checkout process and order management system.
- **Payment Integration:** Ready to use with **Stripe** and **PayPal** for real-world payment processing.
- **Customer Reviews:** Users can rate and review products.
- **Coupon & Discount System:** Easily create and manage promotional codes.
- **Scalable File Uploads:** Product images are uploaded to AWS S3, ensuring scalability and performance.
- **SEO Optimized:** The Next.js frontend is server-side rendered (SSR) for excellent search engine visibility.
- **Responsive Design:** A clean, modern UI styled with Tailwind CSS that works on all devices.

---

## 🛠️ Tech Stack & Architecture

### Backend

- **Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **File Storage:** AWS S3 for image uploads
- **API Style:** RESTful

### Frontend

- **Framework:** React, Next.js
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit with `redux-persist` for a persistent global state.
- **Data Fetching:** Axios
- **Payment:** Stripe.js, PayPal React SDK

### Architecture

The project uses a **decoupled (or headless) architecture**. The backend is a standalone REST API that handles all business logic and data. The frontend is an independent Next.js application that consumes data from the backend API. This separation allows for independent development, scaling, and the ability to connect other clients (like a mobile app) in the future.

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine for development and testing.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local instance or a cloud service like MongoDB Atlas)
- Git

### 1. Backend Setup

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd MERN\ Commerce

# 2. Navigate to the backend directory
cd backend

# 3. Install dependencies
npm install

# 4. Create a .env file in the `backend` directory
#    (copy the contents from .env.example and fill in your values)
touch .env

# 5. Start the backend server
npm start
```
The backend server will be running on `http://localhost:4000` (or your configured port).

### 2. Frontend Setup

```bash
# 1. Navigate to the frontend directory from the root
cd frontend

# 2. Install dependencies
npm install

# 3. Create a .env.local file in the `frontend` directory
#    (copy the contents from .env.local.example and fill in your values)
touch .env.local

# 4. Start the frontend development server
npm run dev
```
The frontend application will be available at `http://localhost:3000`.

---

## ⚙️ Environment Variables

To run this project, you will need to create `.env` files in both the `backend` and `frontend` directories.

#### Backend (`backend/.env`)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000

# AWS S3 Configuration for file uploads
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
AWS_S3_REGION=your_s3_bucket_region
```

#### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## NPM Packages Used

### Backend Dependencies

| Package                 | Description                                                                      |
| ----------------------- | -------------------------------------------------------------------------------- |
| `@aws-sdk/client-s3`    | AWS SDK for JavaScript S3 Client.                                                |
| `@aws-sdk/lib-storage`  | Provides upload and download functionality for Amazon S3.                        |
| `bcryptjs`              | A library to help you hash passwords.                                            |
| `body-parser`           | Node.js body parsing middleware.                                                 |
| `cors`                  | Node.js CORS middleware.                                                         |
| `dotenv`                | Loads environment variables from a `.env` file into `process.env`.               |
| `express`               | Fast, unopinionated, minimalist web framework for Node.js.                       |
| `jsonwebtoken`          | An implementation of JSON Web Tokens.                                            |
| `mongoose`              | MongoDB object modeling tool designed to work in an asynchronous environment.    |
| `multer`                | Node.js middleware for handling `multipart/form-data`.                           |
| `multer-s3`             | A streaming multer storage engine for AWS S3.                                    |
| `nodemon`               | A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. |
| `sharp`                 | High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images. |
| `uuidv4`                | Creates a version 4 UUID.                                                        |

### Frontend Dependencies

| Package                          | Description                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `@fortawesome/fontawesome-svg-core` | The core library for Font Awesome icons.                                                                |
| `@fortawesome/free-regular-svg-icons` | The regular style icons for Font Awesome.                                                               |
| `@fortawesome/free-solid-svg-icons` | The solid style icons for Font Awesome.                                                                 |
| `@fortawesome/react-fontawesome` | Font Awesome 5 React component.                                                                         |
| `@paypal/react-paypal-js`        | React components for the PayPal JS SDK.                                                                 |
| `@radix-ui/react-avatar`         | A React component for displaying an avatar.                                                             |
| `@reduxjs/toolkit`               | The official, opinionated, batteries-included toolset for efficient Redux development.                  |
| `@stripe/stripe-js`              | Stripe.js & Elements for React.                                                                         |
| `autoprefixer`                   | A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.                                     |
| `axios`                          | Promise based HTTP client for the browser and node.js.                                                  |
| `class-variance-authority`       | Create flexible and type-safe UI components with a powerful variant system.                             |
| `clsx`                           | A tiny (228B) utility for constructing `className` strings conditionally.                               |
| `date-fns`                       | Modern JavaScript date utility library.                                                                 |
| `dotenv`                         | Loads environment variables from a `.env` file into `process.env`.                                      |
| `i18next`                        | An internationalization-framework written in and for JavaScript.                                        |
| `js-cookie`                      | A simple, lightweight JavaScript API for handling browser cookies.                                      |
| `next`                           | The React Framework for Production.                                                                     |
| `next-i18next`                   | The easiest way to translate your Next.js apps.                                                         |
| `next-images`                    | Import images in your Next.js project.                                                                  |
| `next-themes`                    | An abstraction for themes in your Next.js app.                                                          |
| `postcss`                        | A tool for transforming CSS with JavaScript.                                                            |
| `react`                          | A JavaScript library for building user interfaces.                                                      |
| `react-dom`                      | Serves as the entry point to the DOM and server renderers for React.                                    |
| `react-hook-form`                | Performant, flexible and extensible forms with easy-to-use validation.                                  |
| `react-hot-toast`                | Smoking hot notifications for React.                                                                    |
| `react-i18next`                  | Internationalization for React done right.                                                              |
| `react-icons`                    | SVG React icons of popular icon packs.                                                                  |
| `react-redux`                    | Official React bindings for Redux.                                                                      |
| `react-toastify`                 | React notification made easy.                                                                           |
| `redux-persist`                  | Persist and rehydrate a Redux store.                                                                    |
| `remixicon`                      | A set of open-source neutral-style system symbols for designers and developers.                         |
| `tailwind-merge`                 | A utility function to merge Tailwind CSS classes in JS without style conflicts.                         |

### Frontend Dev Dependencies

| Package               | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `@tailwindcss/postcss`| A PostCSS plugin for Tailwind CSS.                                         |
| `daisyui`             | A Tailwind CSS component library.                                        |
| `tailwindcss`         | A utility-first CSS framework for rapidly building custom user interfaces. |

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.