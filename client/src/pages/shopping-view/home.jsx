// ✅ File: src/pages/shop/ShoppingHome.jsx
import { Button } from "@/components/ui/button";
import {
  CakeSlice,
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideCoffee,
  MilkIcon,
  Moon,
  Star,
  Sun,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "/store/shop/products-slice";
import { addToCart, fetchCartItems } from "/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "/store/common/common-slice";
import { fetchBlogs } from "/store/admin/blog-slice"; // ✅ fetch blogs
import videoSource from "../../assets/coffeeshop.mp4";
import imageVideo from "../../assets/videoimage.jpg";
import img1 from "../../assets/image/about-img.png";
import img2 from "../../assets/image/about-icon-1.png";
import img3 from "../../assets/image/about-icon-2.png";
import img4 from "../../assets/image/about-icon-3.png";
import "../../css/home.css";
import "../../css/video.css";
import KommunicateChat from "../../components/common/KommunicateChat";
import { useTheme } from "../../context/theme-context";
import "./../../css/toggle.css";
import VoucherList from "../../components/shopping-view/voucherList";
import { Helmet } from "react-helmet";
import LoginRequiredDialog from "@/components/common/login-required-dialog";
import LanguageSwitcher from "@/components/common/language-switcher";
import { useLanguage } from "@/context/language-context";


const categories = [
  { id: "traSua", labelKey: "milkTea", icon: MilkIcon },
  { id: "caPhe", labelKey: "coffee", icon: LucideCoffee },
  { id: "banhNgot", labelKey: "cake", icon: CakeSlice },
  { id: "daXay", labelKey: "blended", icon: LucideCoffee },
  { id: "true", filterKey: "isBestSeller", labelKey: "bestSeller", icon: Star },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isSaleDragging, setIsSaleDragging] = useState(false);
  const saleProductsRef = useRef(null);
  const saleDragRef = useRef({
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.adminBlog); // ✅ lấy blog từ store
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(getFeatureImages());
    dispatch(fetchBlogs()); // ✅ fetch blogs
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: { category: [] },
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  function handleNavigateToListingPage(item, section) {
    const filterKey = item.filterKey || section;
    sessionStorage.setItem("filters", JSON.stringify({ [filterKey]: [item.id] }));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleAddtoCart(productId, totalStock) {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    const items = cartItems.items || [];
    const existing = items.find((i) => i.productId === productId);
    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Chỉ còn ${existing.quantity} sản phẩm cho mặt hàng này`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(
      (res) => {
        if (res?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Đã thêm vào giỏ hàng" });
        }
      }
    );
  }

  useEffect(() => {
    setOpenDetailsDialog(Boolean(productDetails));
  }, [productDetails]);

  const handleReadMore = () => navigate("/shop/about");

  function handleSalePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    saleDragRef.current = {
      startX: event.clientX,
      startScrollLeft: saleProductsRef.current.scrollLeft,
      moved: false,
    };
    setIsSaleDragging(true);
  }

  function handleSalePointerMove(event) {
    if (!saleProductsRef.current || !saleDragRef.current.startX) return;

    const distance = event.clientX - saleDragRef.current.startX;
    if (Math.abs(distance) > 4) {
      saleDragRef.current.moved = true;
    }
    saleProductsRef.current.scrollLeft =
      saleDragRef.current.startScrollLeft - distance;
  }

  function handleSalePointerUp(event) {
    setIsSaleDragging(false);
  }

  function handleSaleCardClick(event, productId) {
    if (saleDragRef.current.moved) {
      event.preventDefault();
      saleDragRef.current.moved = false;
      return;
    }
    handleGetProductDetails(productId);
  }

  const isHomePage = true;

  return (
    <>
    <Helmet>
        {/* SEO cơ bản */}
        <title>The Coffee Shop - Cà phê nguyên chất, đậm vị Việt</title>
        <meta name="description" content="Khám phá thế giới cà phê nguyên chất, rang xay thủ công và giao tận nơi từ The Coffee Shop." />
        <meta name="keywords" content="cà phê, coffee, the coffee shop, cà phê nguyên chất, cafe online" />
        <meta name="author" content="The Coffee Shop Team" />

        {/* Open Graph (Facebook, Zalo...) */}
        <meta property="og:title" content="The Coffee Shop - Cà phê nguyên chất chuẩn vị Việt" />
        <meta property="og:description" content="Khám phá các dòng cà phê rang xay, cold brew và phụ kiện cà phê chất lượng cao." />
        <meta property="og:image" content="https://yourdomain.com/images/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="The Coffee Shop" />
      </Helmet>
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header: Dark Mode Toggle */}
      <header className="p-4 flex justify-between items-center">
        <div />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <div className="toggle-container">
            <input
              type="checkbox"
              id="switch"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <label htmlFor="switch" className="toggle-label">
              <span className="toggle-circle">
                {isDarkMode ? (
                  <Moon color="#3e1e94" strokeWidth={2.5} />
                ) : (
                  <Sun color="#f5b151" strokeWidth={2.5} />
                )}
              </span>
              <span className="toggle-names">
                <p className="sun"></p>
                <p className="moon"></p>
              </span>
            </label>
          </div>
        </div>
      </header>
      {/* Slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList.map((slide, idx) => (
          <img
            key={idx}
            src={slide?.image}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                (prev - 1 + featureImageList.length) % featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 bg-white/80"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 bg-white/80"
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <div>
        <VoucherList />
      </div>

      {/* Categories */}
      <section className="py-12 bg-gray-50  dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-9xl uppercase text-custom-gray text-center relative mb-10">
            {t("categoriesTitle")}
            <span className="absolute italic top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#A67C6D] font-bold">
              {t("productsTitle")}
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat.filterKey || cat.id}
                onClick={() => handleNavigateToListingPage(cat, "category")}
                className="cursor-pointer"
              >
                <CardContent className="flex flex-col items-center p-6">
                  <cat.icon className="w-12 h-12 text-primary mb-2" />
                  <span className="font-bold dark:text-white">{t(cat.labelKey)}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best seller */}
      <section className="py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-9xl uppercase text-custom-gray text-center relative mb-10 dark:text-white">
            {t("productsTitle")}
            <span className="absolute italic top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#A67C6D] font-bold">
              Best seller
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList
              .filter((item) => item.isBestSeller === true)
              .map((product) => (
                <ShoppingProductTile
                  key={product._id}
                  product={product}
                  handleAddtoCart={handleAddtoCart}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm khuyến mãi */}
      <section className="py-16 bg-[#fefefe] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-7xl md:text-9xl uppercase text-custom-gray text-center relative mb-16 dark:text-white">
            {t("promotion")}
            <span className="absolute italic top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-4xl text-[#A67C6D] font-bold">
              {t("hotDeal")}
            </span>
          </h2>

          <div
            ref={saleProductsRef}
            className={`overflow-x-auto scrollbar-hide select-none ${
              isSaleDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={handleSalePointerDown}
            onPointerMove={handleSalePointerMove}
            onPointerUp={handleSalePointerUp}
            onPointerCancel={handleSalePointerUp}
          >
            <div className="flex gap-8 w-max px-4 snap-x snap-mandatory">
              {productList
                .filter((item) => item.salePrice > 0 && !item.isBestSeller)
                .map((product) => (
                  <div
                    key={product._id}
                    className="snap-start transition-transform duration-300 hover:scale-[1.03] min-w-[300px] max-w-[300px]"
                  >
                    <div
                      className="h-full flex flex-col bg-white dark:bg-gray-800 border rounded-2xl shadow hover:shadow-xl cursor-pointer overflow-hidden"
                      onClick={(event) =>
                        handleSaleCardClick(event, product._id)
                      }
                    >
                      <div className="relative group w-full h-[220px] overflow-hidden rounded-t-2xl">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold line-clamp-2 text-[#333] dark:text-white">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-red-500 font-bold text-lg">
                            {product.salePrice.toLocaleString()}₫
                          </span>
                          <span className="line-through text-gray-400 dark:text-gray-300 text-sm">
                            {product.price.toLocaleString()}₫
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {Number(product.totalStock) <= 0 ? (
                            <Button className="btnOOS flex-1 opacity-60 cursor-not-allowed">
                              {t("soldOut")}
                            </Button>
                          ) : (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (saleDragRef.current.moved) {
                                  e.preventDefault();
                                  saleDragRef.current.moved = false;
                                  return;
                                }
                                handleAddtoCart(product._id, product.totalStock);
                              }}
                              className="btn flex-1"
                            >
                              {t("add")}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (saleDragRef.current.moved) return;
                              handleGetProductDetails(product._id);
                            }}
                            className="flex-1"
                          >
                            {t("viewDetails")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="digital py-12 dark:bg-gray-800">
        <div className="container">
          <div className="digital_title">
            <p className="sub_title">{t("ourCoffee")}</p>
            <h2 className="text-6xl font-bold text-center m-10 text-[#A67C6D]">
              {t("coffeeExperience")}
            </h2>
            <p>
              {t("coffeeExperienceText")}
            </p>
          </div>
          <div className="digital_content">
            <video
              poster={imageVideo}
              muted
              controls
              preload="auto"
              autoPlay
              src={videoSource}
              onError={(e) => {
                console.error("Video failed to load:", e);
              }}
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col min-h-screen dark:bg-gray-800">
        <div className="p-10">
          <section className="about" id="about">
            <h1 className="heading">
              {t("aboutSection")}{" "}
              <span className="text-[#A67C6D] font-bold">{t("whyChooseUs")}</span>
            </h1>
            <div className="row">
              <div className="image">
                <img src={img1} alt="" />
              </div>
              <div className="content">
                <h3 className="title">{t("aboutTitle")}</h3>
                <p>
                  {t("aboutText")}
                </p>
                {isHomePage && (
                  <button onClick={handleReadMore} className="btn">
                    {t("readMore")}
                  </button>
                )}
                <div className="icons-container">
                  <div className="icons">
                    <img src={img2} alt="" />
                    <h3>{t("qualityCoffee")}</h3>
                  </div>
                  <div className="icons">
                    <img src={img3} alt="" />
                    <h3>{t("ourBranches")}</h3>
                  </div>
                  <div className="icons">
                    <img src={img4} alt="" />
                    <h3>{t("freeDelivery")}</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Blog Section */}
      <section className="py-12 bg-[#FFF8F0] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-9xl uppercase text-custom-gray text-center relative mb-10 dark:text-white">
            {t("news")}
            <span className="absolute italic top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#A67C6D] font-bold">
              Blog
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/shop/blog/${blog._id}`)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                    {new Date(blog.createdAt || blog.date).toLocaleDateString()}
                  </p>
                  <h3 className="font-bold text-lg mb-2 truncate dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {blog.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => navigate("/shop/blog")}
              className="bg-[#A67C6D] text-white px-6 py-2 rounded-full"
            >
              {t("readMoreArticles")}
            </Button>
          </div>
        </div>
      </section>

      {/* Product Detail Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <LoginRequiredDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
      {/* <Chatbot /> */}
      <div className="">
        <KommunicateChat />
      </div>
    </div>
    </>
  );
}

export default ShoppingHome;
