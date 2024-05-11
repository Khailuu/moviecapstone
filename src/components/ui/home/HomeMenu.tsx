import { useState } from "react";
import { Tabs } from "antd";
import { useGetLichChieuHeThongRap } from "hooks/api/useGetLichChieuHeThongRap";
import "../../../assets/custom.css";
import moment from "moment";
type TabPosition = "left" | "right" | "top" | "bottom";

export const HomeMenu = () => {
  const { data: rapList } = useGetLichChieuHeThongRap();
  console.log(rapList);
  const [tabPosition] = useState<TabPosition>("left");
  return (
    <div>
      <>
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
                      style={{ width: "60px", marginRight: "8px" }}
                    />
                  </div>
                }
                key={id}
              >
                <Tabs tabPosition={tabPosition}>
                  {rap.lstCumRap?.map((cumRap, i) => {
                    const id = String(i + 1);
                    return (
                      <Tabs.TabPane
                        tab={
                          <div style={{ width: 250, display: "flex" }}>
                            <img
                              src="https://movie-booking-project.vercel.app/img/cumRap/lotte-cinema-cong-hoa-15383860949090.jpg"
                              alt="logo"
                              style={{ width: 50 }}
                            />
                            <p className="text-white mt-3 ml-[15px] fw-bold">
                              {cumRap.tenCumRap}
                            </p>
                          </div>
                        }
                        key={id}
                      >
                        {cumRap.danhSachPhim?.map((phim) => {
                          return (
                            <div style={{ display: "flex" }}>
                              <img
                                src={phim.hinhAnh}
                                style={{
                                  width: 120,
                                  height: 120,
                                  marginBottom: 30,
                                }}
                                alt="logophim"
                              />
                              <div className=" ml-[15px]">
                                <h2
                                  className="text-[#6bb140]"
                                  style={{ fontSize: 24, fontWeight: "bold" }}
                                >
                                  {phim.tenPhim}
                                </h2>
                                <p className="text-white">{cumRap.diaChi}</p>
                                <div className="grid grid-cols-6">
                                  {phim.lstLichChieuTheoPhim?.slice(0, 10).map(
                                    (lichChieu: any) => {
                                      return (
                                        <h2 className="text-[#86de4f] text-[20px] mr-[15px]">
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("HH:mm")}
                                        </h2>
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
      </>
    </div>
  );
};
