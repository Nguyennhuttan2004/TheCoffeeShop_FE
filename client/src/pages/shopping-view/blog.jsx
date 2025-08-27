import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
  const response = await axios.get("https://thecoffeeshop-server.onrender.com/api/admin/blog");
        if (response.data.success && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách blog:", error);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-[#FFF8F0] dark:bg-gray-900 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-[#A67C6D] uppercase dark:text-white">
          Blog & Tin Tức
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`${post._id}`)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {new Date(post.createdAt || post.date).toLocaleDateString()}
                </p>
                <h2 className="text-lg font-bold mb-2 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-12 gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#A67C6D] text-white rounded-full hover:bg-[#8b6554] disabled:opacity-50"
          >
            Trang trước
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#A67C6D] text-white rounded-full hover:bg-[#8b6554] disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
        <p className="text-center mt-4 text-gray-500 dark:text-gray-300">
          Trang {currentPage} / {totalPages}
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
