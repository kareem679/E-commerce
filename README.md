# 🛒 E-Commerce Project

project **E-Commerce** build with **Laravel (Backend)** و **Next.js / React (Frontend)**.

---

## 🚀 

before start check if you have 

- PHP >= 8.1  
- Composer  
- Node.js + npm أو Yarn  
- MySQL  
- Git  

---

## ⚙️ تشغيل الـ Backend (Laravel)

1. Go to backend:
```bash
cd backend


2- composer install


3- change file .env with your DB information
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password


4- command
php artisan migrate --seed
php artisan serve


server will be on  http://127.0.0.1:8000

==========================================
## ⚙️ Frontend (Next.js

1- command
cd frontend
npm install
npm run dev

will be on http://localhost:3000



tips:
1- php artisan migrate --seed


Admin user will be 
name => admin123
Email => admin@gmail.com
Password => 12345678