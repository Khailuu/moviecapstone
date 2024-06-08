import { useGetUserInfo } from "hooks/api";
import { Fragment } from "react/jsx-runtime";

export const KetQuaDatVe = () => {
  const { data: infoList } = useGetUserInfo();
  // Debugging log to check the structure of infoList
  // Ensure infoList is an array before mapping

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-[#90c63f]">
            Lịch sử đặt vé
          </h1>
        </div>
        <div className="flex flex-wrap -m-2">
          {infoList?.thongTinDatVe.map((info: any, index) => {
            return (
              <Fragment key={index}>
                {info.danhSachGhe.map((ticket: any) => {
                  return (
                    <div
                      key={ticket.maVe}
                      className="p-2 lg:w-1/3 md:w-1/2 w-full"
                    >
                      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img
                          alt="team"
                          className="w-[100px] h-[100px] bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                          src={info.hinhAnh}
                        />
                        <div className="flex-grow">
                            <h1 className="text-[#90c63f] text-[20px] !mb-[5px]">
                                {
                                    ticket.tenHeThongRap
                                }
                            </h1>
                          <h2 className="text-white">
                            {info.tenPhim}
                          </h2>
                          <p className="my-[8px] text-[#90c63f]">Ghế: {ticket.tenGhe}</p>
                          <p className="text-gray-500">{info.ngayDat}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
