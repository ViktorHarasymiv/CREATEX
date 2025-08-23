import Hero from "../Hero/Hero";
import NewArrivals from "../NewArrivals/NewArrivals";

function Home({ valute }) {
  return (
    <>
      <Hero />
      <NewArrivals valute={valute} />
    </>
  );
}

export default Home;
