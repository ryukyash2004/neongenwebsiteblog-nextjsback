"use client";

import React, { useState } from 'react';
import StarField from '@/components/StarField';
import SpaceElements from '@/components/SpaceElements';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  category: string;
  date: string;
  gradient: string; 
  slug: string;      
  createdAt: string;
  content?: string;
}

// I added a few more dates here so we can actually see the sorting work!
const mockPosts: Post[] = [
  { id: 1, title: "Introducing Neon AI", category: "Company", date: "2024-06-01", gradient: "from-purple-500 to-pink-500", slug: "introducing-neon-ai", createdAt: "2024-06-01T12:00:00Z" },
  { id: 2, title: "Neon Research Update", category: "Research", date: "2024-05-15", gradient: "from-blue-500 to-green-500", slug: "neon-research-update", createdAt: "2024-05-15T09:30:00Z" },
  { id: 3, title: "Neon Product Launch", category: "Product", date: "2024-04-20", gradient: "from-yellow-500 to-red-500", slug: "neon-product-launch", createdAt: "2024-04-20T14:45:00Z" },
  { id: 4, title: "Neon Security Enhancements", category: "Security", date: "2024-03-10", gradient: "from-green-500 to-teal-500", slug: "neon-security-enhancements", createdAt: "2024-03-10T08:15:00Z" },
  { id: 5, title: "Neon Engineering Insights", category: "Engineering", date: "2024-02-05", gradient: "from-red-500 to-orange-500", slug: "neon-engineering-insights", createdAt: "2024-02-05T16:00:00Z" },
  { id: 6, title: "Neon in the News", category: "Company", date: "2024-01-25", gradient: "from-purple-500 to-pink-500", slug: "neon-in-the-news", createdAt: "2024-01-25T11:30:00Z" },
];

const categories = ["Company", "Research", "Product", "Security", "Engineering", "All"];
const sidebarLinks = ["Research", "Safety", "For Business", "For Developers", "Company", "News"];

const News = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  //  1. FILTER: Only keep posts that match the active category
  const filteredPosts = mockPosts.filter((post) => 
    activeCategory === "All" ? true : post.category === activeCategory
  );

  //  2. SORT: Arrange the remaining posts by date
  const sortedAndFilteredPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-[50vh] bg-gradient-to-b from-white/5 to-transparent blur-3xl" />
        <StarField />
        <SpaceElements />
      </div>

      <aside className="hidden lg:flex flex-col w-64 pt-32 px-8 border-r border-white/10 z-10 relative">
        <div className="mb-12 font-bold text-xl tracking-wider">Neon</div>
        <nav className="flex flex-col space-y-4">
          {sidebarLinks.map((link) => (
            <button key={link} className={`text-left text-sm font-medium transition-colors ${link === 'News' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              {link}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 pt-32 px-6 md:px-12 lg:px-24 z-10 relative pb-32">
        <div className="max-w-6xl mx-auto">
          
          <motion.h1 
            key={activeCategory} // This forces the animation to replay when category changes!
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-medium mb-12 tracking-tight"
          >
            {activeCategory === "All" ? "All News" : activeCategory}
          </motion.h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-12 gap-6">
            
            {/* Horizontal Category Filters */}
            <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-gray-400">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors ${activeCategory === cat ? 'text-white' : 'hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/*  Real Sort Dropdown */}
            <div className="flex space-x-6 text-sm font-medium text-gray-400 relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="hover:text-white flex items-center gap-2"
              >
                Sort: {sortOrder === 'newest' ? 'Newest' : 'Oldest'} <span className="text-xs">{isSortOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown Menu Box */}
              {isSortOpen && (
                <div className="absolute right-0 top-8 mt-2 w-40 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                  <button 
                    onClick={() => { setSortOrder('newest'); setIsSortOpen(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${sortOrder === 'newest' ? 'text-white bg-white/5' : ''}`}
                  >
                    Newest first
                  </button>
                  <button 
                    onClick={() => { setSortOrder('oldest'); setIsSortOpen(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${sortOrder === 'oldest' ? 'text-white bg-white/5' : ''}`}
                  >
                    Oldest first
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Render the SORTED and FILTERED posts */}
          <motion.div 
            layout // This makes Framer Motion smoothly animate items reordering!
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
          >
            {sortedAndFilteredPosts.length > 0 ? (
            sortedAndFilteredPosts.map((post) => (
                <Link
                to={`/post/${post.slug || 'no-slug'}`}
                key={post.id}
                className="group flex flex-col no-underline"
                >
                <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                >
                    {/* Visual Card (OpenAI Style) */}
                    <div className="w-full aspect-square mb-6 overflow-hidden bg-white/5 rounded-sm relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient || 'from-gray-700 to-gray-900'} opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl" />
                    </div>
                    </div>

                    {/* Transmission Title */}
                    <h3 className="text-xl md:text-2xl font-medium leading-tight mb-4 group-hover:underline decoration-1 underline-offset-4 text-white">
                    {post.title}
                    </h3>
                    
                    {/* Transmission Metadata */}
                    <div className="mt-auto flex items-center space-x-3 text-sm text-gray-400 font-medium">
                    <span className="text-white">{post.category}</span>
                    {/* Fallback to createdAt if post.date is missing */}
                    <span>{post.date || new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                    </div>
                </motion.div>
                </Link>
            ))
            ) : (
            <div className="col-span-full py-20 text-center text-gray-500 italic">
                No transmissions found in this category.
            </div>
            )}
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default News;