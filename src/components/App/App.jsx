import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

import { useLocation } from "react-router-dom";

import "./App.css";

import Router from "../Routes/Routes";

import PuffLoader from "react-spinners/PuffLoader";
import Subscribe from "../Subscribe/Subscribe";
import SubscribePage from "../Subscribe/SubscribePage";

/* Setup for spiner */
const override = {
  display: "block",

  position: "fixed",
  top: "50%",
  left: "50%",
  transfotm: "translate(-50%, -50%)",
};

const Header = lazy(() => import("./../Header/Header/Header"));
function App() {
  const location = useLocation();
  const [valute, setValute] = useState(() => {
    const savedValute = window.localStorage.getItem("valute");

    if (savedValute !== null) {
      return JSON.parse(savedValute);
    }
    return "Dollar";
  });

  const [openSubscribe, setSubscribe] = useState(false);
  const [changeValue, setChangeValue] = useState("All");
  const [sliceValue, setSliceValue] = useState(6);
  console.log(changeValue);

  /* STORAGE */

  useEffect(() => {
    localStorage.setItem("valute", JSON.stringify(valute));
  }, [valute]);

  useEffect(() => {
    setChangeValue("All");
  }, [location]);

  //

  const SyncReduxWithLocalStorage = () => {
    const dataArray = useSelector((state) => state.basket.basketArr);

    useEffect(() => {
      localStorage.setItem("reduxArray", JSON.stringify(dataArray));
    }, [dataArray]);

    return null;
  };

  SyncReduxWithLocalStorage();

  const openSubscribePanel = () => {
    setSubscribe((prevState) => !prevState);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSubscribe(true);
  //     return;
  //   }, 2000);
  // }, []);

  return (
    <>
      {openSubscribe && (
        <Subscribe
          isSubscribe={openSubscribe}
          openSubscribe={openSubscribePanel}
        />
      )}
      <Header
        openSubscribe={openSubscribePanel}
        setValute={setValute}
        valute={valute}
      />
      {
        <Suspense
          fallback={
            <PuffLoader
              color={"#000"}
              cssOverride={override}
              size={28}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          }
        >
          <Router
            valute={valute}
            filter={changeValue}
            setFilter={setChangeValue}
            sliceValue={sliceValue}
            setSliceValue={setSliceValue}
          />
        </Suspense>
      }
      <SubscribePage />
    </>
  );
}

export default App;
