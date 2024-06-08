import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Radio, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetThongTinPhim } from "hooks/api/useGetThongTinPhim";
import { useGetLichChieuHeThongRap } from "hooks/api";
import { CumRap, TaoLichChieu } from "types";
import { quanLyRapServices } from "services";
import { useFormik } from "formik";
import type { DatePickerProps, GetProps } from 'antd';
import { usePostLichChieu } from "hooks/api/usePostLichChieu";
import { PATH } from "constant";
import { toast } from "react-toastify";

type SizeType = Parameters<typeof Form>[0]["size"];
type LichChieu = TaoLichChieu

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;


const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  console.log('onOk: ', value);
};
export const Showtime = () => {
  const mutation = usePostLichChieu()
  const navigate = useNavigate()
  const { maPhim } = useParams<{ maPhim: string }>();
  const maPhimParsed = parseInt(maPhim || "", 10);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [selectedRap, setSelectedRap] = useState("");
  const [lstCumRap, setLstCumRap] = useState<HttpResponse<CumRap[]>>();

  const { data: phim } = useGetThongTinPhim(maPhimParsed);

  const { data: heThongRap } = useGetLichChieuHeThongRap();

  const renderRap = heThongRap?.map((rap, i) => {
    return (
      <Select.Option key={i} value={rap.maHeThongRap}>
        {rap.maHeThongRap}
      </Select.Option>
    );
  });

  useEffect(() => {
    if (selectedRap) {
      const fetchCumRap = async () => {
        const { data: cumRap } =
          await quanLyRapServices.getThongTinCumRapTheoHeThong(selectedRap);
        setLstCumRap(cumRap || []);
      };
      fetchCumRap();
    }
  }, [selectedRap]);

  const formik = useFormik<LichChieu>({
    initialValues: {
      maPhim: maPhimParsed,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: (values: LichChieu) => {
      mutation.mutate(values, {
        onSuccess: () => {
          navigate(PATH.films)
          toast.success("Tạo lịch chiếu thành công !")
        },
        onError: () => {
          toast.error("Tạo lịch chiếu không thành công !")
        }
      })
    },
  });

  const handleSelectChange = (value: string) => {
    setSelectedRap(value);
  };

  const handleChangeDatePicker = (value: any) => {
    const date = value.format("DD/MM/YYYY hh:mm:ss")
    formik.setFieldValue("ngayChieuGioChieu", date)
  }
  const handleChangeCumRap = (value: string) => {
    formik.setFieldValue("maRap", value);
  };

  return (
    <div>
      <h3
        style={{
          color: "#90c63f",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Tạo Lịch Chiếu
      </h3>
      <div className="container ms-auto w-[1200px]">
        <h3
          style={{
            color: "#90c63f",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          {phim?.tenPhim}
        </h3>
        <img src={phim?.hinhAnh} className="mb-[40px] w-[200px]" alt="logoPhim" />
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 600 }}
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Hệ Thống Rạp">
            <Select onChange={handleSelectChange}>{renderRap}</Select>
          </Form.Item>
          <Form.Item label="Chọn Cụm Rạp">
            <Select onChange={handleChangeCumRap}>
              {lstCumRap?.content.map((cumRap, i) => {
                return (
                  <Select.Option
                    name="maRap"
                    
                    key={i}
                    value={cumRap.maCumRap}
                  >
                    {cumRap.maCumRap}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Ngày Chiếu">
            <DatePicker
              showTime
              onOk={onOk}
              name="ngayChieuGioChieu"
              format="DD/MM/YYYY hh:mm:ss"
              onChange={handleChangeDatePicker}
            />
          </Form.Item>
          <Form.Item label="Gía Vé">
            <Input className="!w-[100px]" name="giaVe"  onChange={formik.handleChange} />
          </Form.Item>
          <Form.Item label="Chức Năng">
            <button className="!bg-[green] py-[6px]" type="submit">Tạo Lịch Chiếu</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
