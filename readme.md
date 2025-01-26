# Bicycle Store Server

A backend server built using **Node.js**, **Express**, and **MongoDB**. This API handles bicycle inventory, orders, and revenue calculations. The application supports CRUD operations for bicycles, manages orders with automatic stock updates, and provides a comprehensive error handling mechanism.

## 📋 Features

- **Store Bicycle Data**: Store and manage bicycle details in the database.
- **Create, Read, Update, and Delete Bicycle Details**: Fully manage bicycle records via API endpoints.
- **Store Orders**: Create orders and automatically update the stock quantity.
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
   git clone https://github.com/yourusername/bicycle-store-server.git
   cd bicycle-store-server
    ```
2. Install dependencies:

   ```bash
   cd bicycle-store-server
   npm install
   ```

3. Create a .env file in the root directory and add your MongoDB connection URI:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
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
- `npm run build`: Builds the application for production.
- `npm run dev`: Watches for changes and compiles TypeScript files automatically.
- `npm run lint`: Lints the codebase using **ESLint**.
- `npm run lint:fix`: Automatically fixes linting errors.
- `npm run format`: Formats the codebase using **Prettier**.
- `npm run format:fix`: Automatically fixes formatting issues with **Prettier**.

## API Endpoints

### Products (Bicycles)

- **GET /api/products**: Retrieve a list of all bicycles.
- **GET /api/products/:id**: Retrieve a single bicycle by its ID.
- **POST /api/products**: Add a new bicycle to the inventory.
- **PUT /api/products/:id**: Update the details of a specific bicycle.
- **DELETE /api/products/:id**: Delete a specific bicycle from the inventory.

### Orders

- **POST /api/orders**: Create a new order. Stock will be updated automatically.
- **GET /api/orders//revenue**: Get the total revenue generated from all orders.

### Revenue

- **GET /api/revenue**: Get the total revenue generated from all orders.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js for building the API.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM for MongoDB to facilitate data handling and validation.
- **TypeScript**: Type-safe JavaScript for a more reliable and maintainable codebase.
- **Zod**: Schema validation library to ensure input data integrity.
- **ESLint**: Linting tool to enforce consistent coding styles.
- **Prettier**: Code formatter to maintain consistent formatting across the codebase.

## Project Live Link

[Live API](https://bicycle-store-server-virid.vercel.app/api/products)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the **MongoDB** team for providing a reliable database solution.
- Special thanks to **Zod**, **Prettier**, and **ESLint** for enhancing code quality and maintainability.

Feel free to clone and contribute to this project. If you find any bugs or have suggestions for improvements, feel free to open an issue or pull request!
Happy coding! 🚲🛠️