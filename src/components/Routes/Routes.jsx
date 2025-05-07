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
const New = lazy(() => import("../New/New"));
const Men = lazy(() => import("../Men/Men"));
const Kids = lazy(() => import("../Kids/Kids"));

const Goods = lazy(() => import("../Goods/Goods"));

import Product from "../Goods/product/Product";
import NewMen from "../New/NewMen";
import NewWomen from "../New/NewWomen";

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

        {/* Women */}
        <Route path="/women" element={<Women />} />
        <Route path="/women/:id" element={<Product />} />
        <Route path="/women/women_collection" element={<NewWomen />}></Route>
        {/* Men */}
        <Route path="/men" element={<Men />} />
        <Route path="/men/:id" element={<Product />}></Route>
        <Route path="/men/men_collection" element={<NewMen />}></Route>
        {/* Kids */}
        <Route path="/kids" element={<Kids />} />
        <Route path="/kids/:id" element={<Product />}></Route>

        {/* Media */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* E-Commerce */}

        <Route path="/goods" element={<Goods />}></Route>

        <Route path="/sale" element={<Sale />} />
        <Route path="/hot_sale" element={<Latest />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
