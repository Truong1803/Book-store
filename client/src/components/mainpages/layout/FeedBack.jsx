import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function FeedBack() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <div className="feedback">
      <Slider className="feedback__slider" {...settings}>
        <div className="feedback-content">
          <div className="content-icon">
            <i className="fas fa-comment-dots"></i>
          </div>
          <div className="content-text">
            <p>
              "My husband loves books. I think that book is the perfect gift for
              all holidays. I would definitely recommend your store to my family
              and friends. Always an excellent and fantastic service. Thank you
              so much."
            </p>
          </div>
          <div className="content-author">
            <p className="content-author-name">Daniel Sanders</p>
            <p className="content-author-position">manager</p>
          </div>
        </div>

        <div className="feedback-content">
          <div className="content-icon">
            <i className="fas fa-comment-dots"></i>
          </div>
          <div className="content-text">
            <p>
              "I just wanted to let you know how pleased I am with your site.
              The service is reliable, and the selection is impressive. I found
              what I needed easily and the books arrived in a timely manner.
              Keep up the great work."
            </p>
          </div>
          <div className="content-author">
            <p className="content-author-name">Sarah Jefferson</p>
            <p className="content-author-position">manager</p>
          </div>
        </div>

        <div className="feedback-content">
          <div className="content-icon">
            <i className="fas fa-comment-dots"></i>
          </div>
          <div className="content-text">
            <p>
              "I love read romance books. Is so amazing to have your love story
              in a book that you can always look back on and never forget how
              much you love each other. I love your shop, easy to order and very
              very quick delivery."
            </p>
          </div>
          <div className="content-author">
            <p className="content-author-name">Anne Robinson</p>
            <p className="content-author-position">translator</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default FeedBack;
