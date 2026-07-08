# Restaurant Management System API

This project is a REST API built using Node.js, Express.js, MongoDB, and Mongoose. It provides backend functionality for managing a restaurant, including menu items, inventory, tables, reservations, and customer orders.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

### Menu

- Add a menu item
- Get all menu items
- Get a specific menu item

### Inventory

- View complete inventory
- View stock of a specific menu item
- Update stock quantity

### Tables

- Add a table
- Get all tables
- Get a specific table

### Reservations

- Create a reservation
- View all reservations
- View a reservation
- Cancel a reservation
- Prevent overlapping reservations for the same table

### Orders

- Create an order
- Get all orders
- Get a specific order
- Check stock before placing an order
- Reduce inventory after a successful order
- Store item price at the time of ordering

## API Endpoints

### Menu

- POST `/menu`
- GET `/menu`
- GET `/menu/:id`

### Inventory

- GET `/inventory`
- GET `/inventory/:id`
- PATCH `/inventory/:id`

### Tables

- POST `/tables`
- GET `/tables`
- GET `/tables/:id`

### Reservations

- POST `/reservations`
- GET `/reservations`
- GET `/reservations/:id`
- DELETE `/reservations/:id`

### Orders

- POST `/orders`
- GET `/orders`
- GET `/orders/:id`

## Notes

- Menu items are automatically added to inventory with an initial stock of 0.
- Reservations are limited to a duration of 2.5 hours.
- Overlapping reservations for the same table are not allowed.
- Inventory is automatically updated when an order is placed.
- `priceAtOrder` is stored to preserve the original order price even if menu prices change later.
