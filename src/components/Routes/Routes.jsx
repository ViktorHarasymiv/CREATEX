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

const Goods = lazy(() => import("../Goods/components/Goods"));

import Product from "../Goods/product/Product";
import Boys from "../Kids/Boys";
import Girls from "../Kids/Girls";

const Account = lazy(() => import("../Account/Account"));
const Sale = lazy(() => import("../Sale/Sale"));
const Wishlist = lazy(() => import("../Wishlist/Wishlist"));

function Router({ valute, filter, setFilter, sliceValue, setSliceValue }) {
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
        <Route path="/" element={<Home valute={valute} />} />

        {/* Components navigation */}

        <Route path="/delivery" element={<Delivery />} />
        <Route path="/track" element={<Track />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<Account />} />

        {/* Page navigation */}

        {/* Women */}
        <Route
          path="/women"
          element={
            <Women
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        />
        <Route path="/women/:id" element={<Product valute={valute} />} />
        {/* Men */}
        <Route
          path="/men"
          element={
            <Men
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        />
        <Route path="/men/:id" element={<Product valute={valute} />}></Route>
        {/* Kids */}
        <Route
          path="/kids"
          element={
            <Kids
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        />
        <Route path="/kids/:id" element={<Product valute={valute} />}></Route>
        <Route
          path="/boys"
          element={
            <Boys
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        />
        <Route path="/boys/:id" element={<Product valute={valute} />}></Route>

        <Route
          path="/girls"
          element={
            <Girls
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        />
        <Route path="/girls/:id" element={<Product valute={valute} />}></Route>

        {/* Media */}
        <Route path="/wishlist" element={<Wishlist valute={valute} />} />
        <Route path="/checkout" element={<Checkout valute={valute} />} />

        {/* E-Commerce */}

        <Route path="/goods" element={<Goods />}></Route>

        <Route
          path="/sale"
          element={
            <Sale
              valute={valute}
              filter={filter}
              setFilter={setFilter}
              sliceValue={sliceValue}
              setSliceValue={setSliceValue}
            />
          }
        />
        <Route path="/hot_sale" element={<Latest />} />

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
