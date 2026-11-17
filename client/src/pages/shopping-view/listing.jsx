import Productfilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ReactPaginate from "react-paginate";
import "./../../css/pagination.css";
import LoginRequiredDialog from "@/components/common/login-required-dialog";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    const values = Array.isArray(value) ? value : [value];
    if (values.length > 0 && values.some((item) => item !== "")) {
      const paramValue = values.filter((item) => item !== "").join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");
  const bestSellerSearchParam = searchParams.get("isBestSeller");

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  const pageCount = Math.ceil(productList.length / productsPerPage);
  const displayedProducts = productList.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    const selectedValues = new Set(filters[getSectionId] || []);
    if (selectedValues.has(getCurrentOption)) {
      selectedValues.delete(getCurrentOption);
    } else {
      selectedValues.add(getCurrentOption);
    }

    const cpyFilters = {
      ...filters,
      [getSectionId]: Array.from(selectedValues),
    };

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex((item) => item.productId === getCurrentProductId);
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Chỉ còn ${getQuantity} sản phẩm cho mặt hàng này`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Sản phẩm đã được thêm vào giỏ hàng" });
      }
    });
  }

  useEffect(() => {
    const hasUrlFilters =
      categorySearchParam !== null || bestSellerSearchParam !== null;
    const savedFilters = hasUrlFilters
      ? {}
      : JSON.parse(sessionStorage.getItem("filters")) || {};
    if (categorySearchParam !== null) {
      savedFilters.category = categorySearchParam
        ? categorySearchParam.split(",")
        : [];
    } else if (!Array.isArray(savedFilters.category)) {
      savedFilters.category = [];
    }

    if (bestSellerSearchParam !== null) {
      savedFilters.isBestSeller =
        bestSellerSearchParam === "true" ? ["true"] : [];
    } else if (!Array.isArray(savedFilters.isBestSeller)) {
      savedFilters.isBestSeller = [];
    }

    setFilters(savedFilters);
    sessionStorage.setItem("filters", JSON.stringify(savedFilters));
    setSort("price-lowtohigh");
    const queryString = createSearchParamsHelper(savedFilters);
    setSearchParams(new URLSearchParams(queryString));
  }, [categorySearchParam, bestSellerSearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    setOpenDetailsDialog(Boolean(productDetails));
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <Productfilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#A67C6D]">Tất cả sản phẩm</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-[#A67C6D]">
              {productList?.length} Sản phẩm
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4 text-[#A67C6D]" />
                  <span className="text-[#A67C6D]">Sắp xếp</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {displayedProducts && displayedProducts.length > 0 ? (
            displayedProducts.map((productItem) => (
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                key={productItem.id}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
                className="flex flex-col justify-between"
              />
            ))
          ) : (
            <p className="text-center">Không có sản phẩm nào.</p>
          )}
        </div>
        <div className="flex justify-center items-center mt-4 mr-40">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(data) => setCurrentPage(data.selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <LoginRequiredDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
    </div>
  );
}

export default ShoppingListing;
