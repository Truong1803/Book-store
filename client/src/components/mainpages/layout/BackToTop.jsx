import React, { useState } from "react";

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setShowScroll(true);
    } else if (scrolled <= 300) {
      setShowScroll(false);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <div
      className={`backtotop${showScroll ? " active" : ""}`}
      onClick={handleBackToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};

export default BackToTop;
