import { Router } from 'express';

const router = Router();

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export function setupPostRoutes(db) {
  // Posts API - GET all posts (with optional category filter and sort)
  router.get("/", (req, res) => {
    const { category, sort = "newest" } = req.query;
    
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
    
    res.status(200).json(formattedPosts);
  });

  // Posts API - GET single post by slug
  router.get("/:slug", (req, res) => {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    
    const post = db.prepare(`
      SELECT p.*, u.name as authorName 
      FROM Post p 
      JOIN User u ON p.authorId = u.id
      WHERE p.slug = ?
    `).get(slug);
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    // Format post to include date field for frontend compatibility
    const formattedPost = {
      ...post,
      date: post.createdAt, // Add date alias for frontend compatibility
      author: { name: post.authorName }
    };
    
    res.status(200).json(formattedPost);
  });

  // Posts API - PUT (update) single post by slug
  router.put("/:slug", (req, res) => {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    
    try {
      const { title, content, category, gradient, published } = req.body || {};
      
      // Check if post exists
      const existingPost = db.prepare("SELECT id FROM Post WHERE slug = ?").get(slug);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
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
      
      res.status(200).json({
        ...updatedPost,
        date: updatedPost.createdAt,
        author: { name: updatedPost.authorName }
      });
    } catch (error) {
      console.error("PUT_POST_ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Posts API - DELETE single post by slug
  router.delete("/:slug", (req, res) => {
    const { slug } = req.params;
    
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }
    
    // Check if post exists
    const existingPost = db.prepare("SELECT id FROM Post WHERE slug = ?").get(slug);
    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    db.prepare("DELETE FROM Post WHERE slug = ?").run(slug);
    
    res.status(200).json({ message: "Post deleted successfully", slug });
  });

  // Legacy Posts API - POST (keep for backward compatibility)
  router.post("/legacy", (req, res) => {
    try {
      const { title, content, authorId, category, gradient } = req.body || {};
      
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
        author: { name: newPost.authorId } // Simplified for legacy
      });
    } catch (error) {
      console.error("POST_API_ERROR:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  return router;
}