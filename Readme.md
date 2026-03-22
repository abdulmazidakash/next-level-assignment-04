# 🍱 FoodHub - Full Stack Meal Ordering Platform

FoodHub is a full-stack web application where users can discover meals, place orders, and manage food services based on their roles: **Customer, Provider, and Admin**.

---

## 🚀 Live Links

* **Frontend:** https://assignment-frontend-seven-ecru.vercel.app
* **Backend:** https://assignment-4-server-pi.vercel.app

---

## 📂 GitHub Repositories

* **Frontend Repo:** https://github.com/abdulmazidakash/next-level-assignment-04
* **Backend Repo:** https://github.com/abdulmazidakash/next-level-assignment-04

---

## 👤 Credentials

```
Email: admin@foodhub.com
Password: 123456
```

```
Email: provider@foodhub.com
Password: 123456
```
```
Email: customer@foodhub.com
Password: 123456
```

---

## 📖 Project Overview

FoodHub allows:

* Customers to browse meals and place orders
* Providers to manage menus and orders
* Admins to control users and platform activities

---

## 🎯 Features

### 🌍 Public Features

* Browse all meals
* View providers and their menus
* Filter meals by category & cuisine
* Responsive UI

---

### 👤 Customer Features

* Register & login
* Browse meals
* Add to cart
* Place order (Cash on Delivery)
* Track order status
* Leave reviews
* Manage profile

---

### 🍳 Provider Features

* Register as provider
* Create and manage meals
* View customer orders
* Update order status

---

### 🛠️ Admin Features

* Manage users (activate/suspend)
* View all orders
* Manage categories
* Monitor system

---

## 🧑‍💻 Tech Stack

### Frontend

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* ShadCN UI
* React Hook Form + Zod
* Framer Motion

### Backend

* Node.js + Express
* PostgreSQL
* Prisma ORM
* JWT Authentication

---

## 📦 Installation & Setup

### 🔧 Frontend Setup

```bash
git clone https://github.com/your-username/foodhub-frontend
cd foodhub-frontend
npm install
npm run dev
```

### 🔧 Backend Setup

```bash
git clone https://github.com/your-username/foodhub-backend
cd foodhub-backend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Frontend (.env)

```
NEXT_PUBLIC_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

### Backend (.env)

```
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
```

---

## 🗂️ Folder Structure

### Frontend

```
src/
 ├── app/
 ├── components/
 ├── services/
 ├── lib/
```

### Backend

```
src/
 ├── modules/
 ├── middleware/
 ├── utils/
 ├── prisma/
```

---

## 🗃️ Database Schema

Main tables:

* Users
* ProviderProfiles
* Categories
* Meals
* Orders
* Reviews

---

## 🔗 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

### Meals

* GET `/api/meals`
* GET `/api/meals/:id`

### Orders

* POST `/api/orders`
* GET `/api/orders`

### Admin

* GET `/api/admin/users`
* PATCH `/api/admin/users/:id`

---

## 📊 Order Flow

```
PLACED → PREPARING → READY → DELIVERED
             ↘
           CANCELLED
```

---

## ⚠️ Important Notes

* No payment gateway (Cash on Delivery only)
* Role-based authentication implemented
* Error handling included
* Responsive design

---

## 🎥 Demo Video

👉 https://drive.google.com/file/d/1bd8397KooYuNWYd5GMBwahrBr-5cclU9/view

---

## 📌 Assignment Requirements Completed

✅ Homepage (4 sections)
✅ Responsive UI/UX
✅ Authentication system
✅ CRUD operations
✅ Role-based dashboard
✅ Error handling
✅ Admin panel

---

## 💡 Future Improvements

* Online payment integration
* Real-time notifications
* Advanced filtering system
* Delivery tracking with map

---

## 🧑‍🎓 Author

**Abdul Mazid Akash**

---

## ⭐ Final Note

This project was built as part of the Programming Hero Assignment.
Feel free to explore, fork, and improve 🚀
