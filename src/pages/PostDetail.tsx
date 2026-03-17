import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // If you're still using mock data, you can find the post in mockPosts
    // Once the backend is fully wired, this fetch will work:
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [slug]);

  if (!post) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Date and Category Style from OpenAI */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 uppercase tracking-widest font-bold">
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span className="text-gray-300">{post.category}</span>
        </div>

        <h1 className="text-6xl font-bold mb-10 leading-tight">{post.title}</h1>

        <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-sm mb-16 hover:bg-white/10 transition-all">
          Read the report ↗
        </button>

        <div className="prose prose-invert text-gray-400 text-xl leading-relaxed">
          {post.content || "Transmission content encrypted or unavailable."}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;