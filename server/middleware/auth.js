export const requireLogin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: "You must be logged in to comment." });
  }

  try {
    // Call the Main Site API to ensure the token is still valid
    const verifyResponse = await fetch("https://mainsite.com/api/auth/verify-token", {
      method: "GET",
      headers: { 
        "Authorization": authHeader,
        "Content-Type": "application/json" 
      }
    });

    if (!verifyResponse.ok) {
      return res.status(401).json({ error: "Invalid or expired session." });
    }

    const { user } = await verifyResponse.json();

    // Attach the user's local ID to the request object so the comment route can use it
    // (Assuming the database is accessible in this file or imported)
    const { db } = await import("../index.js"); 
    const localUser = db.prepare("SELECT id, role FROM User WHERE email = ?").get(user.email);

    if (!localUser) {
      return res.status(401).json({ error: "User sync error." });
    }

    req.user = localUser; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(500).json({ error: "Failed to verify session." });
  }
};