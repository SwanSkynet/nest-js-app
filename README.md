## Running Locally

### Prerequisites

- Node.js 24+
- PostgreSQL

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

Start the application:

```bash
npm run start:dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Running with Docker

Build and start the application:

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

The application will be available at:

```
http://localhost:3000
```

---

## Available Endpoints

- `GET /status` – Health check
- `POST /room/people` – Set the number of people in the room
- `POST /room/intro-time` – Set the duration of each conversation
- `GET /room/total-intro-time` – Get the total introduction time
- `GET /room/people-list` – Get the current attendee list

---
