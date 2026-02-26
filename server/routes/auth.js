import { Router } from 'express';
import { createHash } from "crypto";

const router = Router();

export function setupAuthRoutes(db) {
  // User Signup - POST /api/signup
  router.post("/signup", (req, res) => {
    try {
      const { email, name, password } = req.body || {};
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // Check if user already exists
      const existingUser = db.prepare("SELECT id FROM User WHERE email = ?").get(email);
      if (existingUser) {
        return res.status(409).json({ error: "User with this email already exists" });
      }

      // Hash password using Node.js built-in crypto
      const hashedPassword = createHash('sha256').update(password).digest('hex');
      
      const stmt = db.prepare("INSERT INTO User (email, name, password) VALUES (?, ?, ?)");
      const result = stmt.run(email, name || "User", hashedPassword);
      
      const user = db.prepare("SELECT id, email, name FROM User WHERE id = ?").get(result.lastInsertRowid);
      
      res.status(201).json(user);
    } catch (error) {
      console.error("SIGNUP_ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // User Login - POST /api/login
  router.post("/login", (req, res) => {
    try {
      const { email, password } = req.body || {};
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = db.prepare("SELECT * FROM User WHERE email = ?").get(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Hash the provided password and compare with stored hash
      const hashedPassword = createHash('sha256').update(password).digest('hex');
      if (hashedPassword !== user.password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Return user without password
      res.status(200).json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      console.error("LOGIN_ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}