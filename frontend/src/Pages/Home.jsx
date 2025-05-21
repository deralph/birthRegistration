import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to Birth Registration Website"}
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <MessageForm />
    </>
  );
};

export default Home;
