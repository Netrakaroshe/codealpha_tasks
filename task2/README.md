# Event Registration System

A REST API built with **Node.js**, **Express.js**, and **MongoDB** for managing events and event registrations.

## Features

### Event Management

* Create a new event
* View all events
* View a specific event by ID
* Validate event dates (only future events can be created)

### Registration Management

* Register for an event
* View all registrations
* View a specific registration
* Cancel a registration before the event date
* Prevent duplicate registrations for the same event
* Prevent registrations when the event capacity is full
* Automatically update available seats when users register or cancel

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman (API Testing)

## Project Structure

```
src
├── controllers
├── db
├── models
├── routes
├── app.js
server.js
```

## API Endpoints

### Events

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | `/api/events`     | Create a new event |
| GET    | `/api/events`     | Get all events     |
| GET    | `/api/events/:id` | Get event details  |

### Registrations

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| POST   | `/api/registrations`     | Register for an event    |
| GET    | `/api/registrations`     | Get all registrations    |
| GET    | `/api/registrations/:id` | Get registration details |
| DELETE | `/api/registrations/:id` | Cancel a registration    |

## Validation

The application performs the following validations:

* Required fields are validated.
* Event IDs are validated before database operations.
* Events must have a valid future date.
* Registration is allowed only if the event exists.
* Duplicate registrations for the same event are prevented.
* Registration is blocked when the event reaches maximum capacity.
* Past event registrations cannot be cancelled.

## Testing

All API endpoints were tested using Postman.
