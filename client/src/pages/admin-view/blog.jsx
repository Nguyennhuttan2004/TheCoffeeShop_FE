// ✅ File: src/pages/admin-view/AdminBlogPage.jsx
import { Fragment, useEffect, useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import ProductImageUpLoad from "@/components/admin-view/image-upload";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "/store/admin/blog-slice";
import CommonForm from "@/components/common/form";

const initialFormData = {
  title: "",
  content: "",
  image: "",
};

function AdminBlogPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.adminBlog);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      image: uploadedImageUrl || formData.image,
    };

    if (currentEditedId) {
      dispatch(updateBlog({ id: currentEditedId, formData: payload })).then((res) => {
        if (res?.payload?.success) {
          toast({ title: "Cập nhật blog thành công" });
          closeDialog();
          dispatch(fetchBlogs());
        }
      });
    } else {
      dispatch(createBlog(payload)).then((res) => {
        if (res?.payload?.success) {
          toast({ title: "Thêm blog mới thành công" });
          closeDialog();
          dispatch(fetchBlogs());
        }
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá bài viết này?")) {
      dispatch(deleteBlog(id)).then((res) => {
        if (res?.payload?.success) {
          toast({ title: "Xoá blog thành công" });
          dispatch(fetchBlogs());
        }
      });
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
    });
    setUploadedImageUrl(blog.image);
    setCurrentEditedId(blog._id);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setFormData(initialFormData);
    setUploadedImageUrl("");
    setImageFile(null);
    setCurrentEditedId(null);
    setOpenDialog(false);
  };

  const isFormValid = () => {
    return formData.title && formData.content && (uploadedImageUrl || formData.image);
  };

  return (
    <Fragment>
      <div className="mb-5 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#A67C6D]">Quản lý Blog</h2>
          <Button onClick={() => setOpenDialog(true)} className="btn bg-[#A67C6D] text-white">
            Thêm bài viết mới
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-4 rounded shadow">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(blog.createdAt || blog.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 line-clamp-3 mb-2">{blog.content}</p>
              <div className="flex gap-2">
                <Button onClick={() => handleEdit(blog)} className="bg-blue-500 text-white hover:bg-blue-600">
                  Sửa
                </Button>
                <Button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white hover:bg-red-600">
                  Xoá
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Không có bài viết nào.</p>
        )}
      </div>

      <Sheet open={openDialog} onOpenChange={closeDialog}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currentEditedId ? "Chỉnh sửa Blog" : "Thêm Blog mới"}</SheetTitle>
          </SheetHeader>

          <ProductImageUpLoad
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
            uploadEndpoint="/admin/blog/upload-image"
          />

          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={[
                { name: "title", label: "Tiêu đề", type: "text" },
                { name: "content", label: "Nội dung", type: "textarea" },
              ]}
              buttonText={currentEditedId ? "Cập nhật" : "Thêm"}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminBlogPage;
