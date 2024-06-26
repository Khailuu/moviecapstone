import { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useGetThongTinPhim } from "hooks/api/useGetThongTinPhim";
import { usePostPhimUpload } from "hooks/api/usePostPhimUpload";
// import moment from "moment";
import { toast } from "react-toastify";
import { PATH } from "constant";
// import { useAppDispatch } from "store";
// import { quanLyPhimActionThunks } from "store/quanLyPhim";

type SizeType = Parameters<typeof Form>[0]["size"];
type FormValues = {
  tenPhim: string;
  trailer: string;
  moTa: string;
  ngayKhoiChieu: string;
  dangChieu: boolean;
  sapChieu: boolean;
  hot: boolean;
  danhGia: number;
  hinhAnh: File | null;
  maNhom: string;
};

const addFilmSchema = Yup.object().shape({
  tenPhim: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Không được để trống"),
  trailer: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long!")
    .required("Không được để trống"),
  moTa: Yup.string().required("Không được để trống"),
  ngayKhoiChieu: Yup.string().required("Không được để trống"),
  danhGia: Yup.number().min(1).max(10).required("Không được để trống"),
});

export const EditFilm = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [imgSrc, setImgSrc] = useState<string>("");
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const { maPhim } = useParams<{ maPhim: string }>();
  const maPhimParse = parseInt(maPhim || "", 10);
  const { data: thongTinPhim } = useGetThongTinPhim(maPhimParse);

  const handleChangeSwitch = (name: keyof FormValues) => {
    return (value: boolean) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/gif")
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
      };
    }
  };
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const mutation = usePostPhimUpload() 
  const handleChangeDatePicker = (value: any) => {
    formik.setFieldValue("ngayKhoiChieu", value.format("DD/MM/YYYY"))

  };
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      tenPhim: thongTinPhim?.tenPhim || "",
      trailer: thongTinPhim?.trailer || "",
      moTa: thongTinPhim?.moTa || "",
      ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu || "",
      dangChieu: thongTinPhim?.dangChieu || false,
      sapChieu: thongTinPhim?.sapChieu || false,
      hot: thongTinPhim?.hot || false,
      danhGia: thongTinPhim?.danhGia || 0,
      hinhAnh: null,
      maNhom: "GP03",
    },
    validationSchema: addFilmSchema,
    onSubmit: (values: FormValues) => {
      console.log(values);
      // const formattedDate = dayjs(values.ngayKhoiChieu, dateFormat).format(
      //   "DD-MM-YYYY"
      // );
      // console.log(formattedDate)
      const formData = new FormData();
      formData.append("tenPhim", values.tenPhim);
      formData.append("trailer", values.trailer);
      formData.append("moTa", values.moTa);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("dangChieu", values.dangChieu.toString());
      formData.append("sapChieu", values.sapChieu.toString());
      formData.append("hot", values.hot.toString());
      formData.append("danhGia", values.danhGia.toString());
      formData.append("maNhom", values.maNhom);
      console.log(formData)
      if (values.hinhAnh) {
        formData.append("hinhAnh", values.hinhAnh, values.hinhAnh.name);
      }
      // dispatch(quanLyPhimActionThunks.editMovieThunk(formData)).unwrap()
      // .then(() => {
      //   toast.success("Cập nhật phim thành công")
      // })
      // .catch((err) => {
      //   console.log(formData)
      //  console.log(err)
      // })
      mutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Cập nhật phim thành công!");
          navigate(PATH.films);
        },
        onError: () => {
          toast.error("Cập nhật phim không thành công!");
        }
      });
    },
  });

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
        Cập Nhật phim
      </h3>
      <div className="container ms-auto">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          style={{ maxWidth: 1000 }}
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tên Phim">
            <Input
              name="tenPhim"
              value={formik.values.tenPhim}
              onChange={formik.handleChange}
            />
            {formik.errors.tenPhim && formik.touched.tenPhim ? (
              <div className="text-red-500">{formik.errors.tenPhim}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Trailer">
            <Input
              name="trailer"
              value={formik.values.trailer}
              onChange={formik.handleChange}
            />
            {formik.errors.trailer && formik.touched.trailer ? (
              <div className="text-red-500">{formik.errors.trailer}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Mô Tả">
            <Input
              name="moTa"
              value={formik.values.moTa}
              onChange={formik.handleChange}
            />
            {formik.errors.moTa && formik.touched.moTa ? (
              <div className="text-red-500">{formik.errors.moTa}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu">
            <DatePicker
              format="DD/MM/YYYY"
              onChange={handleChangeDatePicker}
            />
            {/* {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu ? (
              <div className="text-red-500">{formik.errors.ngayKhoiChieu}</div>
            ) : null} */}
          </Form.Item>
          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch
              style={{ width: 40 }}
              checked={formik.values.dangChieu}
              onChange={handleChangeSwitch("dangChieu")}
            />
          </Form.Item>
          <Form.Item label="Sắp chiếu" valuePropName="checked">
            <Switch
              style={{ width: 40 }}
              checked={formik.values.sapChieu}
              onChange={handleChangeSwitch("sapChieu")}
            />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch
              style={{ width: 40 }}
              checked={formik.values.hot}
              onChange={handleChangeSwitch("hot")}
            />
          </Form.Item>
          <Form.Item label="Rates">
            <InputNumber
              min={1}
              max={10}
              value={formik.values.danhGia}
              onChange={(value) => formik.setFieldValue("danhGia", value)}
            />
            {formik.errors.danhGia && formik.touched.danhGia ? (
              <div className="text-red-500">{formik.errors.danhGia}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Tải ảnh lên">
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              onChange={handleChangeFile}
            />
            {formik.errors.hinhAnh && formik.touched.hinhAnh ? (
              <div className="text-red-500">{formik.errors.hinhAnh}</div>
            ) : null}
            <img
              className="w-[120px] mt-[15px]"
              src={imgSrc === "" ? thongTinPhim?.hinhAnh : imgSrc}
              alt="Preview"
            />
          </Form.Item>
          <Form.Item label="Tác Vụ">
            <button
              style={{
                backgroundColor: "#90c63f",
                padding: "10px 0",
                width: 140,
              }}
              type="submit"
            >
              Cập Nhật
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
