Welcome to the README file for the CraftCon Website project. 
This project serves as a job portal for contractors to showcase their portfolios, 
and allows users to hire contractors for home construction projects.

Description
The CraftCon Website is a platform that connects contractors and users for home construction projects. 
Contractors can showcase their portfolios, and users can browse and hire them based on their profiles.

Tech Stacks
Typescript
Front End: React (Vite), Tailwind CSS, Material-UI (MUI)
Back End: Node.js, Express, PostgreSQL, Redis, Prisma ORM, AWS S3
DevOps: Docker, Docker Compose

Backend
The backend component is responsible for managing data, server-side logic, and communication with databases.

Installation
Make sure you have pnpm installed globally:
```bash
npm install -g pnpm
```
Install backend dependencies:
```bash
pnpm install
```
Generate Prisma client:
```bash
npx prisma generate
```
Run migrations:
```bash
npx prisma migrate dev
```
Compile TypeScript:
```bash
npx tsc
```

Start the backend server:
```bash
node dist/index.js
```

Database Setup
Ensure you have PostgreSQL and Redis databases set up and running. Update the backend configuration files for database connections.

PostgreSQL
Update the database connection details in backend/.env:
```ts
const databaseConfig = {
  // ...
  database: 'your_postgresql_database_name',
  // ...
};
```
Redis
Update Redis configuration in backend/config/redis.ts:
```ts
const redisConfig = {
  // ...
  host: 'your_redis_host',
  port: your_redis_port,
  // ...
};
```
AWS S3 Setup
To use AWS S3 for storing files, you need to set up your AWS S3 credentials. Update the backend configuration file at backend/config/aws.ts:
```ts
const awsConfig = {
  accessKeyId: 'your_aws_access_key_id',
  secretAccessKey: 'your_aws_secret_access_key',
  region: 'your_aws_region',
  bucketName: 'your_s3_bucket_name',
};
```
Frontend
The frontend provides the user interface for interacting with the platform.

Installation
Install global dependencies:
```bash
npm install -g pnpm
```
Install frontend dependencies:
```bash
pnpm install
```
Run the development server:
```bash
npm run dev
```
DevOps
For DevOps, Docker and Docker Compose are used to manage the project environment.

Docker Image
To use the backend Docker image, you can pull it from Docker Hub:
```bash
docker pull genochs/carftcon-backend:latest
```
To use the frontend Docker image, you can pull it from Docker Hub:
```bash
docker pull genochs/carftcon-frontend:latest
```
Getting Started
After setting up the backend, frontend, and AWS S3, you can start developing. Run the backend and frontend development servers following the instructions above.

Access the frontend by opening your browser and navigating to http://localhost:5173.

Conclusion
With the backend, frontend, and DevOps environment set up, you are ready to work on the CraftCon Website project. Refer to the respective documentation for more details about each component. If you encounter any issues or have questions, feel free to ask for assistance. Happy coding!
