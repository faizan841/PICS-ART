import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TopicsCarousel = ({ handleCarousel }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          speed: 500,
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
          swipeToSlide: true,
          arrows: false,
        },
      },
    ],
  };

  const items = [
    { id: 1, title: "Nature" },
    { id: 2, title: "Animals" },
    { id: 3, title: "Travel" },
    { id: 4, title: "People" },
    { id: 5, title: "Technology" },
    { id: 6, title: "Sports" },
    { id: 7, title: "Wallpapers" },
    { id: 8, title: "UGC" },
    { id: 9, title: "Spirituality" },
    { id: 10, title: "Experimental" },
    { id: 11, title: "Archival" },
    { id: 12, title: "Film" },
    { id: 13, title: "Health" },
  ];

  return (
    <div className="container">
      <div className="slider-container">
        <Slider {...settings}>
          {items.map((item, id) => (
            <Link to={`/topics/${item.title.toLowerCase()}/photos`} key={id}>
              <Button
                sx={{
                  width: "100%",
                  paddingY: "0.7rem",
                  bgcolor: "#2f2626",
                  textAlign: "center",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                variant="contained"
                onClick={() => handleCarousel(item.title.toLowerCase())}
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopicsCarousel;
