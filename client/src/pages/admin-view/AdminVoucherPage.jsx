import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  fetchVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "/store/admin/voucher-slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  code: yup.string().required("Mã voucher không được bỏ trống"),
  type: yup.string().oneOf(["percent", "fixed"]).required("Vui lòng chọn loại"),
  value: yup
    .number()
    .typeError("Giá trị phải là số")
    .min(1, "Giá trị tối thiểu là 1")
    .required("Giá trị giảm giá là bắt buộc"),
  minOrderAmount: yup
    .number()
    .typeError("Tối thiểu đơn hàng phải là số")
    .min(0, "Không được âm")
    .required("Tối thiểu đơn hàng là bắt buộc"),
  maxDiscount: yup
    .number()
    .typeError("Giảm tối đa phải là số")
    .when("type", {
      is: "percent",
      then: (schema) => schema.required("Bắt buộc khi giảm theo %"),
      otherwise: (schema) => schema.strip(true),
    }),
  expiredAt: yup
    .date()
    .nullable()
    .min(new Date(), "Không thể chọn ngày trong quá khứ")
    .required("Vui lòng chọn ngày hết hạn"),
  isActive: yup.boolean(),
});

const AdminVoucherPage = () => {
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.adminVoucher);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const type = watch("type");

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await dispatch(updateVoucher({ id: editingId, data }));
        toast({ title: "🎉 Cập nhật voucher thành công!" });
      } else {
        await dispatch(createVoucher(data));
        toast({ title: "🎉 Tạo voucher mới thành công!" });
      }
      reset();
      setEditingId(null);
    } catch {
      toast({ title: "❌ Lỗi khi lưu voucher!", variant: "destructive" });
    }
  };

  const handleEdit = (v) => {
    reset({
      ...v,
      expiredAt: v.expiredAt
        ? new Date(v.expiredAt).toISOString().slice(0, 10)
        : "",
    });
    setEditingId(v._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá?")) return;
    try {
      await dispatch(deleteVoucher(id));
      toast({ title: "🗑️ Xoá voucher thành công!" });
    } catch {
      toast({ title: "❌ Lỗi khi xoá!", variant: "destructive" });
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎟️ Quản lý Voucher</h1>

      {/* Form tạo/sửa voucher */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <p className="text-gray-600 text-sm mb-2 font-semibold">
          📝 <strong>Hướng dẫn:</strong> Nhập mã voucher (ví dụ:{" "}
          <code>GIAM10</code>), chọn loại giảm giá, thiết lập giá trị, điều kiện
          tối thiểu đơn hàng, hạn sử dụng và bật/tắt trạng thái hoạt động.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Mã voucher (ví dụ: GIAM10)"
              {...register("code")}
            />
            {errors.code && (
              <p className="text-red-500 text-sm col-span-2">
                {errors.code.message}
              </p>
            )}

            {/* **Loại giảm giá: phần trăm hoặc số tiền cố định** */}
            <select className="border p-2 rounded" {...register("type")}>
              <option value="" disabled hidden>
                -- Vui lòng chọn loại giảm giá --
              </option>
              <option value="percent">Giảm theo %</option>
              <option value="fixed">Giảm cố định (VNĐ)</option>
            </select>

            {/* **Giá trị: 10 nghĩa là 10% hoặc 10000 VNĐ tuỳ theo loại** */}
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Giá trị giảm (VD: 10 hoặc 10000)"
                {...register("value")}
              />
              <p className="text-xs text-gray-500 mt-1 ml-1 font-semibold">
                Nếu là giảm theo %, nhập số như 10 (tức giảm 10%). Nếu là giảm
                cố định, nhập số tiền như 10000₫.
              </p>
              {errors.value && (
                <p className="text-red-500 text-sm">{errors.value.message}</p>
              )}
            </div>

            {/* **Điều kiện áp dụng: đơn hàng tối thiểu** */}
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Tối thiểu đơn hàng (VD: 100000)"
                {...register("minOrderAmount")}
              />
              <p className="text-xs text-gray-500 mt-1 ml-1 font-semibold">
                Đây là số tiền tối thiểu mà đơn hàng cần đạt để áp dụng voucher
                này. Ví dụ: 100000₫.
              </p>
              {errors.minOrderAmount && (
                <p className="text-red-500 text-sm">
                  {errors.minOrderAmount.message}
                </p>
              )}
            </div>

            {/* **Giảm tối đa: chỉ hiển thị nếu chọn loại phần trăm** */}
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Giảm tối đa (chỉ dùng với %)"
                {...register("maxDiscount")}
                disabled={type !== "percent"}
              />
              <p className="text-xs text-gray-500 mt-1 ml-1 font-semibold">
                Số tiền tối đa được giảm khi áp dụng phần trăm. Trường này sẽ bị
                khoá nếu chọn giảm cố định.
              </p>
              {errors.maxDiscount && (
                <p className="text-red-500 text-sm">
                  {errors.maxDiscount.message}
                </p>
              )}
            </div>

            {/* **Ngày hết hạn của voucher** */}
            <Input
              type="date"
              {...register("expiredAt")}
              min={new Date().toISOString().split("T")[0]} // Giới hạn ngày tối thiểu là hôm nay
            />

            {/* **Trạng thái: đang hoạt động hay không** */}
            <label className="flex items-center gap-2 col-span-2 mt-2 font-semibold">
              <input type="checkbox" {...register("isActive")} /> Đang hoạt động
              (Bỏ chọn để tạm dừng mã)
            </label>
          </div>
          <Button type="submit" className="mt-4 ">
            {editingId ? "Cập nhật voucher" : "Tạo mới voucher"}
          </Button>
        </form>
      </div>

      {/* Danh sách voucher */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">📃 Danh sách Voucher</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b font-semibold">
                <th>Mã</th>
                <th>Loại</th>
                <th>Giá trị</th>
                <th>Min Order</th>
                <th>Hạn</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v._id} className="border-b">
                  <td>{v.code}</td>
                  <td>{v.type}</td>
                  <td>
                    {v.type === "percent"
                      ? `${v.value}% (max ${v.maxDiscount.toLocaleString()}₫)`
                      : `${v.value.toLocaleString()}₫`}
                  </td>
                  <td>{v.minOrderAmount.toLocaleString()}₫</td>
                  <td>
                    {v.expiredAt
                      ? new Date(v.expiredAt).toLocaleDateString()
                      : "Không"}
                  </td>
                  <td
                    className={v.isActive ? "text-green-600" : "text-red-500"}
                  >
                    {v.isActive ? "Hoạt động" : "Tắt"}
                  </td>
                  <td className="space-x-2  ">
                    <Button className="bg-blue-500 hover:bg-blue-600" size="sm" onClick={() => handleEdit(v)}>
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(v._id)}
                    >
                      Xoá
                    </Button>
                  </td>
                </tr>
              ))}
              {!vouchers.length && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    Không có voucher nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVoucherPage;
