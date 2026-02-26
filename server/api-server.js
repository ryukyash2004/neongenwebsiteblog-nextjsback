import http from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Database from "better-sqlite3";
import { createHash } from "crypto";

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

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  try {
    // Users API - POST
    if (pathname === "/api/users" && req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const data = JSON.parse(body || "{}");
          const email = data.email || `dev-${Date.now()}@example.com`;
          const name = data.name || "Test Admin";
          
          const stmt = db.prepare("INSERT INTO User (email, name, password) VALUES (?, ?, ?)");
          const result = stmt.run(email, name, "");
          
          const user = db.prepare("SELECT id, email, name FROM User WHERE id = ?").get(result.lastInsertRowid);
          
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } catch (error) {
          console.error("PRISMA ERROR:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // User Signup - POST /api/signup
    if (pathname === "/api/signup" && req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const { email, name, password } = JSON.parse(body || "{}");
          
          if (!email || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Email and password are required" }));
            return;
          }

          // Check if user already exists
          const existingUser = db.prepare("SELECT id FROM User WHERE email = ?").get(email);
          if (existingUser) {
            res.writeHead(409, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "User with this email already exists" }));
            return;
          }

          // Hash password using Node.js built-in crypto
          const hashedPassword = createHash('sha256').update(password).digest('hex');
          
          const stmt = db.prepare("INSERT INTO User (email, name, password) VALUES (?, ?, ?)");
          const result = stmt.run(email, name || "User", hashedPassword);
          
          const user = db.prepare("SELECT id, email, name FROM User WHERE id = ?").get(result.lastInsertRowid);
          
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } catch (error) {
          console.error("SIGNUP_ERROR:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // User Login - POST /api/login
    if (pathname === "/api/login" && req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const { email, password } = JSON.parse(body || "{}");
          
          if (!email || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Email and password are required" }));
            return;
          }

          const user = db.prepare("SELECT * FROM User WHERE email = ?").get(email);
          if (!user) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid email or password" }));
            return;
          }

          // Hash the provided password and compare with stored hash
          const hashedPassword = createHash('sha256').update(password).digest('hex');
          if (hashedPassword !== user.password) {
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid email or password" }));
            return;
          }

          // Return user without password
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ id: user.id, email: user.email, name: user.name }));
        } catch (error) {
          console.error("LOGIN_ERROR:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // Users API - GET
    if (pathname === "/api/users" && req.method === "GET") {
      const users = db.prepare("SELECT id, email, name FROM User").all();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
      return;
    }

    // Search API
    if (pathname === "/api/search" && req.method === "GET") {
      const username = url.searchParams.get("username");
      
      if (!username) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Username parameter is required" }));
        return;
      }

      const users = db.prepare("SELECT id, email, name FROM User WHERE name LIKE ?").all(`%${username}%`);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
      return;
    }

    // Posts API - POST
    if (pathname === "/api/post" && req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const { title, content, authorId, category, gradient } = JSON.parse(body || "{}");
          
          const generatedSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
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
          
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(newPost));
        } catch (error) {
          console.error("POST_API_ERROR:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to create post" }));
        }
      });
      return;
    }

    // Posts API - GET all posts (with optional category filter and sort)
    if (pathname === "/api/posts" && req.method === "GET") {
      const category = url.searchParams.get("category");
      const sort = url.searchParams.get("sort") || "newest"; // "newest" or "oldest"
      
      let query = `
        SELECT p.*, u.name as authorName
        FROM Post p
        JOIN User u ON p.authorId = u.id
      `;
      
      const conditions = [];
      const params = [];
      
      if (category && category !== "All") {
        conditions.push("p.category = ?");
        params.push(category);
      }
      
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
      
      query += sort === "oldest" ? " ORDER BY p.createdAt ASC" : " ORDER BY p.createdAt DESC";
      
      const posts = db.prepare(query).all(...params);
      
      // Format posts to include date field for frontend compatibility
      const formattedPosts = posts.map(post => ({
        ...post,
        date: post.createdAt, // Add date alias for frontend compatibility
        author: { name: post.authorName }
      }));
      
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(formattedPosts));
      return;
    }

    // Posts API - GET single post by slug
    if (pathname.startsWith("/api/posts/") && req.method === "GET") {
      const slug = pathname.split("/")[3]; // Extract slug from /api/posts/:slug
      
      if (!slug) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Slug is required" }));
        return;
      }
      
      const post = db.prepare(`
        SELECT p.*, u.name as authorName
        FROM Post p
        JOIN User u ON p.authorId = u.id
        WHERE p.slug = ?
      `).get(slug);
      
      if (!post) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Post not found" }));
        return;
      }
      
      // Format post to include date field for frontend compatibility
      const formattedPost = {
        ...post,
        date: post.createdAt, // Add date alias for frontend compatibility
        author: { name: post.authorName }
      };
      
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(formattedPost));
      return;
    }

    // Posts API - PUT (update) single post by slug
    if (pathname.startsWith("/api/posts/") && req.method === "PUT") {
      const slug = pathname.split("/")[3]; // Extract slug from /api/posts/:slug
      
      if (!slug) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Slug is required" }));
        return;
      }
      
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const { title, content, category, gradient, published } = JSON.parse(body || "{}");
          
          // Check if post exists
          const existingPost = db.prepare("SELECT id FROM Post WHERE slug = ?").get(slug);
          if (!existingPost) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Post not found" }));
            return;
          }
          
          // Build dynamic update query
          const updates = [];
          const values = [];
          
          if (title !== undefined) {
            updates.push("title = ?");
            values.push(title);
            // Regenerate slug if title changes
            const newSlug = generateSlug(title);
            updates.push("slug = ?");
            values.push(newSlug);
          }
          if (content !== undefined) {
            updates.push("content = ?");
            values.push(content);
          }
          if (category !== undefined) {
            updates.push("category = ?");
            values.push(category);
          }
          if (gradient !== undefined) {
            updates.push("gradient = ?");
            values.push(gradient);
          }
          if (published !== undefined) {
            updates.push("published = ?");
            values.push(published ? 1 : 0);
          }
          
          updates.push("updatedAt = CURRENT_TIMESTAMP");
          values.push(slug); // For WHERE clause
          
          const query = `UPDATE Post SET ${updates.join(", ")} WHERE slug = ?`;
          db.prepare(query).run(...values);
          
          const updatedPost = db.prepare(`
            SELECT p.*, u.name as authorName
            FROM Post p
            JOIN User u ON p.authorId = u.id
            WHERE p.slug = ?
          `).get(slug);
          
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            ...updatedPost,
            date: updatedPost.createdAt,
            author: { name: updatedPost.authorName }
          }));
        } catch (error) {
          console.error("PUT_POST_ERROR:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
      return;
    }

    // Posts API - DELETE single post by slug
    if (pathname.startsWith("/api/posts/") && req.method === "DELETE") {
      const slug = pathname.split("/")[3]; // Extract slug from /api/posts/:slug
      
      if (!slug) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Slug is required" }));
        return;
      }
      
      // Check if post exists
      const existingPost = db.prepare("SELECT id FROM Post WHERE slug = ?").get(slug);
      if (!existingPost) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Post not found" }));
        return;
      }
      
      db.prepare("DELETE FROM Post WHERE slug = ?").run(slug);
      
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Post deleted successfully", slug }));
      return;
    }

    // Legacy Posts API - GET (keep for backward compatibility)
    if (pathname === "/api/post" && req.method === "GET") {
      const posts = db.prepare(`
        SELECT p.*, u.name as author
        FROM Post p
        JOIN User u ON p.authorId = u.id
        ORDER BY p.createdAt DESC
      `).all();
      
      // Format posts to match Prisma response format with nested author object
      const formattedPosts = posts.map(post => ({
        ...post,
        date: post.createdAt,
        author: { name: post.author },
        authorName: undefined
      }));
      
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(formattedPosts));
      return;
    }

    // Legacy Posts API - POST (keep for backward compatibility)
    if (pathname === "/api/post" && req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const { title, content, authorId, category, gradient } = JSON.parse(body || "{}");
          
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
          
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            ...newPost,
            date: newPost.createdAt,
            author: { name: newPost.authorId } // Simplified for legacy
          }));
        } catch (error) {
          console.error("POST_API_ERROR:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to create post" }));
        }
      });
      return;
    }

    // 404 for unknown routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));

  } catch (error) {
    console.error("API Error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  db.close();
  server.close();
  process.exit(0);
});