# Pedal Paradise Server

A backend server built using **Node.js**, **Express**, and **MongoDB**. This API handles bicycle inventory, orders, and revenue calculations. It supports CRUD operations for bicycles, manages orders with automatic stock updates, and integrates secure payment processing. The application also features role-based access control (RBAC) for user permissions and provides a robust error-handling mechanism to ensure stability and security.

## 📋 Features

- **User Authentication & Management**: Secure user authentication with JWT-based authorization and role-based access control (RBAC).
- **Store Bicycle Data**: Store and manage bicycle details in the database.
- **Create, Read, Update, and Delete Bicycle Details**: Fully manage bicycle records via API endpoints.
- **Store Orders**: Create orders and automatically update the stock quantity.
- **Process Payments**: Integrate a secure payment gateway to handle transactions efficiently.
- **Calculate Total Revenue**: Calculate the total revenue generated from all orders.
- **Search Bicycles**: Retrieve bicycles based on query search terms.
- **Validate User Inputs**: Ensure data integrity using **Zod** for input validation.
- **Error Handling**: Provides meaningful error messages for a better user experience.
- **TypeScript Integration**: Type annotations for reliability and maintainability of the application.
- **MongoDB Integration**: Use **Mongoose** to interact with MongoDB for efficient data handling and validation.
- **Code Linting & Formatting**: Enforce code quality with **ESLint** and **Prettier** for consistent code style.

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>=14.x.x)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)
- **Git**
- **TypeScript** (Optional: If you prefer to install globally)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayan-akd/b4-assignment-4-bicycle-store-server.git
    ```
2. Install dependencies:

   ```bash
   cd b4-assignment-4-bicycle-store-server
   npm install
   ```

3. Create a .env file in the root directory based on the provided .env.example file. Update the necessary values according to your environment:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   etc..........
   ```

4. Start the development server:

   ```bash
   npm run start:dev
   ```

The server will run at http://localhost:5000 (or another port if you configure it differently).

## 🛠️ Scripts

The project includes several npm scripts for development and production:

- `npm run start`: Starts the application in production mode.
- `npm run start:dev`: Starts the application in development mode with live reloading using `ts-node-dev`.
- `npm run build`: Builds the production application.
- `npm run dev`: Watches for changes and compiles TypeScript files automatically.
- `npm run lint`: Lints the codebase using **ESLint**.
- `npm run lint:fix`: Automatically fixes linting errors.
- `npm run format`: Formats the codebase using **Prettier**.
- `npm run format:fix`: Automatically fixes formatting issues with **Prettier**.

## API Endpoints

### Authentication

- **POST /api/auth/login**: Authenticate a user and return an access token.
- **POST /api/auth/change-password**: Allows an authenticated user to change their password.
- **POST /api/auth/refresh-token**: Generate a new access token using a refresh token.

### User

- **GET /api/users**: Retrieve a list of all registered users (Admin access required).
- **GET /api/users/me**: Retrieve the authenticated user's profile information.
- **POST /api/users/create-user**: Register a new user account.
- **PATCH /api/users/change-status/:id**: Update the status (active/blocked) of a user (Admin access required).

### Products (Bicycles)

- **GET /api/products**: Retrieve a list of all bicycles in the inventory.
- **GET /api/products/:id**: Retrieve detailed information for a specific bicycle by its ID.
- **GET /api/brands**: Retrieve a list of all bicycle brands available.
- **POST /api/products**: Add a new bicycle to the inventory.
- **PUT /api/products/:id**: Update the details of a specific bicycle (identified by ID).
- **DELETE /api/products/:id**: Delete a specific bicycle from the inventory (identified by ID).

### Orders

- **GET /api/orders**: Retrieve a list of all orders.
- **GET /api/orders/my-orders/:userId**: Retrieve a list of all orders made by a specific customer.
- **GET /api/verify/:paymentId**: Verify the payment status for a given payment ID.
- **GET /api/orders/revenue**: Get the total revenue generated from all orders.
- **POST /api/orders**: Create a new order, automatically updating the stock quantity.
- **PATCH /api/orders/change-status/:id**: Update the status of a specific order (identified by ID).


## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js for building the API.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB to facilitate data handling and validation.
- **TypeScript**: Type-safe JavaScript for a more reliable and maintainable codebase.
- **ShurjoPay**: Payment gateway integration for processing transactions.
- **JWT (JSON Web Token)**: For user authentication and secure token handling.
- **Bcrypt**: For hashing passwords and ensuring security.
- **Zod**: Schema validation library to ensure input data integrity.
- **ESLint**: Linting tool to enforce consistent coding styles.
- **Prettier**: Code formatter to maintain consistent formatting across the codebase.

## Project Live Link

[Live API](https://pedal-paradise-server.vercel.app)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the **MongoDB** team for providing a reliable database solution.
- Thanks to **ShurjoPay** for providing a seamless payment gateway solution.
- Special thanks to **Zod**, **Prettier**, and **ESLint** for enhancing code quality and maintainability.

Feel free to clone and contribute to this project. If you find any bugs or have suggestions for improvements, feel free to open an issue or pull request!
Happy coding! 🚲🛠️