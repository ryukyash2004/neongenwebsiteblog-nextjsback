import { Router } from 'express';

const router = Router();

export function setupUserRoutes(db) {
  // Users API - POST (create user directly, legacy)
  router.post("/", (req, res) => {
    try {
      const data = req.body || {};
      const email = data.email || `dev-${Date.now()}@example.com`;
      const name = data.name || "Test Admin";
      
      const stmt = db.prepare("INSERT INTO User (email, name, password) VALUES (?, ?, ?)");
      const result = stmt.run(email, name, "");
      
      const user = db.prepare("SELECT id, email, name FROM User WHERE id = ?").get(result.lastInsertRowid);
      
      res.status(201).json(user);
    } catch (error) {
      console.error("PRISMA ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Users API - GET (list all users)
  router.get("/", (req, res) => {
    const users = db.prepare("SELECT id, email, name FROM User").all();
    res.status(200).json(users);
  });

  // Search API - GET /api/search?username=...
  router.get("/search", (req, res) => {
    const username = req.query.username;
    
    if (!username) {
      return res.status(400).json({ error: "Username parameter is required" });
    }

    const users = db.prepare("SELECT id, email, name FROM User WHERE name LIKE ?").all(`%${username}%`);
    res.status(200).json(users);
  });

  return router;
}