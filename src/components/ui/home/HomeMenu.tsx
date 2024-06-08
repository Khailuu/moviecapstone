import { Tabs } from "antd";
import { useGetLichChieuHeThongRap } from "hooks/api/useGetLichChieuHeThongRap";
import "../../../assets/custom.css";
import moment from "moment";
import { NavLink, generatePath } from "react-router-dom";
import { PATH } from "constant";
import { useGetMaLichChieu } from "hooks/api";
import { useMediaQuery } from "react-responsive";

type TabPosition = "left" | "right" | "top" | "bottom";

export const HomeMenu = () => {
  const { data: rapList } = useGetLichChieuHeThongRap();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const tabPosition: TabPosition = isMobile ? "top" : "left";

  const handleItemClick = (maLichChieu?: number) => {
    useGetMaLichChieu(maLichChieu);
  };

  return (
    <div>
      <Tabs tabPosition={tabPosition}>
        {rapList?.map((rap, i) => {
          const id = String(i + 1);
          return (
            <Tabs.TabPane
              tab={
                <div>
                  <img
                    src={rap.logo}
                    alt={rap.tenHeThongRap}
                    style={{ width: isMobile ? "40px" : "60px", marginRight: "8px" }}
                  />
                </div>
              }
              key={id}
            >
              <Tabs tabPosition={tabPosition}>
                {rap.lstCumRap?.map((cumRap, i) => {
                  return (
                    <Tabs.TabPane
                      tab={
                        <div style={{ width: isMobile ? "100%" : 250, display: "flex", alignItems: "center" }}>
                          <img
                            src="https://movie-booking-project.vercel.app/img/cumRap/lotte-cinema-cong-hoa-15383860949090.jpg"
                            alt="logo"
                            style={{ width: isMobile ? 30 : 50, marginRight: 8 }}
                          />
                          <p className="text-white mt-3 ml-1 fw-bold" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {cumRap.tenCumRap}
                          </p>
                        </div>
                      }
                      key={i}
                    >
                      {cumRap.danhSachPhim?.map((phim, i) => {
                        return (
                          <div style={{ display: isMobile ? "block" : "flex", marginBottom: 30 }} key={i}>
                            <img
                              src={phim.hinhAnh}
                              style={{
                                width: isMobile ? 80 : 120,
                                height: isMobile ? 80 : 120,
                                marginBottom: isMobile ? 15 : 0,
                              }}
                              alt="logophim"
                            />
                            <div className={isMobile ? "" : "ml-[15px]"}>
                              <NavLink
                                to={generatePath(PATH.movieDetail, { movieId: phim.maPhim })}
                                className="!text-[#6bb140]"
                                style={{ fontSize: isMobile ? 18 : 24, fontWeight: "bold" }}
                              >
                                {phim.tenPhim}
                              </NavLink>
                              <p className="text-[#bab9b9] mb-[10px]">{cumRap.diaChi}</p>
                              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {phim.lstLichChieuTheoPhim?.slice(0, 10).map(
                                  (lichChieu: any, index: any) => {
                                    return (
                                      <NavLink
                                        onClick={() => {
                                          handleItemClick(lichChieu.maLichChieu);
                                        }}
                                        to={`${PATH.datVe}/${lichChieu.maLichChieu}`}
                                        className="!text-[#86de4f] text-[16px] md:text-[18px] lg:text-[20px]"
                                        key={index}
                                      >
                                        {moment(lichChieu.ngayChieuGioChieu).format("HH:mm")}
                                      </NavLink>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
