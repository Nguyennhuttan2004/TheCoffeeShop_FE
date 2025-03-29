export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: " Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: " Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: " Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: " Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: " Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Tên sản phẩm",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tên sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả sản phẩm",
  },
  {
    label: "Danh mục",
    name: "category",
    componentType: "select",
    options: [
      { id: "bestSeller", label: "Bán chạy nhất" },
      { id: "traSua", label: "Trà Sữa" },
      { id: "caPhe", label: "Cà Phê" },
      { id: "banhNgot", label: "Bánh Ngọt" },
      { id: "daXay", label: "Đá Xay" },
    ],
  },
  {
    label: "Kích thước",
    name: "size",
    componentType: "select",
    options: [
      { id: "S", label: "Size S" },
      { id: "M", label: "Size M" },
      { id: "L", label: "Size L" },
    ],
  },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá khuyến mãi",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá khuyến mãi (không bắt buộc)",
  },
  {
    label: "Tổng số lượng",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập tổng số lượng",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "aboutUs",
    label: "About Us",
    path: "/shop/about",
  },
  {
    id: "blog",
    label: "Blog",
    path: "/shop/blog",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/shop/contact",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const shoppingViewFooterMenuItems = [
  {
    id: "bestSeller",
    label: "Best Seller",
    path: "/shop/listing?category=bestSeller",
  },
  {
    id: "traSua",
    label: "Trà Sữa",
    path: "/shop/listing?category=traSua",
  },
  {
    id: "caPhe",
    label: "Cà Phê",
    path: "/shop/listing?category=caPhe",
  },
  {
    id: "daXay",
    label: "Đá Xay",
    path: "/shop/listing?category=daXay",
  },
  {
    id: "banhNgot",
    label: "Bánh Ngọt",
    path: "/shop/listing?category=banhNgot",
  },
];

