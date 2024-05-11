import React from "react";
import { Carousel } from "antd";
import { useGetBannerList } from "hooks/api";
const contentStyle: React.CSSProperties = {
  height: "800px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export const HomeCarousel = () => {
  const { data: bannerList } = useGetBannerList();
  console.log(bannerList);
  return (
    <Carousel effect="fade" className="relative">
      {bannerList?.map((banner, index) => {
        return (
          <div key={index}>
            <h3 style={contentStyle}>
              <img src={banner.hinhAnh} className="w-full h-full bg-center"  alt="" />
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
};
