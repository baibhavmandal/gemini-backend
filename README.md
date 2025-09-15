# Gemini Backend

A backend service powered by Node.js, PostgreSQL, Redis, and Google Gemini API.  
It provides a structured, maintainable foundation for building AI-powered applications, with support for authentication, chatroom operations, and future subscription features.

---

## 🚀 How to Set Up and Run the Project

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- A [Google Gemini API Key](https://ai.google.dev/)

---

### **1. Clone the Repository**

```bash
git clone <repository_url>
cd gemini-backend
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Variables**

Create a .env file in the root directory and add your configuration:

```bash
# Server and JWT
PORT=3000
JWT_SECRET=your_jwt_secret_key

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=gemini_ai_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Stripe (optional, for future implementation)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PLAN_ID=
```

⚠️ **Note on Production:**
On Render, environment variables are managed via the Render Dashboard.
This is .env file is for local development only.

## **4. Database Setup**

Ensure your PostgreSQL server is running.

Create a database (default: gemini_ai_db):

## **5. Start the Server**

```bash
Copy code
npm run start
```

## ⚙️ Architecture Overview

The project follows a clean, layered architecture:

- **`src/config/`** → Centralized configuration (DB, Redis, Gemini, etc.)
- **`src/routes/`** → API endpoint definitions using Express Router
- **`src/controllers/`** → Handles incoming requests, delegates logic to services
- **`src/services/`** → Core business logic (user management, chatrooms, subscriptions)
- **`src/models/`** → Database models & PostgreSQL interactions
- **`src/middlewares/`** → Authentication, validation, error handling
- **`src/utils/`** → General-purpose helper functions

## 🔑 Why Redis for OTP?

- **Performance** → Redis is an in-memory store, much faster for high-volume short-lived data like OTPs.
- **Automatic Expiry** → Using `EXPIRE`, OTPs auto-expire (e.g., 5 minutes), removing the need for manual cleanup.

This ensures secure, efficient OTP handling without burdening the database.

## 📝 Current Status & Next Steps

- ✅ Core backend setup with Node.js, PostgreSQL, Redis, and Gemini API
- ❌ Stripe subscription feature (pending — requires Stripe account with referral)
- ❌ Production deployment on Render (facing Redis client connection issues)

Once resolved, full API endpoint documentation will be shared.

## 📚 Learning Resources

These were some of the materials used while building the project:

- [How To Use PostgreSQL with Node.js on Ubuntu 20.04 (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-node-js-on-ubuntu-20-04)
- [Using Databases with WSL (Microsoft Docs)](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database)
- [Redis Node.js Client Documentation](https://redis.io/docs/latest/develop/clients/nodejs/)
