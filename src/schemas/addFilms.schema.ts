import { z } from "zod";

export const addFilmsSchema = z.object({
    temPhim: z.string({required_error: "Làm ơn nhập tên phim"}).min(1),

});

// biDanh: "nguoi-vo-cuoi-cung-victo-vu";
// dangChieu: true;
// danhGia: 10;
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/co-vo-cuoi-cung_gp04.jpg";
// hot: true;
// maNhom: "GP01";
// maPhim: 13769;
// moTa: "Sau sự kiện họp báo công bố dự án Người Vợ Cuối Cùng, đạo diễn Victor Vũ cùng ekip đã chính thức công bố trailer mới nhất chứa đựng đủ mọi cung bậc cảm xúc: lắng đọng với mối tình thanh mai trúc mã tuyệt đẹp của Linh và Nhân, phẫn nộ với mâu thuẫn về chuyện sinh con nối dõi tông đường của ba người vợ quan, và rồi choáng ngợp với hồi kết ly kỳ nhuốm màu đen tốiâ. \r\n";
// ngayKhoiChieu: "2024-01-30T00:00:00";
// sapChieu: true;
// tenPhim: "Người Vợ Cuối Cùng - Victo Vũ";
// trailer: "https://www.youtube.com/watch?v=ygvNCEbMusE";
