import React, { useContext, useEffect } from "react";
import SliderNav from "./SliderNav";
import BestSeller from "./BestSeller";
import Sales from "./Sales";
import Feature from "./Feature";
import FeedBack from "./FeedBack";
import BookCourse from "./BookCourse";
import { GlobalState } from "../../../GlobalState";
function Landing() {
  const state = useContext(GlobalState);
  const [category, setCategory] = state.productsAPI.category;
  useEffect(() => {
    setCategory("");
  }, []);
  return (
    <div className="main__landing">
      <SliderNav />
      <BestSeller />
      <Sales />
      <Feature />
      <FeedBack />
      <BookCourse />
    </div>
  );
}

export default Landing;
