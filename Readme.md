# Sample API Gateway - Microservice for Authentication and Authorization

The Sample API Gateway is a microservice designed for authentication and authorization. It uses Docker for containerization, Redis for session storage, and MongoDB for storing user data. The service includes user authentication based on email and passwords.

## Technologies Used

- Docker: Containerization platform for seamless deployment and scalability.
- Redis: In-memory data structure store for session storage.
- MongoDB: NoSQL database for persistent storage of user data.
- OAuth 2.0 (Future Plan): Secure authentication using Google OAuth for enhanced user authentication.

## Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) for multi-container Docker applications.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sample-api-gateway.git


2. Navigate to main folder

3. to run 
  1) for Dev env : docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

  - if want ro run 2 or more instances of api gateway
  cmd:  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d --scale api-gate-way-ex1=2


4. use Postman to hit the service ( use json file to import apis in postman : ApI Gateway personal.postman_collection.json )
  
5. for cmd to see logs and other details read doceker.txt file

6. to stop conatiners: docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
  

for more about docker cmd and their use read [docker.txt ] file
----------------------------------------------------------------------------------
  