# MERNcommerce - Full-Stack E-Commerce Platform

MERNcommerce is a modern, feature-rich, and scalable e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) and powered by Next.js for a high-performance frontend. It features a completely decoupled architecture with a robust Node.js REST API backend and a dynamic, server-rendered React frontend.

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
The backend server will be running on `http://localhost:5000` (or your configured port).

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
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
