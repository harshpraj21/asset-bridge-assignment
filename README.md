# Asset-bridge-assignment

### 1. Install Docker (if not already)

To run this project locally, make sure Docker and Docker Compose are installed.

- [Download Docker Desktop (Windows/Mac)](https://www.docker.com/products/docker-desktop)
- [Install Docker Engine (Linux)](https://docs.docker.com/engine/install/)

After installing, verify Docker is working:

```bash
docker --version
docker-compose --version
```

---

### 2. Clone the Repository

```bash
git clone https://github.com/harshpraj21/asset-bridge-assignment.git
cd book-review-assignment
```

---

### 3. Build and Run the Containers

From the project root:

```bash
docker-compose up --build
```

This will start:

- PostgreSQL database
- Django backend on [http://localhost:8000](http://localhost:8000)
- React frontend on [http://localhost:3000](http://localhost:3000)

---

### 4. Access the App

| Service     | URL                             |
| ----------- | ------------------------------- |
| Frontend    | http://localhost:3000           |
| Backend API | http://localhost:8000/api/      |
| API Docs    | http://localhost:8000/api/docs/ |

---
