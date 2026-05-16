# Full-Stack Bank System Simulation

A comprehensive full-stack banking application demonstrating modern web development and software architecture. This project simulates real-world banking operations, built with a robust backend and a responsive user interface.

## 🚀 Key Features

- **User Authentication & Registration:** Secure user onboarding process. Each newly registered user is automatically assigned a unique account number.
- **Account Management:** Real-time tracking of account balances and financial states.
- **Peer-to-Peer Transfers:** Secure fund transfers between different user accounts, including validation mechanisms (e.g., sufficient funds checks) and transactional integrity.
- **Microservices Architecture:** Designed with scalability in mind, separating core business logic into independent, manageable services.

## 🛠️ Technology Stack

**Backend:**

- **Java & Spring Boot:** The core framework used for building robust and scalable RESTful APIs.
- **Architecture:** Microservices approach, structured using the Controller-Service-Repository pattern to maintain clean and decoupled code.
- **REST API:** Standardized endpoints for seamless communication between the client and server.

**Frontend:**

- **React:** For building a dynamic and interactive user interface.
- **TypeScript:** Ensuring type safety, better tooling, and highly maintainable client-side code.

## ⚙️ Project Structure (Backend)

The backend is organized to follow best practices in software design:

- **Controllers:** Handling incoming HTTP requests, input validation, and routing them to the appropriate services.
- **Services:** Containing the core business logic (e.g., executing the logic for transferring funds and updating balances).
- **Models/Entities:** Representing the data structures (Users, Accounts, Transactions).

## 📡 Core API Endpoints

| Method | Endpoint                     | Description                                        |
| :----- | :--------------------------- | :------------------------------------------------- |
| `POST` | `/api/auth/register`         | Register a new user and generate an account number |
| `POST` | `/api/auth/login`            | Authenticate user and return session/token         |
| `GET`  | `/api/accounts/balance`      | Retrieve the current balance of the logged-in user |
| `POST` | `/api/transactions/transfer` | Transfer money to another account number           |

## 🏃‍♂️ Getting Started

### Prerequisites

- Java 17+
- Node.js & npm (for the frontend)
- [Add Database name here, e.g., MySQL / PostgreSQL]

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/nehoray-y/BankSystem-Personal-Project.git](https://github.com/nehoray-y/BankSystem-Personal-Project.git)
   ```
