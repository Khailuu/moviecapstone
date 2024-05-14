import { useGetMaLichChieu } from "hooks/api";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "store";
import style from "./phongVe.module.css";
import { QuanLyDatVe } from "types";
import { quanLyNguoiDungAction } from "store/quanLyNguoiDung/slice";
import '../../../assets/custom.css';
import './phongVe.css'
import { CloseOutlined } from "@ant-design/icons";

export const PhongVe = () => {
  // get mã lịch chiếu từ url
  const { maLichChieu } = useParams<{ maLichChieu: string }>();

  // Kiểm tra nếu maLichChieu là undefined và xử lý nó
  if (!maLichChieu) {
    return <div>Không có mã lịch chiếu.</div>;
  }

  const malichchieu = parseInt(maLichChieu, 10);
  console.log(maLichChieu)
  const dispatch = useDispatch()
  const { cartList } = useSelector((state: RootState) => state.quanLyNguoiDung)
  const { userLogin } = useSelector(
    (state: RootState) => state.quanLyNguoiDung
  );

  const tenGhe: string[] = []
  const prices: number[] = []

  if (!malichchieu || isNaN(Number(malichchieu))) {
    return null;
  }

  const { data: list } = useGetMaLichChieu(Number(malichchieu));

  if (!list) {
    return null;
  }
  console.log(cartList)

  cartList.map((item) => {
    tenGhe.push(item.tenGhe)
    prices.push(item.giaVe)
  })
  // tính tổng giá vé trong cartList
  const totalPrice: number = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
  const { danhSachGhe, thongTinPhim }: QuanLyDatVe = list;
  return (
    <div className="container mx-auto my-[80px]">
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className={style.container}>
            <div
              style={{ width: "80%", height: 15, backgroundColor: "white" }}
            ></div>
            <div id={style.trapezoid}></div>
            <div className='content'>
            {
              danhSachGhe.map((ghe: any , i)=>{
                const classGheVip:any = ghe.loaiGhe === "Vip" ? "gheVip" : '' 
                const classGheDaDat:any = ghe.daDat === true ? "gheDaDat" : '' 
                let classGheDD: any = '';
                const indexGheDD = cartList.findIndex
                ((gheDD) => {

                  return gheDD.maGhe === ghe.maGhe}
                  )
                
                if(indexGheDD !== -1) {
                  classGheDD = "gheDangDat"
                }


                return (
                  <button onClick={()=>{
                    
                    dispatch(quanLyNguoiDungAction.addToCart(ghe))
                  }} disabled={classGheDaDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDD} `} key={i}>
                    {ghe.daDat ? <CloseOutlined /> : ghe.stt}
                  </button>
                )
              })
            }
            </div>
          </div>
        </div>
        <div className="col-span-3  col-start-10 text-white sticky-top-80">
          <h3 className="text-[#90c63f] text-center text-[32px] mb-[15px]">Tổng cộng: {totalPrice.toLocaleString('vi-VN')} đ</h3>
          <hr />
          <h3 className="text-xl my-[15px]">{thongTinPhim.tenPhim}</h3>
          <p>Địa điểm: {thongTinPhim.diaChi}</p>
          <p className="my-[10px]">Ngày chiếu: {thongTinPhim.ngayChieu}</p>
          <p className="mb-[15px]">Giờ chiếu: {thongTinPhim.gioChieu}</p>
          <hr />
          <div className="grid grid-cols-2 my-5">
            <div className="col-span-1">
              <span className="text-red-400 text-[30px] !mr-[10px]">Ghế:
              {
                tenGhe.sort((a: any, b: any) => a - b).map((soGhe, i) => {
                  return (
                    <span key={i} className="text-white  mr-[10px]">
                      {soGhe}
                    </span>
                  )
                })
              }
              </span>
            </div>
            <div className="text-right col-span-1 text-[#90c63f] text-[25px]">
              {totalPrice.toLocaleString()} đ
            </div>
          </div>
          <hr />
          <div className="my-5">
            <h3>Email</h3>
            {userLogin?.email}
          </div>
          <div className="my-5">
            <h3>Phone</h3>
            {userLogin?.soDT}
          </div>
          <hr />
          <div className="mb-0 mt-9">
            <button
              style={{ width: "100%", backgroundColor: "#90c63f", height: 42, fontWeight: 'bolder', fontSize: 20 }}
            >
              Đặt Vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
