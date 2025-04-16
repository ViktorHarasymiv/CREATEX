import { lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NotFound from "../NotFound/NotFound";
import Checkout from "../Checkout/Checkout";
import Latest from "../Latest/Latest";

const Home = lazy(() => import("../Home/Home"));

const Delivery = lazy(() => import("../Delivery/Delivery"));
const Track = lazy(() => import("../Track/Track"));
const Blog = lazy(() => import("../Blog/Blog"));
const Contacts = lazy(() => import("../Contacts/Contacts"));

const Women = lazy(() => import("../Women/Women"));
const Men = lazy(() => import("../Men/Men"));

const Account = lazy(() => import("../Account/Account"));
const Sale = lazy(() => import("../Sale/Sale"));
const Wishlist = lazy(() => import("../Wishlist/Wishlist"));

function Router() {
  document.title = "Createx | Home";
  const location = useLocation();

  const [title, setTitle] = useState("Createx | Home");

  document.title = title;

  useEffect(() => {
    if (location.pathname == "/") {
      setTitle("Createx | Home");
      return;
    }
    const setTitleCustom = ` ${
      location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)
    }`;
    setTitle(`Createx | ${setTitleCustom} `);
  }, [location.pathname]);
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Components navigation */}

        <Route path="/delivery" element={<Delivery />} />
        <Route path="/track" element={<Track />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<Account />} />

        {/* Page navigation */}
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* E-Commerce */}

        <Route path="/sale" element={<Sale />} />
        <Route path="/hot_sale" element={<Latest />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
