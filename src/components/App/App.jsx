import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Suspense, lazy } from "react";

import { useLocation } from "react-router-dom";

import "./App.css";
import "../../styles/checkbox.css";

import Router from "../Routes/Routes";

import PuffLoader from "react-spinners/PuffLoader";
import Subscribe from "../Subscribe/Subscribe";
import SubscribePage from "../Subscribe/SubscribePage";
import Footer from "../Footer/Footer";

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
  const [sliceValue, setSliceValue] = useState(8);

  /* STORAGE */

  useEffect(() => {
    localStorage.setItem("valute", JSON.stringify(valute));
  }, [valute]);

  useEffect(() => {
    setChangeValue("All");
  }, [location]);

  // HERO OFSET

  const [heroOffset, setHeroOffset] = useState(0);

  // BASKET

  const SyncReduxWithLocalStorage = () => {
    const dataArray = useSelector((state) => state.basket.basketArr);

    useEffect(() => {
      localStorage.setItem("reduxArray", JSON.stringify(dataArray));
    }, [dataArray]);

    return null;
  };

  // PROFILE

  const syncProfileArrayWithLocaleStorage = () => {
    const profile = useSelector((state) => state.account.profile);

    useEffect(() => {
      localStorage.setItem("profileArray", JSON.stringify(profile));
    }, [profile]);

    return null;
  };

  // LOGGED

  const isLoggedUser = () => {
    const loggedUser = useSelector((state) => state.account.isLogged);

    useEffect(() => {
      localStorage.setItem("isLogged", JSON.stringify(loggedUser));
    }, [loggedUser]);

    return null;
  };

  // CURRENT USER

  const currentUser = () => {
    const currentUser = useSelector((state) => state.account.loggedUser);

    useEffect(() => {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    return null;
  };

  syncProfileArrayWithLocaleStorage();
  SyncReduxWithLocalStorage();
  isLoggedUser();
  currentUser();

  const openSubscribePanel = () => {
    setSubscribe((prevState) => !prevState);
  };

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

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
        heroOffset={heroOffset}
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
            setHeroOffset={setHeroOffset}
          />
        </Suspense>
      }
      <SubscribePage />
      <Footer />
    </>
  );
}

export default App;
