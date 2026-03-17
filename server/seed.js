import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to the existing dev database
const dbPath = join(__dirname, "database", "dev.db");
const db = new Database(dbPath);

console.log("Seeding database...");

try {
  // 1. Create Mock Users
  const insertUser = db.prepare(`
    INSERT INTO User (email, name, password, role) 
    VALUES (?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET role = excluded.role
  `);

  const adminResult = insertUser.run("admin@neon.com", "Neon Admin", "mockpass", "admin");
  const devResult = insertUser.run("dev@neon.com", "Neon Dev", "mockpass", "dev");
  const userResult = insertUser.run("user@example.com", "Regular User", "mockpass", "user");

  const adminId = db.prepare("SELECT id FROM User WHERE email = 'admin@neon.com'").get().id;
  const devId = db.prepare("SELECT id FROM User WHERE email = 'dev@neon.com'").get().id;

  // 2. Create Mock Posts
  const insertPost = db.prepare(`
    INSERT INTO Post (title, slug, content, category, gradient, published, authorId, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Clear existing posts to prevent slug conflicts during testing (optional)
  db.exec("DELETE FROM Post");

  insertPost.run(
    "Welcome to the Neon Next-Gen Dev Blog",
    "welcome-to-neon",
    "This is the official dev blog where we post updates, fixes, and announcements about the main system. Stay tuned!",
    "Announcements",
    "from-purple-500 to-pink-500",
    1,
    adminId,
    new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
  );

  insertPost.run(
    "Patch Notes v2.1.0: Database Optimizations",
    "patch-notes-v2-1-0",
    "In this patch, we migrated our main database queries to be 40% faster. We also fixed the concurrent login bug that users were experiencing over the weekend.",
    "Engineering",
    "from-blue-500 to-cyan-400",
    1,
    devId,
    new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
  );

  insertPost.run(
    "Upcoming Feature: Cross-Platform Login",
    "upcoming-feature-sso",
    "We are currently working on a Single Sign-On (SSO) approach so you can use your main site credentials to log in here and leave comments. Let us know what you think!",
    "Roadmap",
    "from-emerald-400 to-cyan-400",
    1,
    devId,
    new Date().toISOString() // Today
  );

  console.log("✅ Database seeded successfully!");
  console.log("Mock Users created: admin@neon.com, dev@neon.com, user@example.com");
  console.log("Mock Posts added: 3");

} catch (error) {
  console.error("❌ Error seeding database:", error);
} finally {
  db.close();
}