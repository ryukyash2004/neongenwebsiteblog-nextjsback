import express from "express";

export const setupAuthRoutes = (db) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      // 1. Call the Main Site API to verify credentials
      // Replace with your actual main site URL
      const mainSiteResponse = await fetch("https://mainsite.com/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!mainSiteResponse.ok) {
        return res.status(401).json({ error: "Invalid credentials on main site." });
      }

      // 2. Parse the authenticated user data and token from the Main Site
      const { user, token } = await mainSiteResponse.json();

      // 3. Upsert (Update or Insert) the user in the local Blog database.
      // We need them in the local DB so we can assign an 'authorId' to their comments.
      const stmt = db.prepare(`
        INSERT INTO User (email, name) 
        VALUES (?, ?) 
        ON CONFLICT(email) DO UPDATE SET 
        name = excluded.name
      `);
      stmt.run(user.email, user.name);

      // Fetch the local user ID to use for comments
      const localUser = db.prepare("SELECT id, email, name FROM User WHERE email = ?").get(user.email);

      // 4. Send the successful response back to the Blog frontend
      res.status(200).json({ 
        user: localUser, 
        token: token // Pass the token to the frontend so it can be used for subsequent requests
      });

    } catch (error) {
      console.error("SSO Login Error:", error);
      res.status(500).json({ error: "Internal server error during authentication" });
    }
  });

  return router;
};