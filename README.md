# Secure Email Web App

## Information

- **Name**: Nadeem Zawaideh  
- **Date Created**: 2025-03-30

## Application Description

A secure email interface that allows users to log in, compose, send, and view emails. The application is built using **Node.js** and **MySQL**, with client-side interactions handled via `fetch()` and server communication through API-like routes.

## Features Implemented

- **User Authentication**: Secure login using bcrypt and session cookies.
- **Inbox View**: Asynchronously fetches and displays incoming emails.
- **Sent Emails View**: Shows emails sent by the logged-in user.
- **Compose Email**: Form for sending emails to other users.
- **Asynchronous Fetch**: All server communication is done via `fetch()` API.
- **Session & Cookies**: Maintains login state and shows last login time via cookies.
- **Modern UI**: Styled using clean, responsive CSS for better usability.

## APIs Used

- `POST /api/login` – Authenticates user
- `POST /api/logout` – Ends session
- `GET /api/inbox` – Retrieves received emails
- `GET /api/sent` – Retrieves sent emails
- `POST /api/send` – Sends a new email

## Folder Structure

```plaintext
A4/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── login.js
│   │   ├── inbox.js
│   │   ├── compose.js
│   │   └── sent.js
│   ├── index.html
│   ├── inbox.html
│   ├── compose.html
│   └── sent.html
├── server/
│   ├── db/
│   │   └── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── inbox.js
│   │   ├── sent.js
│   │   └── send.js
│   └── server.js
├── .gitignore
├── db_dump.sql
├── ERD.pdf
├── hash-passwords.js
├── package-lock.json
├── package.json
└── README.md
