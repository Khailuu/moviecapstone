import { Card, Skeleton } from "antd";
import { useGetPhimList } from "hooks/api";
import { useState } from "react";
import Slider from "react-slick";
import '../../assets/button.css'
import { generatePath, useNavigate } from "react-router-dom";
import { PATH } from "constant";
import { useAuth } from "hooks";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "none" }}
      onClick={onClick}
    />
  );
}

export const Hometemplate = () => {
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState("showingNow")
  const [isShowingNow, setIsShowingNow] = useState(true)
  const handleShowingNowClick = () => {
    setIsShowingNow(true)
    setActiveButton('showingNow');
  };
  
  const handleUpcomingClick = () => {
    setIsShowingNow(false)
    setActiveButton('upcoming')
  };

  const {userLogin } = useAuth()
  console.log(userLogin)

  
  const { data: phimList, isFetching: isFetchingPhimList } = useGetPhimList();
  const filteredPhimList = phimList?.filter(phim => {
    if (isShowingNow) {
      return phim.dangChieu === true
    } else {
      return phim.dangChieu === false
    }
  });
  // console.log(filteredPhimList)
  // skeleton 
  if (isFetchingPhimList) {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 4,
      speed: 2000,
      rows: 1,
      slidesPerRow: 2,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
      autoplay: false,
      autoplaySpeed: 2000,
    };
  
    return (
      <div className="slider-container ">
        <Slider {...settings}>
        {[...Array(18)].map((_, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: 240 }}
            cover={
              <Skeleton.Image
                className="!w-full !h-[300px]"
                style={{ height: 360 }}
                active
              />
            }
            className="!w-[90%] !my-[18px] !mx-3"
          >
            <Card.Meta title={<Skeleton.Input active />} />
            <Skeleton.Button className="mt-10" active />
          </Card>
        ))}
        </Slider>
      </div>
    );
  }
  const settings = {
    className: "left",
    leftMode: true,
    infinite: true,
    
    centerPadding: "0px",
    slidesToShow: 4,
    speed: 2000,
    rows: 1,
    slidesPerRow: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slider-container ">
      <button className={`mr-3 !h-[40px] ${activeButton === 'showingNow' ? 'active_button' : ''}`} onClick={handleShowingNowClick} >Phim đang chiếu</button>
      <button className={`!h-[40px] ${activeButton === 'upcoming' ? 'active_button' : ''}`} onClick={handleUpcomingClick}>Phim sắp chiếu</button>
      <Slider {...settings}>
        {filteredPhimList?.map((phim) => {
          
          return (
            <Card
            key={phim.maPhim}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img alt="..." style={{ height: 360 }} src={phim.hinhAnh} />
              }
              className="!w-[90%] !my-[18px] !mx-3"
            >
              <Card.Meta title={phim.tenPhim} />
              <button onClick={()=> {
                navigate(generatePath(PATH.movieDetail, { movieId: phim.maPhim }))
              }} className="buy" >Chi Tiết</button>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
  
};

// return (
//   <div className="grid grid-cols-6 gap-20">
//     {[...Array(18)].map((_, index) => (
//       <Card
//         key={index}
//         hoverable
//         style={{ width: 240 }}
//         cover={
//           <Skeleton.Image
//             className="!w-full !h-[300px]"
//             style={{ height: 360 }}
//             active
//           />
//         }
//       >
//         <Card.Meta title={<Skeleton.Input active />} />
//         <Skeleton.Button className="mt-10" active />
//       </Card>
//     ))}
//   </div>
// );