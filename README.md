# Dardish — Members Only

A server-rendered members-only message board built with Node.js, Express, EJS, and PostgreSQL as part of The Odin Project curriculum. The focus of this project is authentication, sessions, and access control.

---

## 📌 Features

- User registration with input validation and password confirmation
- Secure password hashing with bcryptjs
- User authentication with Passport.js (Local Strategy)
- Persistent sessions stored in PostgreSQL with connect-pg-simple
- Create and delete messages
- Tiered access control:
  - **Guests** — can view messages but not author details
  - **Members** — can view author details after entering a membership secret
  - **Admins** — can delete any message
- Authors can always delete their own messages

---

## 🛠️ Built With

- Node.js
- Express
- EJS
- PostgreSQL
- Passport.js
- bcryptjs
- express-validator
- express-session
- connect-pg-simple
- moment.js
- Docker (local development)

---

## 📂 Project Structure

```
.
├── app.js
├── package.json
├── docker-compose.yml
├── config/
│   └── passport.js
├── controllers/
│   └── appController.js
├── db/
│   ├── query.js
│   └── setup/
│       ├── connections.js
│       └── recreateTables.js
├── lib/
│   └── passwordUtils.js
├── middleware/
│   ├── authMiddleware.js
│   └── validation.js
├── routes/
│   └── appRouter.js
└── views/
    ├── index.ejs
    ├── login.ejs
    ├── signup.ejs
    ├── messageForm.ejs
    └── partials/
        ├── navBar.ejs
        └── validation-errors.ejs
```

---

## ▶️ Running Locally

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
DB_CONNECTION_STRING=postgresql://postgres:password@localhost:5432/dardish_db
SECRET=your_session_secret
MEMBERSHIP_SECRET=your_membership_secret
PORT=3000
```

4. Start the database:
```bash
npm run db:docker:start
```

5. Set up the database tables:
```bash
node db/setup/recreateTables.js
```

6. Start the server:
```bash
node app.js
```

7. Visit: **http://localhost:3000**

---

## 🔐 Access Levels

| Feature | Guest | Member | Admin |
|---|---|---|---|
| View messages | ✅ | ✅ | ✅ |
| View author details | ❌ | ✅ | ✅ |
| Create messages | ❌ | ✅ | ✅ |
| Delete own messages | ❌ | ✅ | ✅ |
| Delete any message | ❌ | ❌ | ✅ |

---

## 📚 What This Project Covers

- User authentication with Passport.js Local Strategy
- Secure password hashing and comparison with bcryptjs
- Session management with express-session
- Persistent session storage in PostgreSQL
- Route protection with custom auth middleware
- Input validation with express-validator
- Tiered access control based on user roles
- Server-side rendering with EJS
- PostgreSQL database design with relational tables
