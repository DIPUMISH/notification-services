# 📬 Notification Service

A full-stack Notification Service to send **Email**, **SMS**, and **In-App** notifications. It includes a frontend interface and backend APIs using **Express**, **MongoDB**, **Nodemailer**, and **Twilio**.

---

## 🚀 Features

- ✅ Register new users with name, email, and phone
- ✅ Send notifications (Email/SMS/In-App)
- ✅ View all users and their user IDs
- ✅ View notifications sent to a user
- ✅ Delete any registered user
- ✅ Success/error handling with user-friendly messages
- ✅ Fully styled frontend with page navigation

---

## 📂 Project Structure

notification-service/
│
├── models/ # Mongoose schemas
│ ├── Notification.js
│ └── User.js
│
├── public/ # Frontend files
│ ├── index.html # Main page (Send notifications)
│ ├── register.html # Register new users
│ ├── users.html # View/delete registered users
│ ├── styles.css
│ ├── script.js
│ ├── register.js
│ └── users.js
│
├── routes/
│ ├── notifications.js # Routes for notifications
│ └── users.js # Routes for user registration/deletion
│
├── .env # Secure credentials
├── .gitignore # Node and sensitive file exclusions
├── server.js # Entry point
├── app.js # Express app setup
├── package.json
└── README.md

yaml
Copy
Edit

---

## 🧪 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB & Mongoose
- **Email:** Nodemailer
- **SMS:** Twilio

---

## 🛠️ Installation

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/notification-service.git
cd notification-service

2. Install dependencies
npm install

3. Setup .env file
Create a .env file in the root directory:
PORT=3000

MONGO_URI=mongodb://localhost:27017/notificationService

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

TWILIO_SID=your_twilio_sid
TWILIO_AUTH=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number
Make sure to use an App Password if you're using Gmail with 2FA.

4. Start the Server
node server.js

🌐 Usage
Open your browser and navigate to:
http://localhost:3000

Pages:
Main Page (Send Notifications) → /index.html

Register Users → /register.html

View All Users → /users.html

📬 API Endpoints
POST /api/notifications
Send a notification (Email/SMS/In-app)


GET /api/users
Returns all registered users.

DELETE /api/users/:id
Deletes a user by ID.

🧾 License
This project is open source and free to use.

Thank-you 
Made by - Dipanshu Mishra
