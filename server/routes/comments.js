import express from "express";
import { requireLogin } from "../middleware/auth.js";

export const setupCommentRoutes = (db) => {
  const router = express.Router();

  // PUBLIC: Anyone can view comments
  router.get("/:postId", (req, res) => {
    // ... logic to GET comments ...
  });

  // PROTECTED: Only authenticated users can post comments
  router.post("/:postId", requireLogin, (req, res) => {
    try {
      const { content } = req.body;
      const authorId = req.user.id; // Comes from our SSO middleware
      const postId = req.params.postId;

      const stmt = db.prepare(`
        INSERT INTO Comment (content, postId, authorId) 
        VALUES (?, ?, ?)
      `);
      
      const result = stmt.run(content, postId, authorId);
      const newComment = db.prepare("SELECT * FROM Comment WHERE id = ?").get(result.lastInsertRowid);
      
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "Failed to post comment" });
    }
  });

  return router;
};