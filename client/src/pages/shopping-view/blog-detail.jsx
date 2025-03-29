import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogDetail,
  clearSelectedBlog,
  fetchBlogs,
} from "/store/admin/blog-slice";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedBlog, blogs, isLoading, error } = useSelector(
    (state) => state.adminBlog
  );

  useEffect(() => {
    dispatch(clearSelectedBlog());
    dispatch(fetchBlogDetail(id));
    dispatch(fetchBlogs());
  }, [dispatch, id]);

  if (isLoading || !selectedBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Đang tải bài viết...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0] dark:bg-gray-900">
        <p className="text-lg text-red-500">Không tìm thấy bài viết.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#A67C6D] text-white rounded hover:bg-[#8b6554]"
        >
          Quay lại
        </button>
      </div>
    );
  }

  const { title, image, content, createdAt } = selectedBlog;

  const recentPosts = blogs
    .filter((b) => b._id !== id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="bg-[#FFF8F0] dark:bg-gray-900 min-h-screen pt-10 pb-20">
      {/* Ảnh banner */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <img
          src={image}
          alt={title}
          className="w-full max-h-[500px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Nội dung bài viết */}
      <div className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#A67C6D] mb-6">
          {title}
        </h1>
        <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-justify">
          {content}
        </div>
      </div>

      {/* Gợi ý bài viết mới nhất */}
      {recentPosts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-20 px-6">
          <h2 className="text-2xl font-semibold text-[#A67C6D] mb-6 dark:text-white">
            Bài viết mới nhất
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/shop/blog/${post._id}`)}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#A67C6D] dark:text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                    {post.content}
                  </p>
                  <button className="mt-4 text-[#A67C6D] dark:text-white hover:underline text-sm">
                    Xem thêm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
