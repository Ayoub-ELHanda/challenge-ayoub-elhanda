Project Structure:

frontend/
├── public/
│   └── index.html            # Main HTML file with root div
│   └── favicon.ico           # Favicon for the project
│
├── src/
│   ├── assets/               # Static assets (images, fonts)
│   │   └── logo.png
│   │
│   ├── components/           # Reusable Vue components
│   │   └── Navbar.vue
│   │   └── EbookCard.vue     # Component for displaying ebook details
│   │
│   ├── views/                # Page components for routing
│   │   └── HomeView.vue      # Home page view
│   │   └── RegisterView.vue # Registration page view
│   │   └── LoginView.vue     # Login page view
│   │   └── Dashboard.vue     # User dashboard where ebooks are listed
│   │   └── AddProduct.vue    # Form to add new ebook (product)
│   │
│   ├── router/               # Vue Router setup
│   │   └── index.ts
│
│   ├── store/                # Pinia state management
│   │   └── userStore.ts      # Store to manage user authentication and data
│
│   ├── services/             # API calls and Axios setup
│   │   └── api.ts            # Axios instance to handle HTTP requests
│
│   ├── composables/          # Custom Vue 3 hooks
│   │   └── useAuth.ts        # Composable for user authentication logic
│
│   ├── types/                # TypeScript interfaces
│   │   └── user.ts           # Type definitions for the user
│
│   ├── App.vue               # Root Vue component
│   └── main.ts               # Entry point of the Vue app (bootstrapping Vue)
│
├── tests/                    # Jest and Cypress tests
│   └── unit/                 # Unit tests
│   └── e2e/                  # End-to-end tests
│
├── package.json              # Frontend dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vue.config.js             # Vue CLI configuration
├── .env                      # Environment variables for frontend


backend/
├── src/
│   ├── config/               # Configurations and database setup
│   │   └── db.ts             # Database connection
│   │   └── dotenvConfig.ts   # Loading environment variables
│   │
│   ├── models/               # Mongoose schemas
│   │   └── User.ts           # User model (for authentication, etc.)
│   │   └── Ebook.ts          # Product (ebook) model
│   │
│   ├── routes/               # Express routes
│   │   └── userRoutes.ts     # Routes for user-related actions (login, registration)
│   │   └── ebookRoutes.ts    # Routes for product (ebook) management
│   │
│   ├── controllers/          # Controllers for handling business logic
│   │   └── userController.ts # Logic for user authentication
│   │   └── ebookController.ts# Logic for adding, fetching products
│   │
│   ├── services/             # Service layer for complex logic
│   │   └── userService.ts    # Services for user-related operations
│   │
│   ├── middlewares/          # Middleware (auth, error handling)
│   │   └── authMiddleware.ts # Middleware for authentication using JWT
│   │
│   ├── utils/                # Utility functions (like error handling)
│   │   └── errorHandler.ts   # Custom error handler
│   │
│   ├── types/                # TypeScript types
│   │   └── user.ts           # Type definitions for user
│   │   └── ebook.ts          # Type definitions for products (ebooks)
│   │
│   └── index.ts              # Main server entry point
│
├── tests/                    # Jest and Supertest tests
│   └── user.test.ts          # Tests for user registration, login
│   └── ebook.test.ts         # Tests for product management (add, fetch)
│
├── package.json              # Backend dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── .env                      # Environment variables for backend