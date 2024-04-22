# Spring Boot Backend for Employee Management

This project serves as the backend API for the Employee Management system. It provides endpoints for user registration, authentication, and managing employee records.

## Technologies Used

- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- PostgreSQL (or MySQL)

## Features

### User Authentication

- **User Registration**: Allows users to create new accounts.
- **User Login**: Authenticates users and generates JWT tokens.
- **Authorization**: Protects endpoints based on user roles (USER, MODERATOR, ADMIN).

### Employee Management

- **Create Employee**: Create new employee records.
- **Update Employee**: Update existing employee details.
- **Delete Employee**: Delete employee records.
- **View Employees**: Retrieve and view employee details.

## Getting Started

### Prerequisites

- Java JDK 8 or higher
- Maven
- PostgreSQL or MySQL database

### Configuration

1. Clone the repository:

    ```bash
    git clone https://github.com/Punithdv21/Employee_managments.git
    ```

2. Navigate to the `spring-boot-Backend` directory:

    ```bash
    cd Employee_managments/spring-boot-Backend
    ```

3. Configure the database in `src/main/resources/application.properties`:

    - For PostgreSQL:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
    spring.datasource.username=postgres
    spring.datasource.password=your_password
    ```

    - For MySQL:

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_database?useSSL=false
    spring.datasource.username=root
    spring.datasource.password=your_password
    ```

4. Run the application:

    ```bash
    mvn spring-boot:run
    ```

## API Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/signin**: Authenticate user and generate JWT token.
- **GET /api/employees**: Retrieve all employees.
- **GET /api/employees/{id}**: Retrieve a specific employee by ID.
- **POST /api/employees**: Create a new employee.
- **PUT /api/employees/{id}**: Update an existing employee.
- **DELETE /api/employees/{id}**: Delete an employee.

For detailed API documentation, refer to the [Postman collection](#) or [Swagger UI](#) (if available).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
