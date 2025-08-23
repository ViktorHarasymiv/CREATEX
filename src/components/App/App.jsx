import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import "./App.css";
import "../../styles/checkbox.css";

import Router from "../Routes/Routes";

import Subscribe from "../Subscribe/Subscribe";
import SubscribePage from "../Subscribe/SubscribePage";
import Footer from "../Footer/Footer";

import SignIn from "../Authorization/Modal/SignIn/SignIn";
import SignUp from "../Authorization/Modal/SignUp/SignUp";
import Successful from "../successfulPage/successfulPage";

import Header from "./../Header/Header/Header";

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

  const [successful, setSuccessful] = useState(false);
  const [sContent, setScontent] = useState("");

  // AUTH MODAL

  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

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

  // EFFECTS

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSubscribe(true);
  //     return;
  //   }, 2000);
  // }, []);

  // AUTH

  const openModalPageSignIn = () => {
    if (signIn != true) {
      document.querySelector("html").classList.add("lock");
      setSignIn(true);
      setSignUp(false);
    } else {
      document.querySelector("html").classList.remove("lock");
      setSignIn(false);
    }
  };

  const openModalPageRegistration = () => {
    if (signUp != true) {
      document.querySelector("html").classList.add("lock");
      setSignUp(true);
      setSignIn(false);
    } else {
      document.querySelector("html").classList.remove("lock");
      setSignUp(false);
    }
  };

  const successfulOpen = () => {
    if (successful != true) {
      document.querySelector("html").classList.add("lock");
      setSuccessful(true);
    } else {
      document.querySelector("html").classList.remove("lock");
      setSuccessful(false);
    }
  };

  {
    successful &&
      setTimeout(() => {
        document.querySelector("html").classList.remove("lock");
        setSuccessful(false);
        return;
      }, 2500);
  }

  return (
    <>
      <Header
        switchSignIn={openModalPageSignIn}
        switchSignUp={openModalPageRegistration}
        openSubscribe={openSubscribePanel}
        setValute={setValute}
        valute={valute}
      />

      <Router
        valute={valute}
        filter={changeValue}
        setFilter={setChangeValue}
        sliceValue={sliceValue}
        setSliceValue={setSliceValue}
        switcher={successfulOpen}
        content={setScontent}
      />
      {openSubscribe && (
        <Subscribe
          isSubscribe={openSubscribe}
          openSubscribe={openSubscribePanel}
        />
      )}
      <SubscribePage />
      <Footer />

      {/* MODAL */}

      {signIn && (
        <SignIn
          switchSignUp={openModalPageRegistration}
          close={openModalPageSignIn}
          switchSuccess={successfulOpen}
          changeContent={setScontent}
        />
      )}
      {signUp && (
        <SignUp
          switchSignIn={openModalPageSignIn}
          close={openModalPageRegistration}
          switchSuccess={successfulOpen}
          changeContent={setScontent}
        />
      )}

      {successful && <Successful switch={successfulOpen} content={sContent} />}
    </>
  );
}

export default App;
