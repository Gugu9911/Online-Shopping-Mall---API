# Online Shopping Mall - Backend API

This repository contains the backend code for the Online Shopping Mall - GroceryHub, an e-commerce platform. The backend is built with Express and provides RESTful APIs as per the provided Entity-Relationship Diagram (ERD).

![ER Diagram](readmePic/ER%20diagram.png)

## Overview

The backend services are designed to support the operations of an e-commerce platform, including user management, product listings, and administrative functions. The API follows REST principles and supports CRUD operations on various entities as outlined by the ERD.

### Live Website

Access the live application here: [Online Shopping Mall](https://online-shopping-mall.vercel.app/)

### Frontend Repository

View the frontend repository on GitHub: [Online Shopping Mall - Frontend](https://github.com/Gugu9911/Online-Shopping-Mall---Frontend)

## Features

### Entity CRUD Operations

Before integrating JWT authentication, it can establish basic CRUD operations for entities such as products, users, and orders based on the ERD. This includes:

- Creating, reading, updating, and deleting products, users, and orders.
- Admin functionalities to manage users and products.

### Authentication

Implement secure authentication using JSON Web Tokens (JWT) to manage user sessions and secure API access. This includes:

- User registration and login.
- Password recovery and update mechanisms.
- Admin authentication for restricted endpoints.

### API Features:

#### Products

- Attributes: ID, name, description, categories, variants/sizes.
- Fetch all products, optionally with pagination.
- Search products by name, category, or variant.
- Retrieve a specific product by ID.

#### Users

- Attributes: ID, first name, last name, email.
- Register a new user.
- User login with username and password.
- Update user profile details.
- Password recovery and reset functionalities.

#### Admin

- Enhanced privileges to add, update, or delete products.
- Ability to ban or unban users.

#### Order & Order Item

- Ability to Create, Update, Delete, Get


## Response and Error Handling

All responses are in JSON format, including a `status`, `data`, and `message` (optional). Comprehensive error handling is implemented to provide clear feedback and appropriate HTTP status codes for different errors.

## Testing

Unit tests for Services had be conducted to ensure API reliability and correctness. Instructions for running tests should be detailed in the project documentation.

## Deployment

The API is deployed at: [Deploy with Render](https://online-shopping-mall-api.onrender.com)
