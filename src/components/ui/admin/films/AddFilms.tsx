import { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Radio, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
// import { useUploadPhim } from "hooks/api";
// import { useNavigate } from "react-router-dom";
// import { PATH } from "constant";
// import { toast } from "react-toastify";
import * as Yup from 'yup';

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

export const AddFilms = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">("default");
  const [imgSrc, setImgSrc] = useState<string>("");
  // const navigate = useNavigate()
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleChangeDatePicker = (value: any) => {
    const date = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", date);
  };

  const handleChangeSwitch = (name: keyof FormValues) => {
    return (value: boolean) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif")) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target?.result as string);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  // const mutation = useUploadPhim();

  const addFilmSchema = Yup.object().shape({
    tenPhim: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Không được để trống'),
    trailer: Yup.string()
      .min(1, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Không được để trống'),
    moTa: Yup.string().required('Không được để trống'),
    ngayKhoiChieu: Yup.string().required('Không được để trống'),
    danhGia: Yup.number().min(1).max(5).required('Không được để trống'),
    hinhAnh: Yup.mixed().required('Không được để trống'),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: null,
      maNhom: "GP03",
    },
    validationSchema: addFilmSchema,
    onSubmit: (values: FormValues) => {
      console.log(values)
      const formData = new FormData();
      formData.append('tenPhim', values.tenPhim);
      formData.append('trailer', values.trailer);
      formData.append('moTa', values.moTa);
      formData.append('ngayKhoiChieu', values.ngayKhoiChieu);
      formData.append('dangChieu', values.dangChieu.toString());
      formData.append('sapChieu', values.sapChieu.toString());
      formData.append('hot', values.hot.toString());
      formData.append('danhGia', values.danhGia.toString());
      formData.append('maNhom', values.maNhom);

      if (values.hinhAnh) {
        formData.append('hinhAnh', values.hinhAnh, values.hinhAnh.name);
      }
      
      // mutation.mutate(formData, {
      //   onSuccess: () => {
      //     toast.success("Thêm phim thành công!");
      //     // navigate(PATH.films);
      //   },
      //   onError: () => {
      //     toast.error("Thêm phim không thành công!");
      //   }
      // });
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
        Thêm mới phim
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
            <Input name="tenPhim" onChange={formik.handleChange} />
            {formik.errors.tenPhim && formik.touched.tenPhim ? (
              <div className="text-red-500">{formik.errors.tenPhim}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Trailer">
            <Input name="trailer" onChange={formik.handleChange} />
            {formik.errors.trailer && formik.touched.trailer ? (
              <div className="text-red-500">{formik.errors.trailer}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Mô Tả">
            <Input name="moTa" onChange={formik.handleChange} />
            {formik.errors.moTa && formik.touched.moTa ? (
              <div className="text-red-500">{formik.errors.moTa}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Ngày khởi chiếu">
            <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
            {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu ? (
              <div className="text-red-500">{formik.errors.ngayKhoiChieu}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Đang chiếu" valuePropName="checked">
            <Switch style={{ width: 40 }} onChange={handleChangeSwitch("dangChieu")} />
          </Form.Item>
          <Form.Item label="Sắp chiếu" valuePropName="checked">
            <Switch style={{ width: 40 }} onChange={handleChangeSwitch("sapChieu")} />
          </Form.Item>
          <Form.Item label="Hot" valuePropName="checked">
            <Switch style={{ width: 40 }} onChange={handleChangeSwitch("hot")} />
          </Form.Item>
          <Form.Item label="Rates">
            <InputNumber min={1} max={5} onChange={(value) => formik.setFieldValue("danhGia", value)} />
            {formik.errors.danhGia && formik.touched.danhGia ? (
              <div className="text-red-500">{formik.errors.danhGia}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Tải ảnh lên">
            <input type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={handleChangeFile} />
            {formik.errors.hinhAnh && formik.touched.hinhAnh ? (
              <div className="text-red-500">{formik.errors.hinhAnh}</div>
            ) : null}
            <img src={imgSrc} alt="Preview" />
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
              Thêm Phim
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