export const filterOptions = {
  category: [
    // { id: "bestSeller", label: "Best Seller" },
    { id: "traSua", label: "Trà Sữa" },
    { id: "caPhe", label: "Cà Phê" },
    { id: "banhNgot", label: "Bánh Ngọt" },
    { id: "daXay", label: "Đá Xay" },
  ],
  // size: [
  //   { id: "S", label: "Size S" },
  //   { id: "M", label: "Size M" },
  //   { id: "L", label: "Size L" },
  // ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Tăng dần" },
  { id: "price-hightolow", label: "Price: Giảm dần" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const categoryOptionsMap = {
  bestSeller: "bestSeller",
  traSua: "traSua",
  caPhe: "caPhe",
  banhNgot: "banhNgot",
  daXay: "daXay",
};

export const hcmcDistricts = [
  {
    id: 1,
    name: "Quận 1",
    wards: [
      {
        id: 101,
        name: "Phường Bến Nghé",
        streets: [
          "Nguyễn Huệ",
          "Tôn Đức Thắng",
          "Lê Thánh Tôn",
          "Đồng Khởi",
          "Hàm Nghi",
        ],
      },
      {
        id: 102,
        name: "Phường Bến Thành",
        streets: [
          "Lê Lai",
          "Lê Lợi",
          "Nguyễn Thị Nghĩa",
          "Trần Hưng Đạo",
          "Calmette",
        ],
      },
      {
        id: 103,
        name: "Phường Cầu Kho",
        streets: [
          "Nguyễn Văn Cừ",
          "Trần Đình Xu",
          "Nguyễn Cảnh Chân",
          "Võ Văn Kiệt",
        ],
      },
      {
        id: 104,
        name: "Phường Cầu Ông Lãnh",
        streets: ["Võ Văn Kiệt", "Hoàng Diệu", "Nguyễn Thái Học", "Ngô Đức Kế"],
      },
      {
        id: 105,
        name: "Phường Đa Kao",
        streets: [
          "Điện Biên Phủ",
          "Hai Bà Trưng",
          "Nguyễn Đình Chiểu",
          "Mạc Đĩnh Chi",
        ],
      },
      {
        id: 106,
        name: "Phường Nguyễn Cư Trinh",
        streets: [
          "Nguyễn Trãi",
          "Trần Hưng Đạo",
          "Cống Quỳnh",
          "Nguyễn Cư Trinh",
        ],
      },
      {
        id: 107,
        name: "Phường Nguyễn Thái Bình",
        streets: ["Calmette", "Ngô Đức Kế", "Hàm Nghi", "Nam Kỳ Khởi Nghĩa"],
      },
      {
        id: 108,
        name: "Phường Phạm Ngũ Lão",
        streets: ["Bùi Viện", "Đề Thám", "Phạm Ngũ Lão", "Trần Hưng Đạo"],
      },
      {
        id: 109,
        name: "Phường Tân Định",
        streets: [
          "Hai Bà Trưng",
          "Trần Khắc Chân",
          "Võ Thị Sáu",
          "Nguyễn Phi Khanh",
        ],
      },
    ],
  },
  {
    "id": 2,
    "name": "Quận 3",
    "wards": [
      {
        "id": 201,
        "name": "Phường 1",
        "streets": ["Lý Chính Thắng", "Trần Quốc Thảo", "Nam Kỳ Khởi Nghĩa"]
      },
      {
        "id": 202,
        "name": "Phường 2",
        "streets": ["Võ Văn Tần", "Cách Mạng Tháng 8", "Nguyễn Đình Chiểu"]
      },
      {
        "id": 203,
        "name": "Phường 3",
        "streets": ["Nguyễn Thiện Thuật", "Trần Văn Đang", "Kỳ Đồng"]
      },
      {
        "id": 204,
        "name": "Phường 4",
        "streets": ["Điện Biên Phủ", "Nguyễn Đình Chiểu", "Pasteur"]
      },
      {
        "id": 205,
        "name": "Phường 5",
        "streets": ["Nguyễn Thị Minh Khai", "Võ Thị Sáu", "Bà Huyện Thanh Quan"]
      },
      {
        "id": 206,
        "name": "Phường 6",
        "streets": ["Nguyễn Thông", "Lý Chính Thắng", "Nam Kỳ Khởi Nghĩa"]
      },
      {
        "id": 207,
        "name": "Phường 7",
        "streets": ["Trương Định", "Nguyễn Đình Chiểu", "Pasteur"]
      },
      {
        "id": 208,
        "name": "Phường 8",
        "streets": ["Hai Bà Trưng", "Bà Huyện Thanh Quan", "Lý Chính Thắng"]
      },
      {
        "id": 209,
        "name": "Phường 9",
        "streets": ["Võ Văn Tần", "Nguyễn Thị Minh Khai", "Pasteur"]
      },
      {
        "id": 210,
        "name": "Phường 10",
        "streets": ["Nguyễn Đình Chiểu", "Lê Văn Sỹ", "Trần Quốc Thảo"]
      },
      {
        "id": 211,
        "name": "Phường 11",
        "streets": ["Hoàng Sa", "Trần Quang Diệu", "Lý Chính Thắng"]
      },
      {
        "id": 212,
        "name": "Phường 12",
        "streets": ["Kỳ Đồng", "Nguyễn Thông", "Trần Quốc Thảo"]
      },
      {
        "id": 213,
        "name": "Phường 13",
        "streets": ["Võ Văn Tần", "Nguyễn Đình Chiểu", "Lý Chính Thắng"]
      },
      {
        "id": 214,
        "name": "Phường 14",
        "streets": ["Cách Mạng Tháng 8", "Lý Chính Thắng", "Nguyễn Phúc Nguyên"]
      }
    ]
  },
  {
    "id": 3,
    "name": "Quận 2",
    "wards": [
      {
        "id": 201,
        "name": "Phường An Khánh",
        "streets": ["Mai Chí Thọ", "Lương Định Của", "Nguyễn Cơ Thạch"]
      },
      {
        "id": 202,
        "name": "Phường An Lợi Đông",
        "streets": ["Trần Não", "Nguyễn Cơ Thạch", "Lương Định Của"]
      },
      {
        "id": 203,
        "name": "Phường An Phú",
        "streets": ["Song Hành", "Lương Định Của", "Nguyễn Hoàng"]
      },
      {
        "id": 204,
        "name": "Phường Bình An",
        "streets": ["Trần Não", "Nguyễn Văn Hưởng", "Lương Định Của"]
      },
      {
        "id": 205,
        "name": "Phường Bình Khánh",
        "streets": ["Mai Chí Thọ", "Lương Định Của", "Nguyễn Duy Trinh"]
      },
      {
        "id": 206,
        "name": "Phường Bình Trưng Đông",
        "streets": ["Nguyễn Duy Trinh", "Đỗ Xuân Hợp", "Trương Văn Bang"]
      },
      {
        "id": 207,
        "name": "Phường Bình Trưng Tây",
        "streets": ["Nguyễn Thị Định", "Nguyễn Duy Trinh", "Trương Văn Bang"]
      },
      {
        "id": 208,
        "name": "Phường Cát Lái",
        "streets": ["Nguyễn Thị Định", "Đồng Văn Cống", "Trương Văn Bang"]
      },
      {
        "id": 209,
        "name": "Phường Thạnh Mỹ Lợi",
        "streets": ["Nguyễn Thị Định", "Đồng Văn Cống", "Bát Nàn"]
      },
      {
        "id": 210,
        "name": "Phường Thảo Điền",
        "streets": ["Nguyễn Văn Hưởng", "Xuân Thủy", "Thảo Điền"]
      }
    ]
  },
  {
    "id": 4,
    "name": "Quận 4",
    "wards": [
      {
        "id": 401,
        "name": "Phường 1",
        "streets": ["Hoàng Diệu", "Nguyễn Khoái", "Tôn Đản"]
      },
      {
        "id": 402,
        "name": "Phường 2",
        "streets": ["Đoàn Như Hài", "Bến Vân Đồn", "Nguyễn Trường Tộ"]
      },
      {
        "id": 403,
        "name": "Phường 3",
        "streets": ["Tôn Thất Thuyết", "Bến Vân Đồn", "Vĩnh Khánh"]
      },
      {
        "id": 404,
        "name": "Phường 4",
        "streets": ["Khánh Hội", "Nguyễn Khoái", "Tôn Đản"]
      },
      {
        "id": 405,
        "name": "Phường 5",
        "streets": ["Vĩnh Khánh", "Tân Vĩnh", "Xóm Chiếu"]
      },
      {
        "id": 406,
        "name": "Phường 6",
        "streets": ["Nguyễn Tất Thành", "Hoàng Diệu", "Tôn Đản"]
      },
      {
        "id": 407,
        "name": "Phường 8",
        "streets": ["Tôn Đản", "Khánh Hội", "Xóm Chiếu"]
      },
      {
        "id": 408,
        "name": "Phường 9",
        "streets": ["Vĩnh Hội", "Hoàng Diệu", "Tân Vĩnh"]
      },
      {
        "id": 409,
        "name": "Phường 10",
        "streets": ["Nguyễn Tất Thành", "Bến Vân Đồn", "Đoàn Văn Bơ"]
      },
      {
        "id": 410,
        "name": "Phường 13",
        "streets": ["Xóm Chiếu", "Vĩnh Hội", "Tân Vĩnh"]
      },
      {
        "id": 411,
        "name": "Phường 14",
        "streets": ["Đoàn Văn Bơ", "Khánh Hội", "Hoàng Diệu"]
      },
      {
        "id": 412,
        "name": "Phường 15",
        "streets": ["Nguyễn Khoái", "Bến Vân Đồn", "Tôn Đản"]
      },
      {
        "id": 413,
        "name": "Phường 16",
        "streets": ["Tôn Thất Thuyết", "Đoàn Văn Bơ", "Nguyễn Tất Thành"]
      },
      {
        "id": 414,
        "name": "Phường 18",
        "streets": ["Tôn Thất Thuyết", "Xóm Chiếu", "Bến Vân Đồn"]
      }
    ]
  },
  {
    "id": 5,
    "name": "Quận 5",
    "wards": [
      {
        "id": 501,
        "name": "Phường 1",
        "streets": ["Nguyễn Trãi", "Trần Hưng Đạo", "Châu Văn Liêm", "Nguyễn Tri Phương"]
      },
      {
        "id": 502,
        "name": "Phường 2",
        "streets": ["Hải Thượng Lãn Ông", "Nguyễn Trãi", "Triệu Quang Phục", "Nguyễn Biểu"]
      },
      {
        "id": 503,
        "name": "Phường 3",
        "streets": ["Hồng Bàng", "Hải Thượng Lãn Ông", "Nguyễn Chí Thanh", "Vạn Kiếp"]
      },
      {
        "id": 504,
        "name": "Phường 4",
        "streets": ["Nguyễn Trãi", "Trần Hưng Đạo", "Phùng Hưng", "Hồng Bàng"]
      },
      {
        "id": 505,
        "name": "Phường 5",
        "streets": ["Hồng Bàng", "Hải Thượng Lãn Ông", "Châu Văn Liêm", "Nguyễn Trãi"]
      },
      {
        "id": 506,
        "name": "Phường 6",
        "streets": ["Nguyễn Trãi", "Trần Hưng Đạo", "Hồng Bàng", "Nguyễn Tri Phương"]
      },
      {
        "id": 507,
        "name": "Phường 7",
        "streets": ["Nguyễn Tri Phương", "Hải Thượng Lãn Ông", "Nguyễn Trãi", "Nguyễn Biểu"]
      },
      {
        "id": 508,
        "name": "Phường 8",
        "streets": ["Hải Thượng Lãn Ông", "Triệu Quang Phục", "Nguyễn Trãi", "Nguyễn Chí Thanh"]
      },
      {
        "id": 509,
        "name": "Phường 9",
        "streets": ["Nguyễn Trãi", "Hải Thượng Lãn Ông", "Lê Hồng Phong", "Nguyễn Duy Dương"]
      },
      {
        "id": 510,
        "name": "Phường 10",
        "streets": ["Nguyễn Chí Thanh", "Nguyễn Trãi", "Võ Văn Kiệt", "Nguyễn Duy Dương"]
      },
      {
        "id": 511,
        "name": "Phường 11",
        "streets": ["Nguyễn Chí Thanh", "Lê Hồng Phong", "Nguyễn Tri Phương", "Nguyễn Trãi"]
      },
      {
        "id": 512,
        "name": "Phường 12",
        "streets": ["Nguyễn Trãi", "Hải Thượng Lãn Ông", "Châu Văn Liêm", "Trần Hưng Đạo"]
      },
      {
        "id": 513,
        "name": "Phường 13",
        "streets": ["Nguyễn Trãi", "Nguyễn Duy Dương", "Hùng Vương", "Võ Văn Kiệt"]
      },
      {
        "id": 514,
        "name": "Phường 14",
        "streets": ["Hùng Vương", "Nguyễn Trãi", "Nguyễn Tri Phương", "Trần Hưng Đạo"]
      }
    ]
  },
  {
    "id": 6,
    "name": "Quận 6",
    "wards": [
      {
        "id": 601,
        "name": "Phường 1",
        "streets": ["Hậu Giang", "Kinh Dương Vương", "Minh Phụng", "Lý Chiêu Hoàng"]
      },
      {
        "id": 602,
        "name": "Phường 2",
        "streets": ["Hậu Giang", "Lý Chiêu Hoàng", "Minh Phụng", "Bà Hom"]
      },
      {
        "id": 603,
        "name": "Phường 3",
        "streets": ["Hậu Giang", "Phạm Văn Chí", "Bà Hom", "Nguyễn Văn Luông"]
      },
      {
        "id": 604,
        "name": "Phường 4",
        "streets": ["Minh Phụng", "Tân Hòa Đông", "Lê Quang Sung", "Bình Tiên"]
      },
      {
        "id": 605,
        "name": "Phường 5",
        "streets": ["Phạm Văn Chí", "Lý Chiêu Hoàng", "Tân Hòa Đông", "Bà Hom"]
      },
      {
        "id": 606,
        "name": "Phường 6",
        "streets": ["Bình Tiên", "Tân Hòa Đông", "Hậu Giang", "Lê Quang Sung"]
      },
      {
        "id": 607,
        "name": "Phường 7",
        "streets": ["Hậu Giang", "Tân Hòa Đông", "Bà Hom", "Minh Phụng"]
      },
      {
        "id": 608,
        "name": "Phường 8",
        "streets": ["Kinh Dương Vương", "Lê Quang Sung", "Minh Phụng", "Nguyễn Văn Luông"]
      },
      {
        "id": 609,
        "name": "Phường 9",
        "streets": ["Minh Phụng", "Bà Hom", "Phạm Văn Chí", "Tân Hòa Đông"]
      },
      {
        "id": 610,
        "name": "Phường 10",
        "streets": ["Tân Hòa Đông", "Hậu Giang", "Phạm Văn Chí", "Nguyễn Văn Luông"]
      },
      {
        "id": 611,
        "name": "Phường 11",
        "streets": ["Bình Phú", "Nguyễn Văn Luông", "Tân Hòa Đông", "Minh Phụng"]
      },
      {
        "id": 612,
        "name": "Phường 12",
        "streets": ["Hậu Giang", "Nguyễn Văn Luông", "Lê Quang Sung", "Bình Tiên"]
      },
      {
        "id": 613,
        "name": "Phường 13",
        "streets": ["Kinh Dương Vương", "Hậu Giang", "Nguyễn Văn Luông", "Tân Hòa Đông"]
      },
      {
        "id": 614,
        "name": "Phường 14",
        "streets": ["Hậu Giang", "Lý Chiêu Hoàng", "Minh Phụng", "Kinh Dương Vương"]
      }
    ]
  },
  {
    "id": 7,
    "name": "Quận 7",
    "wards": [
      {
        "id": 701,
        "name": "Phường Tân Thuận Đông",
        "streets": ["Huỳnh Tấn Phát", "Tân Thuận Đông", "Bùi Văn Ba", "Nguyễn Văn Quỳ"]
      },
      {
        "id": 702,
        "name": "Phường Tân Thuận Tây",
        "streets": ["Huỳnh Tấn Phát", "Lâm Văn Bền", "Trần Xuân Soạn", "Đào Trí"]
      },
      {
        "id": 703,
        "name": "Phường Tân Kiểng",
        "streets": ["Trần Xuân Soạn", "Tân Kiểng", "Nguyễn Thị Thập", "Lê Văn Lương"]
      },
      {
        "id": 704,
        "name": "Phường Tân Hưng",
        "streets": ["Nguyễn Hữu Thọ", "Dương Bá Trạc", "Trần Xuân Soạn", "Lê Văn Lương"]
      },
      {
        "id": 705,
        "name": "Phường Bình Thuận",
        "streets": ["Huỳnh Tấn Phát", "Lê Văn Lương", "Nguyễn Thị Thập", "Lâm Văn Bền"]
      },
      {
        "id": 706,
        "name": "Phường Tân Phú",
        "streets": ["Nguyễn Hữu Thọ", "Nguyễn Văn Linh", "Tân Phú", "Lê Văn Lương"]
      },
      {
        "id": 707,
        "name": "Phường Phú Mỹ",
        "streets": ["Nguyễn Lương Bằng", "Hoàng Quốc Việt", "Đào Trí", "Huỳnh Tấn Phát"]
      }
    ]
  },
  {
    "id": 8,
    "name": "Quận 8",
    "wards": [
      {
        "id": 801,
        "name": "Phường 1",
        "streets": ["Dương Bá Trạc", "Tạ Quang Bửu", "Phạm Hùng", "Nguyễn Văn Cừ"]
      },
      {
        "id": 802,
        "name": "Phường 2",
        "streets": ["Tạ Quang Bửu", "Phạm Hùng", "Trịnh Quang Nghị", "Nguyễn Chế Nghĩa"]
      },
      {
        "id": 803,
        "name": "Phường 3",
        "streets": ["Dương Bá Trạc", "Tạ Quang Bửu", "Trịnh Quang Nghị", "Bông Sao"]
      },
      {
        "id": 804,
        "name": "Phường 4",
        "streets": ["Tạ Quang Bửu", "Phạm Thế Hiển", "Trịnh Quang Nghị", "Âu Dương Lân"]
      },
      {
        "id": 805,
        "name": "Phường 5",
        "streets": ["Hưng Phú", "Phạm Thế Hiển", "Dương Bá Trạc", "Nguyễn Duy"]
      },
      {
        "id": 806,
        "name": "Phường 6",
        "streets": ["Tạ Quang Bửu", "Hưng Phú", "Phạm Hùng", "Dương Bá Trạc"]
      },
      {
        "id": 807,
        "name": "Phường 7",
        "streets": ["Tạ Quang Bửu", "Trịnh Quang Nghị", "Nguyễn Văn Linh", "Phạm Thế Hiển"]
      },
      {
        "id": 808,
        "name": "Phường 8",
        "streets": ["Hưng Phú", "Tạ Quang Bửu", "Trịnh Quang Nghị", "Dương Bá Trạc"]
      },
      {
        "id": 809,
        "name": "Phường 9",
        "streets": ["Nguyễn Văn Cừ", "Hưng Phú", "Trịnh Quang Nghị", "Âu Dương Lân"]
      },
      {
        "id": 810,
        "name": "Phường 10",
        "streets": ["Tạ Quang Bửu", "Dương Bá Trạc", "Phạm Hùng", "Bông Sao"]
      },
      {
        "id": 811,
        "name": "Phường 11",
        "streets": ["Phạm Thế Hiển", "Tạ Quang Bửu", "Hưng Phú", "Trịnh Quang Nghị"]
      },
      {
        "id": 812,
        "name": "Phường 12",
        "streets": ["Phạm Thế Hiển", "Tạ Quang Bửu", "Hưng Phú", "Trịnh Quang Nghị"]
      },
      {
        "id": 813,
        "name": "Phường 13",
        "streets": ["Nguyễn Văn Cừ", "Tạ Quang Bửu", "Phạm Hùng", "Âu Dương Lân"]
      },
      {
        "id": 814,
        "name": "Phường 14",
        "streets": ["Trịnh Quang Nghị", "Tạ Quang Bửu", "Phạm Thế Hiển", "Dương Bá Trạc"]
      },
      {
        "id": 815,
        "name": "Phường 15",
        "streets": ["Tạ Quang Bửu", "Hưng Phú", "Phạm Hùng", "Trịnh Quang Nghị"]
      },
      {
        "id": 816,
        "name": "Phường 16",
        "streets": ["Hưng Phú", "Trịnh Quang Nghị", "Phạm Thế Hiển", "Dương Bá Trạc"]
      }
    ]
  },
  {
    "id": 9,
    "name": "Quận 9",
    "wards": [
      {
        "id": 901,
        "name": "Phường Hiệp Phú",
        "streets": ["Lê Văn Việt", "Đỗ Xuân Hợp", "Nguyễn Văn Tăng", "Xa Lộ Hà Nội"]
      },
      {
        "id": 902,
        "name": "Phường Long Bình",
        "streets": ["Nguyễn Xiển", "Hoàng Hữu Nam", "Cầu Xây", "Quốc lộ 1A"]
      },
      {
        "id": 903,
        "name": "Phường Long Phước",
        "streets": ["Long Phước", "Bưng Ông Thoàn", "Nguyễn Xiển", "Nguyễn Duy Trinh"]
      },
      {
        "id": 904,
        "name": "Phường Long Thạnh Mỹ",
        "streets": ["Lê Văn Việt", "Nguyễn Xiển", "Hoàng Hữu Nam", "Nguyễn Văn Tăng"]
      },
      {
        "id": 905,
        "name": "Phường Long Trường",
        "streets": ["Trường Lưu", "Nguyễn Duy Trinh", "Lã Xuân Oai", "Bưng Ông Thoàn"]
      },
      {
        "id": 906,
        "name": "Phường Phú Hữu",
        "streets": ["Nguyễn Duy Trinh", "Võ Chí Công", "Bưng Ông Thoàn", "Đường số 9"]
      },
      {
        "id": 907,
        "name": "Phường Phước Bình",
        "streets": ["Đỗ Xuân Hợp", "Tăng Nhơn Phú", "Nguyễn Duy Trinh", "Đường số 4"]
      },
      {
        "id": 908,
        "name": "Phường Phước Long A",
        "streets": ["Đỗ Xuân Hợp", "Dương Đình Hội", "Nguyễn Duy Trinh", "Tăng Nhơn Phú"]
      },
      {
        "id": 909,
        "name": "Phường Phước Long B",
        "streets": ["Đỗ Xuân Hợp", "Nguyễn Duy Trinh", "Đường số 6", "Tăng Nhơn Phú"]
      },
      {
        "id": 910,
        "name": "Phường Tân Phú",
        "streets": ["Xa Lộ Hà Nội", "Nguyễn Văn Tăng", "Lê Văn Việt", "Đường số 10"]
      },
      {
        "id": 911,
        "name": "Phường Tăng Nhơn Phú A",
        "streets": ["Lê Văn Việt", "Tăng Nhơn Phú", "Nguyễn Văn Tăng", "Đường số 1"]
      },
      {
        "id": 912,
        "name": "Phường Tăng Nhơn Phú B",
        "streets": ["Tăng Nhơn Phú", "Dương Đình Hội", "Đỗ Xuân Hợp", "Nguyễn Xiển"]
      },
      {
        "id": 913,
        "name": "Phường Trường Thạnh",
        "streets": ["Nguyễn Duy Trinh", "Lã Xuân Oai", "Trường Lưu", "Bưng Ông Thoàn"]
      }
    ]
  },
  {
    "id": 10,
    "name": "Quận 10",
    "wards": [
      {
        "id": 1001,
        "name": "Phường 1",
        "streets": ["Nguyễn Chí Thanh", "Hùng Vương", "Lý Thường Kiệt", "Lê Hồng Phong"]
      },
      {
        "id": 1002,
        "name": "Phường 2",
        "streets": ["Ba Tháng Hai", "Ngô Gia Tự", "Sư Vạn Hạnh", "Trần Nhân Tông"]
      },
      {
        "id": 1003,
        "name": "Phường 3",
        "streets": ["Lý Thường Kiệt", "Ngô Quyền", "Tô Hiến Thành", "Lê Hồng Phong"]
      },
      {
        "id": 1004,
        "name": "Phường 4",
        "streets": ["Ba Tháng Hai", "Sư Vạn Hạnh", "Ngô Gia Tự", "Vĩnh Viễn"]
      },
      {
        "id": 1005,
        "name": "Phường 5",
        "streets": ["Nguyễn Tri Phương", "Ba Tháng Hai", "Tô Hiến Thành", "Hùng Vương"]
      },
      {
        "id": 1006,
        "name": "Phường 6",
        "streets": ["Nguyễn Tri Phương", "Lý Thường Kiệt", "Ba Tháng Hai", "Ngô Quyền"]
      },
      {
        "id": 1007,
        "name": "Phường 7",
        "streets": ["Lê Hồng Phong", "Nguyễn Tri Phương", "Tô Hiến Thành", "Sư Vạn Hạnh"]
      },
      {
        "id": 1008,
        "name": "Phường 8",
        "streets": ["Nguyễn Chí Thanh", "Lý Thường Kiệt", "Ngô Gia Tự", "Sư Vạn Hạnh"]
      },
      {
        "id": 1009,
        "name": "Phường 9",
        "streets": ["Ba Tháng Hai", "Nguyễn Tri Phương", "Sư Vạn Hạnh", "Nguyễn Chí Thanh"]
      },
      {
        "id": 1010,
        "name": "Phường 10",
        "streets": ["Hùng Vương", "Nguyễn Tri Phương", "Ba Tháng Hai", "Tô Hiến Thành"]
      },
      {
        "id": 1011,
        "name": "Phường 11",
        "streets": ["Lý Thường Kiệt", "Sư Vạn Hạnh", "Ngô Gia Tự", "Lê Hồng Phong"]
      },
      {
        "id": 1012,
        "name": "Phường 12",
        "streets": ["Nguyễn Chí Thanh", "Ba Tháng Hai", "Lý Thường Kiệt", "Ngô Quyền"]
      },
      {
        "id": 1013,
        "name": "Phường 13",
        "streets": ["Nguyễn Tri Phương", "Sư Vạn Hạnh", "Ba Tháng Hai", "Lê Hồng Phong"]
      },
      {
        "id": 1014,
        "name": "Phường 14",
        "streets": ["Ba Tháng Hai", "Nguyễn Tri Phương", "Ngô Gia Tự", "Sư Vạn Hạnh"]
      },
      {
        "id": 1015,
        "name": "Phường 15",
        "streets": ["Ba Tháng Hai", "Nguyễn Chí Thanh", "Nguyễn Tri Phương", "Sư Vạn Hạnh"]
      }
    ]
  },
  {
    "id": 11,
    "name": "Quận 11",
    "wards": [
      {
        "id": 1101,
        "name": "Phường 1",
        "streets": ["Lạc Long Quân", "Minh Phụng", "Tân Khai", "Lãnh Binh Thăng"]
      },
      {
        "id": 1102,
        "name": "Phường 2",
        "streets": ["Hồng Bàng", "Hòa Bình", "Ông Ích Khiêm", "Minh Phụng"]
      },
      {
        "id": 1103,
        "name": "Phường 3",
        "streets": ["Hòa Bình", "Tôn Thất Hiệp", "Minh Phụng", "Lạc Long Quân"]
      },
      {
        "id": 1104,
        "name": "Phường 4",
        "streets": ["Hồng Bàng", "Tân Hóa", "Lạc Long Quân", "Minh Phụng"]
      },
      {
        "id": 1105,
        "name": "Phường 5",
        "streets": ["Lê Đại Hành", "Tôn Thất Hiệp", "Minh Phụng", "Lãnh Binh Thăng"]
      },
      {
        "id": 1106,
        "name": "Phường 6",
        "streets": ["Lãnh Binh Thăng", "Lê Đại Hành", "Ông Ích Khiêm", "Ba Tháng Hai"]
      },
      {
        "id": 1107,
        "name": "Phường 7",
        "streets": ["Tân Hóa", "Hòa Bình", "Minh Phụng", "Lạc Long Quân"]
      },
      {
        "id": 1108,
        "name": "Phường 8",
        "streets": ["Lạc Long Quân", "Ba Tháng Hai", "Minh Phụng", "Hồng Bàng"]
      },
      {
        "id": 1109,
        "name": "Phường 9",
        "streets": ["Tân Khai", "Minh Phụng", "Lạc Long Quân", "Ba Tháng Hai"]
      },
      {
        "id": 1110,
        "name": "Phường 10",
        "streets": ["Hòa Bình", "Hồng Bàng", "Minh Phụng", "Tôn Thất Hiệp"]
      },
      {
        "id": 1111,
        "name": "Phường 11",
        "streets": ["Lạc Long Quân", "Minh Phụng", "Lãnh Binh Thăng", "Ông Ích Khiêm"]
      },
      {
        "id": 1112,
        "name": "Phường 12",
        "streets": ["Lạc Long Quân", "Hòa Bình", "Minh Phụng", "Tôn Thất Hiệp"]
      },
      {
        "id": 1113,
        "name": "Phường 13",
        "streets": ["Hồng Bàng", "Ba Tháng Hai", "Minh Phụng", "Tôn Thất Hiệp"]
      },
      {
        "id": 1114,
        "name": "Phường 14",
        "streets": ["Ba Tháng Hai", "Minh Phụng", "Lê Đại Hành", "Lạc Long Quân"]
      },
      {
        "id": 1115,
        "name": "Phường 15",
        "streets": ["Tân Hóa", "Hòa Bình", "Minh Phụng", "Lạc Long Quân"]
      }
    ]
  },
  {
    "id": 12,
    "name": "Quận 12",
    "wards": [
      {
        "id": 1201,
        "name": "Phường An Phú Đông",
        "streets": ["Quốc lộ 1A", "An Phú Đông 3", "Tô Ngọc Vân", "Lê Thị Riêng"]
      },
      {
        "id": 1202,
        "name": "Phường Đông Hưng Thuận",
        "streets": ["Quốc lộ 1A", "Đông Hưng Thuận 2", "Nguyễn Văn Quá", "Tô Ký"]
      },
      {
        "id": 1203,
        "name": "Phường Hiệp Thành",
        "streets": ["Lê Văn Khương", "Hiệp Thành 13", "Nguyễn Ảnh Thủ", "Dương Thị Mười"]
      },
      {
        "id": 1204,
        "name": "Phường Tân Chánh Hiệp",
        "streets": ["Dương Thị Mười", "Lê Văn Khương", "Tân Chánh Hiệp 10", "Nguyễn Ảnh Thủ"]
      },
      {
        "id": 1205,
        "name": "Phường Tân Hưng Thuận",
        "streets": ["Nguyễn Văn Quá", "Quốc lộ 1A", "Tân Hưng Thuận 12", "Tô Ký"]
      },
      {
        "id": 1206,
        "name": "Phường Tân Thới Hiệp",
        "streets": ["Nguyễn Văn Quá", "Lê Văn Khương", "Tô Ký", "Nguyễn Ảnh Thủ"]
      },
      {
        "id": 1207,
        "name": "Phường Tân Thới Nhất",
        "streets": ["Quốc lộ 1A", "Phan Văn Hớn", "Tân Thới Nhất 17", "Nguyễn Văn Quá"]
      },
      {
        "id": 1208,
        "name": "Phường Thạnh Lộc",
        "streets": ["Hà Huy Giáp", "Thạnh Lộc 19", "Quốc lộ 1A", "Nguyễn Ảnh Thủ"]
      },
      {
        "id": 1209,
        "name": "Phường Thạnh Xuân",
        "streets": ["Hà Huy Giáp", "Thạnh Xuân 25", "Nguyễn Ảnh Thủ", "Lê Thị Riêng"]
      },
      {
        "id": 1210,
        "name": "Phường Thới An",
        "streets": ["Hà Huy Giáp", "Nguyễn Ảnh Thủ", "Thới An 19", "Lê Văn Khương"]
      },
      {
        "id": 1211,
        "name": "Phường Trung Mỹ Tây",
        "streets": ["Quốc lộ 22", "Trung Mỹ Tây 1", "Nguyễn Ảnh Thủ", "Phan Văn Hớn"]
      }
    ]
  },
  {
    "id": 13,
    "name": "Quận Bình Tân",
    "wards": [
      {
        "id": 1301,
        "name": "Phường An Lạc",
        "streets": ["Kinh Dương Vương", "Hồ Học Lãm", "Tỉnh Lộ 10", "An Dương Vương"]
      },
      {
        "id": 1302,
        "name": "Phường An Lạc A",
        "streets": ["Hồ Học Lãm", "Bình Trị Đông", "Tân Tạo", "Nguyễn Cửu Phú"]
      },
      {
        "id": 1303,
        "name": "Phường Bình Hưng Hòa",
        "streets": ["Lê Trọng Tấn", "Tân Kỳ Tân Quý", "Gò Xoài", "Mã Lò"]
      },
      {
        "id": 1304,
        "name": "Phường Bình Hưng Hòa A",
        "streets": ["Tân Kỳ Tân Quý", "Đường số 7", "Bình Long", "Lê Trọng Tấn"]
      },
      {
        "id": 1305,
        "name": "Phường Bình Hưng Hòa B",
        "streets": ["Liên Khu 4-5", "Tân Kỳ Tân Quý", "Mã Lò", "Gò Xoài"]
      },
      {
        "id": 1306,
        "name": "Phường Bình Trị Đông",
        "streets": ["Hương Lộ 2", "Mã Lò", "Bình Trị Đông", "Lê Văn Quới"]
      },
      {
        "id": 1307,
        "name": "Phường Bình Trị Đông A",
        "streets": ["Lê Văn Quới", "Mã Lò", "Tỉnh Lộ 10", "Bình Trị Đông"]
      },
      {
        "id": 1308,
        "name": "Phường Bình Trị Đông B",
        "streets": ["Đường số 1", "Kinh Dương Vương", "Tỉnh Lộ 10", "Bình Trị Đông"]
      },
      {
        "id": 1309,
        "name": "Phường Tân Tạo",
        "streets": ["Đường số 7", "Tỉnh Lộ 10", "Kinh Dương Vương", "Tân Kỳ Tân Quý"]
      },
      {
        "id": 1310,
        "name": "Phường Tân Tạo A",
        "streets": ["Đường số 1", "Tỉnh Lộ 10", "Lê Trọng Tấn", "Bình Long"]
      }
    ]
  },
  {
    "id": 14,
    "name": "Quận Bình Thạnh",
    "wards": [
      {
        "id": 1401,
        "name": "Phường 1",
        "streets": ["Nguyễn Hữu Cảnh", "Xô Viết Nghệ Tĩnh", "Nguyễn Cửu Vân", "Ung Văn Khiêm"]
      },
      {
        "id": 1402,
        "name": "Phường 2",
        "streets": ["Nguyễn Xí", "Bạch Đằng", "Đinh Bộ Lĩnh", "Phan Văn Trị"]
      },
      {
        "id": 1403,
        "name": "Phường 3",
        "streets": ["Nguyễn Văn Đậu", "Lê Quang Định", "Bùi Đình Túy", "Phan Đăng Lưu"]
      },
      {
        "id": 1404,
        "name": "Phường 5",
        "streets": ["Bạch Đằng", "Đinh Bộ Lĩnh", "Nguyễn Xí", "Phan Văn Trị"]
      },
      {
        "id": 1405,
        "name": "Phường 6",
        "streets": ["Điện Biên Phủ", "Phan Đăng Lưu", "Lê Quang Định", "Vũ Tùng"]
      },
      {
        "id": 1406,
        "name": "Phường 7",
        "streets": ["Lê Quang Định", "Phan Đăng Lưu", "Nguyễn Văn Đậu", "Nguyễn Hữu Cảnh"]
      },
      {
        "id": 1407,
        "name": "Phường 11",
        "streets": ["Bạch Đằng", "Phan Văn Trị", "Nguyễn Xí", "Đinh Bộ Lĩnh"]
      },
      {
        "id": 1408,
        "name": "Phường 12",
        "streets": ["Nguyễn Văn Đậu", "Phan Đăng Lưu", "Lê Quang Định", "Bùi Đình Túy"]
      }
    ]
  },
  {
    "id": 15,
    "name": "Quận Gò Vấp",
    "wards": [
      {
        "id": 1501,
        "name": "Phường 1",
        "streets": ["Phan Văn Trị", "Nguyễn Oanh", "Quang Trung", "Nguyễn Văn Lượng"]
      },
      {
        "id": 1502,
        "name": "Phường 3",
        "streets": ["Nguyễn Kiệm", "Nguyễn Thái Sơn", "Lê Quang Định", "Phạm Văn Đồng"]
      },
      {
        "id": 1503,
        "name": "Phường 4",
        "streets": ["Nguyễn Oanh", "Phan Văn Trị", "Quang Trung", "Nguyễn Văn Lượng"]
      },
      {
        "id": 1504,
        "name": "Phường 5",
        "streets": ["Dương Quảng Hàm", "Thống Nhất", "Nguyễn Văn Lượng", "Lê Đức Thọ"]
      },
      {
        "id": 1505,
        "name": "Phường 6",
        "streets": ["Nguyễn Oanh", "Lê Đức Thọ", "Dương Quảng Hàm", "Phan Văn Trị"]
      },
      {
        "id": 1506,
        "name": "Phường 7",
        "streets": ["Quang Trung", "Nguyễn Oanh", "Phan Văn Trị", "Lê Văn Thọ"]
      },
      {
        "id": 1507,
        "name": "Phường 8",
        "streets": ["Phan Văn Trị", "Nguyễn Oanh", "Lê Đức Thọ", "Thống Nhất"]
      },
      {
        "id": 1508,
        "name": "Phường 9",
        "streets": ["Nguyễn Kiệm", "Nguyễn Thái Sơn", "Quang Trung", "Phan Văn Trị"]
      },
      {
        "id": 1509,
        "name": "Phường 10",
        "streets": ["Nguyễn Văn Nghi", "Phạm Văn Đồng", "Nguyễn Thái Sơn", "Nguyễn Kiệm"]
      },
      {
        "id": 1510,
        "name": "Phường 11",
        "streets": ["Nguyễn Văn Nghi", "Nguyễn Oanh", "Phan Văn Trị", "Quang Trung"]
      },
      {
        "id": 1511,
        "name": "Phường 12",
        "streets": ["Dương Quảng Hàm", "Nguyễn Oanh", "Lê Đức Thọ", "Phan Văn Trị"]
      },
      {
        "id": 1512,
        "name": "Phường 13",
        "streets": ["Lê Đức Thọ", "Nguyễn Văn Lượng", "Thống Nhất", "Dương Quảng Hàm"]
      },
      {
        "id": 1513,
        "name": "Phường 14",
        "streets": ["Nguyễn Oanh", "Quang Trung", "Nguyễn Văn Lượng", "Lê Đức Thọ"]
      },
      {
        "id": 1514,
        "name": "Phường 15",
        "streets": ["Quang Trung", "Nguyễn Kiệm", "Nguyễn Văn Nghi", "Nguyễn Thái Sơn"]
      },
      {
        "id": 1515,
        "name": "Phường 16",
        "streets": ["Lê Văn Thọ", "Quang Trung", "Phạm Văn Chiêu", "Nguyễn Oanh"]
      },
      {
        "id": 1516,
        "name": "Phường 17",
        "streets": ["Nguyễn Oanh", "Quang Trung", "Nguyễn Văn Lượng", "Dương Quảng Hàm"]
      }
    ]
  },
  {
    "id": 16,
    "name": "Quận Phú Nhuận",
    "wards": [
      {
        "id": 1601,
        "name": "Phường 1",
        "streets": ["Phan Xích Long", "Hoàng Văn Thụ", "Nguyễn Kiệm", "Đào Duy Anh"]
      },
      {
        "id": 1602,
        "name": "Phường 2",
        "streets": ["Phan Đình Phùng", "Nguyễn Văn Trỗi", "Đặng Văn Ngữ", "Huỳnh Văn Bánh"]
      },
      {
        "id": 1603,
        "name": "Phường 3",
        "streets": ["Nguyễn Kiệm", "Phan Đình Phùng", "Trường Sa", "Hoàng Văn Thụ"]
      },
      {
        "id": 1604,
        "name": "Phường 4",
        "streets": ["Huỳnh Văn Bánh", "Trường Sa", "Nguyễn Văn Trỗi", "Phan Đình Phùng"]
      },
      {
        "id": 1605,
        "name": "Phường 5",
        "streets": ["Hoàng Văn Thụ", "Nguyễn Kiệm", "Đào Duy Anh", "Trường Sa"]
      },
      {
        "id": 1606,
        "name": "Phường 7",
        "streets": ["Phan Xích Long", "Trần Kế Xương", "Hoàng Sa", "Nguyễn Công Hoan"]
      },
      {
        "id": 1607,
        "name": "Phường 8",
        "streets": ["Phan Xích Long", "Hoa Phượng", "Trần Huy Liệu", "Nguyễn Công Hoan"]
      },
      {
        "id": 1608,
        "name": "Phường 9",
        "streets": ["Trần Huy Liệu", "Hoàng Sa", "Phan Đình Phùng", "Nguyễn Trọng Tuyển"]
      },
      {
        "id": 1609,
        "name": "Phường 10",
        "streets": ["Nguyễn Văn Trỗi", "Huỳnh Văn Bánh", "Trường Sa", "Lê Văn Sỹ"]
      },
      {
        "id": 1610,
        "name": "Phường 11",
        "streets": ["Nguyễn Kiệm", "Phan Xích Long", "Hoàng Văn Thụ", "Đào Duy Anh"]
      },
      {
        "id": 1611,
        "name": "Phường 12",
        "streets": ["Phan Đình Phùng", "Trần Huy Liệu", "Hoàng Văn Thụ", "Huỳnh Văn Bánh"]
      },
      {
        "id": 1612,
        "name": "Phường 13",
        "streets": ["Nguyễn Trọng Tuyển", "Huỳnh Văn Bánh", "Trường Sa", "Lê Văn Sỹ"]
      },
      {
        "id": 1613,
        "name": "Phường 14",
        "streets": ["Phan Đình Phùng", "Nguyễn Trọng Tuyển", "Lê Văn Sỹ", "Hoàng Văn Thụ"]
      },
      {
        "id": 1614,
        "name": "Phường 15",
        "streets": ["Nguyễn Văn Trỗi", "Trần Huy Liệu", "Phan Xích Long", "Hoàng Sa"]
      },
      {
        "id": 1615,
        "name": "Phường 17",
        "streets": ["Phan Xích Long", "Nguyễn Công Hoan", "Trường Sa", "Nguyễn Văn Trỗi"]
      }
    ]
  },
  {
    "id": 17,
    "name": "Quận Tân Bình",
    "wards": [
      {
        "id": 1701,
        "name": "Phường 1",
        "streets": ["Trường Sa", "Hoàng Sa", "Phạm Văn Hai", "Lê Văn Sỹ"]
      },
      {
        "id": 1702,
        "name": "Phường 2",
        "streets": ["Cộng Hòa", "Hoàng Văn Thụ", "Út Tịch", "Nguyễn Văn Trỗi"]
      },
      {
        "id": 1703,
        "name": "Phường 3",
        "streets": ["Hoàng Văn Thụ", "Lê Bình", "Trường Chinh", "Phan Đình Giót"]
      },
      {
        "id": 1704,
        "name": "Phường 4",
        "streets": ["Cách Mạng Tháng 8", "Lý Thường Kiệt", "Trường Chinh", "Hoàng Văn Thụ"]
      },
      {
        "id": 1705,
        "name": "Phường 5",
        "streets": ["Hoàng Văn Thụ", "Phan Đình Giót", "Trần Văn Danh", "Trường Chinh"]
      },
      {
        "id": 1706,
        "name": "Phường 6",
        "streets": ["Lê Văn Sỹ", "Nguyễn Trọng Tuyển", "Hoàng Văn Thụ", "Phan Đình Phùng"]
      },
      {
        "id": 1707,
        "name": "Phường 7",
        "streets": ["Lý Thường Kiệt", "Trường Chinh", "Hoàng Văn Thụ", "Cộng Hòa"]
      },
      {
        "id": 1708,
        "name": "Phường 8",
        "streets": ["Trường Chinh", "Hoàng Văn Thụ", "Phạm Văn Hai", "Cộng Hòa"]
      },
      {
        "id": 1709,
        "name": "Phường 9",
        "streets": ["Cộng Hòa", "Hoàng Hoa Thám", "Tân Kỳ Tân Quý", "Trường Chinh"]
      },
      {
        "id": 1710,
        "name": "Phường 10",
        "streets": ["Hoàng Văn Thụ", "Cộng Hòa", "Nguyễn Văn Trỗi", "Lê Văn Sỹ"]
      },
      {
        "id": 1711,
        "name": "Phường 11",
        "streets": ["Trường Chinh", "Hoàng Hoa Thám", "Cộng Hòa", "Lê Văn Sỹ"]
      },
      {
        "id": 1712,
        "name": "Phường 12",
        "streets": ["Nguyễn Trọng Tuyển", "Trường Chinh", "Lê Văn Sỹ", "Hoàng Văn Thụ"]
      },
      {
        "id": 1713,
        "name": "Phường 13",
        "streets": ["Trường Sa", "Hoàng Sa", "Lê Văn Sỹ", "Nguyễn Văn Trỗi"]
      },
      {
        "id": 1714,
        "name": "Phường 14",
        "streets": ["Cộng Hòa", "Hoàng Hoa Thám", "Trường Chinh", "Nguyễn Trọng Tuyển"]
      },
      {
        "id": 1715,
        "name": "Phường 15",
        "streets": ["Cộng Hòa", "Trường Chinh", "Hoàng Văn Thụ", "Phan Đình Giót"]
      }
    ]
  },
  {
    "id": 18,
    "name": "Quận Tân Phú",
    "wards": [
      {
        "id": 1801,
        "name": "Phường Hiệp Tân",
        "streets": ["Hòa Bình", "Lũy Bán Bích", "Tân Hòa Đông", "Tân Kỳ Tân Quý"]
      },
      {
        "id": 1802,
        "name": "Phường Hòa Thạnh",
        "streets": ["Lũy Bán Bích", "Hòa Bình", "Tân Kỳ Tân Quý", "Vườn Lài"]
      },
      {
        "id": 1803,
        "name": "Phường Phú Thạnh",
        "streets": ["Lũy Bán Bích", "Vườn Lài", "Tân Kỳ Tân Quý", "Tân Hòa Đông"]
      },
      {
        "id": 1804,
        "name": "Phường Phú Trung",
        "streets": ["Lũy Bán Bích", "Thạch Lam", "Tân Hương", "Âu Cơ"]
      },
      {
        "id": 1805,
        "name": "Phường Sơn Kỳ",
        "streets": ["Tân Kỳ Tân Quý", "Lê Trọng Tấn", "Tây Thạnh", "Bờ Bao Tân Thắng"]
      },
      {
        "id": 1806,
        "name": "Phường Tân Quý",
        "streets": ["Lê Trọng Tấn", "Tân Kỳ Tân Quý", "Tân Hương", "Thạch Lam"]
      },
      {
        "id": 1807,
        "name": "Phường Tân Sơn Nhì",
        "streets": ["Tân Kỳ Tân Quý", "Nguyễn Cửu Đàm", "Vườn Lài", "Lũy Bán Bích"]
      },
      {
        "id": 1808,
        "name": "Phường Tân Thành",
        "streets": ["Âu Cơ", "Lũy Bán Bích", "Thạch Lam", "Tân Hương"]
      },
      {
        "id": 1809,
        "name": "Phường Tân Thới Hòa",
        "streets": ["Lũy Bán Bích", "Thạch Lam", "Hòa Bình", "Tân Hương"]
      },
      {
        "id": 1810,
        "name": "Phường Tây Thạnh",
        "streets": ["Tân Kỳ Tân Quý", "Lê Trọng Tấn", "Cộng Hòa", "Tây Thạnh"]
      }
    ]
  },
  {
    "id": 19,
    "name": "Thành phố Thủ Đức",
    "wards": [
      {
        "id": 1901,
        "name": "Phường Bình Chiểu",
        "streets": ["Tỉnh Lộ 43", "Ngô Chí Quốc", "Quốc Lộ 1A", "Đường số 4"]
      },
      {
        "id": 1902,
        "name": "Phường Bình Thọ",
        "streets": ["Võ Văn Ngân", "Dân Chủ", "Kha Vạn Cân", "Lê Văn Chí"]
      },
      {
        "id": 1903,
        "name": "Phường Hiệp Bình Chánh",
        "streets": ["Phạm Văn Đồng", "Hiệp Bình", "Tam Bình", "Quốc Lộ 13"]
      },
      {
        "id": 1904,
        "name": "Phường Hiệp Bình Phước",
        "streets": ["Quốc Lộ 13", "Đinh Thị Thi", "Phạm Văn Đồng", "Tam Bình"]
      },
      {
        "id": 1905,
        "name": "Phường Linh Chiểu",
        "streets": ["Võ Văn Ngân", "Kha Vạn Cân", "Lê Văn Chí", "Hoàng Diệu 2"]
      },
      {
        "id": 1906,
        "name": "Phường Linh Đông",
        "streets": ["Tô Ngọc Vân", "Phạm Văn Đồng", "Kha Vạn Cân", "Đường số 22"]
      },
      {
        "id": 1907,
        "name": "Phường Linh Tây",
        "streets": ["Hoàng Diệu 2", "Lê Văn Chí", "Đường số 6", "Kha Vạn Cân"]
      },
      {
        "id": 1908,
        "name": "Phường Linh Trung",
        "streets": ["Xa Lộ Hà Nội", "Đỗ Xuân Hợp", "Tân Lập", "Hoàng Diệu 2"]
      },
      {
        "id": 1909,
        "name": "Phường Linh Xuân",
        "streets": ["Quốc Lộ 1K", "Tô Ngọc Vân", "Số 13", "Linh Trung"]
      },
      {
        "id": 1910,
        "name": "Phường Tam Bình",
        "streets": ["Quốc Lộ 1A", "Tô Ngọc Vân", "Cây Keo", "Tam Hà"]
      },
      {
        "id": 1911,
        "name": "Phường Tam Phú",
        "streets": ["Tô Ngọc Vân", "Tam Hà", "Lê Văn Chí", "Phạm Văn Đồng"]
      },
      {
        "id": 1912,
        "name": "Phường Trường Thọ",
        "streets": ["Xa Lộ Hà Nội", "Nguyễn Văn Bá", "Đường số 2", "Tô Ngọc Vân"]
      }
    ]
  },
  {
    "id": 20,
    "name": "Huyện Bình Chánh",
    "wards": [
      {
        "id": 2001,
        "name": "Xã An Phú Tây",
        "streets": ["Quốc Lộ 50", "Đinh Đức Thiện", "Đoàn Nguyễn Tuấn", "Hưng Long"]
      },
      {
        "id": 2002,
        "name": "Xã Bình Chánh",
        "streets": ["Quốc Lộ 1A", "Nguyễn Hữu Trí", "Vĩnh Lộc", "Đinh Đức Thiện"]
      },
      {
        "id": 2003,
        "name": "Xã Bình Hưng",
        "streets": ["Quốc Lộ 50", "Phạm Hùng", "Đinh Đức Thiện", "Dương Đình Hội"]
      },
      {
        "id": 2004,
        "name": "Xã Bình Lợi",
        "streets": ["Tỉnh Lộ 10", "Đoàn Nguyễn Tuấn", "Hưng Long", "Phạm Văn Hai"]
      },
      {
        "id": 2005,
        "name": "Xã Đa Phước",
        "streets": ["Quốc Lộ 50", "Đinh Đức Thiện", "Nguyễn Văn Linh", "Hưng Long"]
      },
      {
        "id": 2006,
        "name": "Xã Hưng Long",
        "streets": ["Đoàn Nguyễn Tuấn", "Phạm Văn Hai", "Tỉnh Lộ 10", "Vĩnh Lộc"]
      },
      {
        "id": 2007,
        "name": "Xã Lê Minh Xuân",
        "streets": ["Tỉnh Lộ 10", "Đinh Đức Thiện", "Hưng Long", "Quốc Lộ 1A"]
      },
      {
        "id": 2008,
        "name": "Xã Phạm Văn Hai",
        "streets": ["Tỉnh Lộ 10", "Nguyễn Văn Linh", "Vĩnh Lộc", "Quốc Lộ 1A"]
      }
    ]
  },
  {
    "id": 21,
    "name": "Huyện Cần Giờ",
    "wards": [
      {
        "id": 2101,
        "name": "Thị trấn Cần Thạnh",
        "streets": ["Duyên Hải", "Rừng Sác", "Nguyễn Văn Mạnh", "Nguyễn An Ninh"]
      },
      {
        "id": 2102,
        "name": "Xã An Thới Đông",
        "streets": ["Rừng Sác", "Lương Văn Nho", "Duyên Hải", "Trần Quang Khải"]
      },
      {
        "id": 2103,
        "name": "Xã Bình Khánh",
        "streets": ["Rừng Sác", "Duyên Hải", "Nguyễn Văn Tạo", "Lương Văn Nho"]
      },
      {
        "id": 2104,
        "name": "Xã Long Hòa",
        "streets": ["Rừng Sác", "Duyên Hải", "Nguyễn Văn Mạnh", "Nguyễn An Ninh"]
      },
      {
        "id": 2105,
        "name": "Xã Lý Nhơn",
        "streets": ["Lý Nhơn", "Rừng Sác", "Duyên Hải", "Nguyễn Văn Tạo"]
      },
      {
        "id": 2106,
        "name": "Xã Tam Thôn Hiệp",
        "streets": ["Tam Thôn Hiệp", "Rừng Sác", "Nguyễn Văn Mạnh", "Duyên Hải"]
      }
    ]
  },
  {
    "id": 22,
    "name": "Huyện Củ Chi",
    "wards": [
      {
        "id": 2201,
        "name": "Thị trấn Củ Chi",
        "streets": ["Quốc Lộ 22", "Tỉnh Lộ 8", "Tỉnh Lộ 15", "Đường Nguyễn Văn Khạ"]
      },
      {
        "id": 2202,
        "name": "Xã An Nhơn Tây",
        "streets": ["Tỉnh Lộ 7", "An Nhơn Tây", "Đường Bàu Lách", "Tỉnh Lộ 15"]
      },
      {
        "id": 2203,
        "name": "Xã An Phú",
        "streets": ["Tỉnh Lộ 8", "Đường An Phú", "Hương Lộ 2", "Đường số 6"]
      },
      {
        "id": 2204,
        "name": "Xã Bình Mỹ",
        "streets": ["Tỉnh Lộ 9", "Bình Mỹ", "Đường Võ Văn Bích", "Nguyễn Thị Lắng"]
      },
      {
        "id": 2205,
        "name": "Xã Hòa Phú",
        "streets": ["Tỉnh Lộ 15", "Hòa Phú", "Đường số 5", "Nguyễn Văn Khạ"]
      },
      {
        "id": 2206,
        "name": "Xã Nhuận Đức",
        "streets": ["Tỉnh Lộ 15", "Nhuận Đức", "Đường số 8", "Quốc Lộ 22"]
      }
    ]
  },
  {
    "id": 23,
    "name": "Huyện Hóc Môn",
    "wards": [
      {
        "id": 2301,
        "name": "Thị trấn Hóc Môn",
        "streets": ["Quốc Lộ 22", "Nguyễn Ảnh Thủ", "Lê Lợi", "Song Hành"]
      },
      {
        "id": 2302,
        "name": "Xã Bà Điểm",
        "streets": ["Quốc Lộ 1A", "Phan Văn Hớn", "Bà Điểm 3", "Đặng Thúc Vịnh"]
      },
      {
        "id": 2303,
        "name": "Xã Đông Thạnh",
        "streets": ["Đông Thạnh 1", "Đông Thạnh 5", "Quốc Lộ 1A", "Nguyễn Văn Bứa"]
      },
      {
        "id": 2304,
        "name": "Xã Nhị Bình",
        "streets": ["Nhị Bình 1", "Nhị Bình 3", "Quốc Lộ 1A", "Nguyễn Thị Đành"]
      },
      {
        "id": 2305,
        "name": "Xã Tân Hiệp",
        "streets": ["Tân Hiệp", "Nguyễn Văn Bứa", "Nguyễn Thị Đành", "Quốc Lộ 22"]
      },
      {
        "id": 2306,
        "name": "Xã Tân Thới Nhì",
        "streets": ["Tỉnh Lộ 9", "Tân Thới Nhì", "Đặng Thúc Vịnh", "Quốc Lộ 22"]
      }
    ]
  },
  {
    "id": 24,
    "name": "Huyện Nhà Bè",
    "wards": [
      {
        "id": 2401,
        "name": "Thị trấn Nhà Bè",
        "streets": ["Huỳnh Tấn Phát", "Nguyễn Bình", "Đào Tông Nguyên", "Lê Văn Lương"]
      },
      {
        "id": 2402,
        "name": "Xã Hiệp Phước",
        "streets": ["Nguyễn Hữu Thọ", "Lê Văn Lương", "Đào Tông Nguyên", "Huỳnh Tấn Phát"]
      },
      {
        "id": 2403,
        "name": "Xã Long Thới",
        "streets": ["Nguyễn Hữu Thọ", "Long Thới", "Lê Văn Lương", "Nguyễn Văn Tạo"]
      },
      {
        "id": 2404,
        "name": "Xã Nhơn Đức",
        "streets": ["Nhơn Đức", "Nguyễn Bình", "Lê Văn Lương", "Huỳnh Tấn Phát"]
      },
      {
        "id": 2405,
        "name": "Xã Phú Xuân",
        "streets": ["Huỳnh Tấn Phát", "Phú Xuân", "Lê Văn Lương", "Nguyễn Văn Tạo"]
      },
      {
        "id": 2406,
        "name": "Xã Phước Kiển",
        "streets": ["Nguyễn Hữu Thọ", "Phước Kiển", "Lê Văn Lương", "Đào Tông Nguyên"]
      },
      {
        "id": 2407,
        "name": "Xã Phước Lộc",
        "streets": ["Phước Lộc", "Nguyễn Bình", "Huỳnh Tấn Phát", "Lê Văn Lương"]
      }
    ]
  },
];

export const addressFormControls = [
  {
    label: "Tỉnh/Thành phố",
    name: "city",
    componentType: "select",
    options: [{ id: "HCM", label: "Hồ Chí Minh" }],
  },
  {
    label: "Quận/Huyện",
    name: "district",
    componentType: "select",
    options: [], // Sẽ được cập nhật động từ Address.jsx
  },
  {
    label: "Phường/Xã",
    name: "ward",
    componentType: "select",
    options: [], // Sẽ được cập nhật động từ Address.jsx
  },
  {
    label: "Số nhà, Tên đường",
    name: "streetAddress",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số nhà, tên đường",
    suggestions: [], // Gợi ý tên đường
  },
  {
    label: "Số điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại của bạn",
  },
  {
    label: "Ghi chú",
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú thêm (nếu có)",
  },
];




// 	NGUYEN VAN A 9704 0000 0000 0018 03/07 OTP