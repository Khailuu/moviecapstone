import { useGetLichChieuHeThongRap } from "hooks/api/useGetLichChieuHeThongRap";

export const Footer = () => {
  const { data: rapList } = useGetLichChieuHeThongRap();

  return (
    <div className="p-[60px] grid grid-cols-2 bg-black text-dark text-center">
      <img
        src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png"
        alt="logo"
      />
      <div>
        <h2 className="text-[#50b648]" style={{ fontSize: 40, textAlign: "left", marginBottom: 30 }}>Partner</h2>
        <div className="grid grid-cols-3">
        {rapList?.map((rap, i) => {
          return (
            <img key={i} src={rap.logo} style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 15, border: "1px solid #90c63f" }} alt="" />
          );
        })}
        </div>
      </div>
    </div>
  );
};
