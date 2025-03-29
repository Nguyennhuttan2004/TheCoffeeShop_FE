import {
    BadgeCheck,
    BookHeart,
    ChartNoAxesCombined,
    LayoutDashboard,
    MessageSquareQuote,
    Newspaper,
    ShoppingBasket,
    TicketPercentIcon,
    User,
  } from "lucide-react";
  import { Fragment } from "react";
  import { useNavigate } from "react-router-dom";
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
  
  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <BadgeCheck />,
    },
    {
      id: "features",
      label: "Banner",
      path: "/admin/features",
      icon: <BookHeart />
    },
    {
      id: "users",
      label: "User",
      path: "/admin/users",
      icon: <User/>
    },
    {
      id: "blog",
      label: "Blog",
      path: "/admin/blog",
      icon: <Newspaper />
    },
    {
      id: "support",
      label: "support customers",
      path: "/admin/supportCustomer",
      icon: <User/>
    },
    {
      id: "chat",
      label: "Chat",
      path: "/admin/chat",
      icon: <MessageSquareQuote />
    },
    {
      id: "vouchers",
      label: "Vouchers",
      path: "/admin/vouchers",
      icon: <TicketPercentIcon />
    },
   
    
  ];
  
  function MenuItems({ setOpen }) {
    const navigate = useNavigate();
  
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {adminSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  }
  
  function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
  
    return (
      <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-5 mb-5">
                  <ChartNoAxesCombined size={30} />
                  <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <ChartNoAxesCombined size={30} />
            <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    );
  }
  
  export default AdminSideBar;
  