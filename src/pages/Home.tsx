import { HomeMenu } from "components/ui/home";
import { Hometemplate } from "template";
import { HomeCarousel } from "ui";

export const Home = () => {
  return (
    <div>
      <div className="w-full mb-[80px]">
        <HomeCarousel />
      </div>
      <div className="mx-auto container">
        <Hometemplate />
      </div>
      <div className="container mx-auto mt-7 mb-7" style={{ maxWidth: 1024 }}>
        <HomeMenu />
      </div>
    </div>
  );
};
