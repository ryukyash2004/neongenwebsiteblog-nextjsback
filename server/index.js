import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Database from "better-sqlite3";
import { setupAuthRoutes } from "./routes/auth.js";
import { setupUserRoutes } from "./routes/users.js";
import { setupPostRoutes } from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize SQLite database
const dbPath = join(__dirname, "database", "dev.db");
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS Post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'Engineering',
    gradient TEXT DEFAULT 'from-blue-500 to-cyan-400',
    published INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    authorId INTEGER NOT NULL,
    FOREIGN KEY (authorId) REFERENCES User(id)
  );
`);

const PORT = 3001;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup routes
app.use("/api/signup", setupAuthRoutes(db));
app.use("/api/login", setupAuthRoutes(db));
app.use("/api/users", setupUserRoutes(db));
app.use("/api/search", setupUserRoutes(db));
app.use("/api/posts", setupPostRoutes(db));

// Legacy post route
app.post("/api/post", (req, res) => {
  try {
    const { title, content, authorId, category, gradient } = req.body || {};
    
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };
    
    const generatedSlug = generateSlug(title);
    
    const stmt = db.prepare(`
      INSERT INTO Post (title, slug, content, authorId, category, gradient) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      title,
      generatedSlug,
      content,
      Number(authorId),
      category || "Engineering",
      gradient || "from-blue-500 to-cyan-400"
    );
    
    const newPost = db.prepare("SELECT * FROM Post WHERE id = ?").get(result.lastInsertRowid);
    
    res.status(201).json({
      ...newPost,
      date: newPost.createdAt,
      author: { name: newPost.authorId }
    });
  } catch (error) {
    console.error("POST_API_ERROR:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Legacy get all posts
app.get("/api/post", (req, res) => {
  const posts = db.prepare(`
    SELECT p.*, u.name as author 
    FROM Post p 
    JOIN User u ON p.authorId = u.id
    ORDER BY p.createdAt DESC
  `).all();
  
  const formattedPosts = posts.map(post => ({
    ...post,
    date: post.createdAt,
    author: { name: post.author },
    authorName: undefined
  }));
  
  res.status(200).json(formattedPosts);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("API Error:", err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  db.close();
  process.exit(0);
});

export { db };