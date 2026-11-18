import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { BadgePercent, Coffee } from "lucide-react";
import { fetchAvailableVouchers } from "/store/admin/voucher-slice";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/language-context";

const VoucherList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vouchers, isLoading } = useSelector((state) => state.adminVoucher);
  const { language, t } = useLanguage();

  useEffect(() => {
    dispatch(fetchAvailableVouchers());
  }, [dispatch]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: language === "en" ? "🎉 Code copied!" : "🎉 Đã sao chép mã!",
      description: language === "en"
        ? `Copied "${code}" to the clipboard.`
        : `Bạn đã sao chép mã "${code}" vào clipboard.`,
    });
  };

  return (
    <div className="bg-[#fffaf4] dark:bg-[#1c1c1c] p-8 rounded-3xl shadow-xl mt-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#A67C6D] dark:text-[#e5c1b1] flex items-center gap-3">
          <BadgePercent className="w-7 h-7" /> {t("discountCodes")}
        </h2>
        <button
          onClick={() => navigate("/shop/voucher")}
          className="text-sm text-white bg-[#A67C6D] hover:bg-[#8b6658] px-4 py-2 rounded-full transition-all"
        >
          🎁 {t("receiveVoucher")}
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">{t("loadingVouchers")}</p>
      ) : vouchers.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouchers.map((v) => (
            <li
              key={v._id}
              className="relative border border-[#e0d6cf] dark:border-[#3a3a3a] bg-gradient-to-br from-[#fffdf8] to-[#f8efe6] dark:from-[#292929] dark:to-[#1f1f1f] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2">
                <Coffee className="w-6 h-6 text-[#c1a289] dark:text-[#e0bda9]" />
              </div>
              <div className="mb-3">
                <span className="text-xl font-bold text-[#A67C6D] dark:text-[#e0bda9] block">
                  {v.code}
                </span>
              </div>
              <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                {v.type === "percent"
                  ? language === "en"
                    ? `${v.value}% off (${t("maxDiscount")} ${v.maxDiscount.toLocaleString()}₫)`
                    : `Giảm ${v.value}% (${t("maxDiscount")} ${v.maxDiscount.toLocaleString()}₫)`
                  : language === "en"
                    ? `${v.value.toLocaleString()}₫ off`
                    : `Giảm ${v.value.toLocaleString()}₫`}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>
                  {t("expiry")}: {v.expiredAt ? new Date(v.expiredAt).toLocaleDateString(language === "en" ? "en-US" : "vi-VN") : t("unlimited")}
                </span>
                <button
                  onClick={() => handleCopyCode(v.code)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("copy")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">{t("noVouchers")}</p>
      )}
    </div>
  );
};

export default VoucherList;
