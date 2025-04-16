import { Suspense, lazy } from "react";

import "./App.css";

import Router from "../Routes/Routes";

import PuffLoader from "react-spinners/PuffLoader";
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
  return (
    <>
      <Header />
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
          <Router></Router>
        </Suspense>
      }
    </>
  );
}

export default App;
