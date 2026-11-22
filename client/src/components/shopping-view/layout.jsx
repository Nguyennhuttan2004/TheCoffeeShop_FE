import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "../common/footer";
import UserChat from "../../pages/shopping-view/userChat";

function ShoppingLayout() {
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden ">
        <ShoppingHeader />
        <main className="flex flex-col w-full  ">
          <Outlet />
          <Footer />
        </main>
      </div>
      <UserChat floating />
    </>
  );
}

export default ShoppingLayout;
