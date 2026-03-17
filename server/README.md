
---

## API Documentation

The backend API is built with Express.js and SQLite, located in the `server/` directory.

### Base URL
```
http://localhost:3001
```

### Running the API Server
```bash
npm run dev        # Run both frontend and API server
npm run dev:api    # Run only the API server
```

---

## Endpoints

### Authentication

#### POST `/api/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "securepassword"
}
```

**Responses:**
- `201 Created` - User created successfully
- `400 Bad Request` - Missing email or password
- `409 Conflict` - User already exists

---

#### POST `/api/login`
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Responses:**
- `200 OK` - Returns user object (without password)
- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials

---

### Users

#### GET `/api/users`
Get all users.

**Response:**
```json
[
  { "id": 1, "email": "user@example.com", "name": "John Doe" }
]
```

---

#### POST `/api/users`
Create a user (legacy endpoint).

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

#### GET `/api/search?username=<name>`
Search users by name.

**Query Parameters:**
| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| username  | string | Partial name to match |

**Response:**
```json
[
  { "id": 1, "email": "user@example.com", "name": "John Doe" }
]
```

---

### Posts

#### GET `/api/posts`
Get all posts with optional filtering and sorting.

**Query Parameters:**
| Parameter | Type   | Default   | Description                    |
|-----------|--------|-----------|--------------------------------|
| category  | string | -         | Filter by category             |
| sort      | string | "newest"  | "newest" or "oldest"           |

**Example:**
```
GET /api/posts?category=Engineering&sort=newest
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Post Title",
    "slug": "post-title",
    "content": "Post content...",
    "category": "Engineering",
    "gradient": "from-blue-500 to-cyan-400",
    "published": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "authorId": 1,
    "date": "2024-01-01T00:00:00.000Z",
    "author": { "name": "Author Name" }
  }
]
```

---

#### GET `/api/posts/:slug`
Get a single post by slug.

**Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| slug      | string | Post slug   |

**Response:**
```json
{
  "id": 1,
  "title": "Post Title",
  "slug": "post-title",
  "content": "Post content...",
  "category": "Engineering",
  "gradient": "from-blue-500 to-cyan-400",
  "published": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "authorId": 1,
  "date": "2024-01-01T00:00:00.000Z",
  "author": { "name": "Author Name" }
}
```

---

#### PUT `/api/posts/:slug`
Update a post by slug.

**Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| slug      | string | Post slug   |

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Research",
  "gradient": "from-purple-500 to-pink-500",
  "published": true
}
```

**Note:** If `title` is changed, the `slug` will be regenerated automatically.

---

#### DELETE `/api/posts/:slug`
Delete a post by slug.

**Response:**
```json
{
  "message": "Post deleted successfully",
  "slug": "post-title"
}
```

---

#### POST `/api/post`
Create a new post (legacy endpoint).

**Request Body:**
```json
{
  "title": "New Post",
  "content": "Post content...",
  "authorId": 1,
  "category": "Engineering",
  "gradient": "from-blue-500 to-cyan-400"
}
```

---

#### GET `/api/post`
Get all posts (legacy endpoint, returns same format as `GET /api/posts`).

---

## Database Schema

### User Table
| Column   | Type    | Description              |
|----------|---------|--------------------------|
| id       | INTEGER | Primary key, autoincrement |
| email    | TEXT    | Unique, not null         |
| name     | TEXT    |                          |
| password | TEXT    | SHA-256 hashed           |

### Post Table
| Column    | Type     | Description                        |
|-----------|----------|------------------------------------|
| id        | INTEGER  | Primary key, autoincrement         |
| title     | TEXT     | Not null                           |
| slug      | TEXT     | Unique, auto-generated from title  |
| content   | TEXT     | Not null                           |
| category  | TEXT     | Default: "Engineering"             |
| gradient  | TEXT     | Default: "from-blue-500 to-cyan-400" |
| published | INTEGER  | Default: 0                         |
| createdAt | DATETIME | Default: CURRENT_TIMESTAMP         |
| updatedAt | DATETIME | Default: CURRENT_TIMESTAMP         |
| authorId  | INTEGER  | Foreign key to User(id)            |

---

## Project Structure

```
server/
├── index.js              # Main Express app entry point
├── database/
│   └── dev.db            # SQLite database file
└── routes/
    ├── auth.js           # Authentication routes (/api/signup, /api/login)
    ├── users.js          # User routes (/api/users, /api/search)
    └── posts.js          # Post CRUD routes (/api/posts)
```
