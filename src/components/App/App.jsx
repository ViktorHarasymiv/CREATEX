import { useEffect, useState } from "react";
import { Suspense, lazy } from "react";

import { useLocation } from "react-router-dom";

import "./App.css";

import Router from "../Routes/Routes";

import PuffLoader from "react-spinners/PuffLoader";
import Subscribe from "../Subscribe/Subscribe";

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
  const [valute, setValute] = useState("Dollar");
  const [openSubscribe, setSubscribe] = useState(false);
  const [changeValue, setChangeValue] = useState("All");

  useEffect(() => {
    setChangeValue("All");
  }, [location]);

  console.log(location);

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
          />
        </Suspense>
      }
    </>
  );
}

export default App;
