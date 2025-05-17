import React from "react";

import Hero from "../Hero/Hero";
import NewArrivals from "../NewArrivals/NewArrivals";

function Home({ valute, setHeroOffset }) {
  return (
    <>
      <Hero setHeroOffset={setHeroOffset} />
      <NewArrivals valute={valute} />
    </>
  );
}

export default Home;
