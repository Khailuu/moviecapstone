import { Card } from "components/ui";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getHistoryBookingThunk } from "store/quanLyNguoiDung/thunk";

export const TicketInfo = () => {
  const dispatch = useAppDispatch();
  const { historyBooking } = useSelector((state: RootState) => state.quanLyNguoiDung);

  useEffect(() => {
    dispatch(getHistoryBookingThunk());
  }, [dispatch]);

  return (
    <div>
      {historyBooking?.map((booking, key) => (
        <Card className="!mt-20" key={key}>
          <p className="text-20 text-[var(--primary-color)]">{booking.tenPhim}</p>
          <p>Mã vé: {booking.maVe}</p>
          <p>Ngày đặt: {booking.ngayDat.slice(0, 10)}</p>
          <p>Giá vé: {booking.giaVe}</p>
          <div>
            Danh sách ghế: {booking.danhSachGhe.map((a, index) => (
              <span key={index}>{a.tenGhe} </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
