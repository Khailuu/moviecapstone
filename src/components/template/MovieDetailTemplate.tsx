import { Card, Tabs } from "ui";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "store";
import { getMovieListThunk } from "store/quanLyPhim";
import { getShowTimesDetailThunk } from "store/quanLyRap";
import styled, { keyframes } from "styled-components";

export const MovieDetailTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams();
    const { accessToken } = useAuth();
    const id: number = parseInt(params.movieId!, 10);
    const { movieList, isFetchinhMovieList } = useSelector(
        (state: RootState) => state.quanLyPhim
    );
    const { showTimesDetail } = useSelector(
        (state: RootState) => state.quanLyRap
    );
    const movieDetail = movieList?.find((v) => v.maPhim === id);

    const data = showTimesDetail?.heThongRapChieu?.map((x) => {
        return x.cumRapChieu || [];
    });

    const maNhom = showTimesDetail?.maNhom;
    const returnCumRap = () => {
        const arr = data?.map((c, key) => ({
            key: `${key}`,
            label: c?.map((n) => n.tenCumRap).join(", "),
            children: c?.map((m) =>
                m.lichChieuPhim.map((z, key) => {
                    const path = generatePath(PATH.datVe, {
                        id: z.maLichChieu,
                    });
                    return (
                        <div className="grid grid-cols-8 gap-10" key={key}>
                            <Link
                                to={accessToken ? path : `${PATH.datVe}/${z.maLichChieu}`}
                                key={z.maLichChieu}
                                className="text-center border border-gray-400 p-1 cursor-pointer hover:border-black transition shadow-xl rounded-10 !text-gray-600"
                            >
                                <div className="font-bold">
                                    {z.ngayChieuGioChieu.slice(0, 10)}
                                </div>
                                <div>{z.ngayChieuGioChieu.slice(11)}</div>
                            </Link>
                        </div>
                    );
                })
            ),
        }));

        return arr;
    };

    useEffect(() => {
        dispatch(getMovieListThunk({ a: maNhom, b: "GP03" }));
        dispatch(getShowTimesDetailThunk(id));
    }, [dispatch, id, maNhom]);

    if (isFetchinhMovieList) {
        return (
            <div>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            <div className="relative">
                <div
                    className="bg-[url(https://cdn.sforum.vn/sforum/wp-content/uploads/2022/03/3575769.webp)] bg-no-repeat bg-cover absolute z-2 top-0 left-0 w-full h-full"
                    style={{
                        filter: "brightness(50%)",
                    }}
                />
                <div className="flex relative z-10 p-11">
                    <div className="w-4/12">
                        <img
                            className="max-w-[350px] rounded-5"
                            src={movieDetail?.hinhAnh}
                            alt="Movie Poster"
                        />
                    </div>
                    <div className="w-8/12">
                        <h3 className="mb-4 text-4xl font-600 leading-none tracking-tight text-gray-300 dark:text-white">
                            {movieDetail?.tenPhim}
                        </h3>
                        <hr className="my-10" />
                        <p className="text-red-400 text-[20px] py-[10px]">
                            Mô tả :{" "}
                            <span className="text-white text-[16px]">
                                {movieDetail?.moTa}
                            </span>
                        </p>
                        <p className="text-red-400 text-[20px] py-[10px]">
                            Đánh giá :{" "}
                            <span className="text-white text-[16px]">
                                {movieDetail?.danhGia}
                            </span>
                        </p>
                        <p className="text-red-400 text-[20px] py-[10px]">
                            Ngày khởi chiếu :{" "}
                            <span className="text-white text-[16px]">
                                {movieDetail?.ngayKhoiChieu.slice(0, 10)}
                            </span>
                        </p>
                        <iframe
                            className="mt-10"
                            width="750"
                            height="315"
                            src={movieDetail?.trailer}
                            title="Embedded Video"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="my-10 p-20">
                <TitleWrapper>
                    <h1>Có thể bạn sẽ thích</h1>
                    <i className="fa-solid fa-star"></i>
                </TitleWrapper>
                <div className="grid grid-cols-5 gap-10">
                    {movieList ? (
                        movieList
                            ?.filter((v) => v.maPhim !== movieDetail?.maPhim)
                            .slice(0, 8)
                            .map((v) => {
                                return (
                                    <div className="mb-10" key={v?.maPhim}>
                                        <Card
                                            hoverable
                                            style={{ maxWidth: 350 }}
                                            cover={
                                                <img
                                                    style={{
                                                        height: 300,
                                                    }}
                                                    alt="Movie Cover"
                                                    src={v?.hinhAnh}
                                                />
                                            }
                                        >
                                            <Card.Meta
                                                className="h-[120px] p-10"
                                                title={v?.tenPhim}
                                                description={`${v?.moTa.substring(
                                                    0,
                                                    50
                                                )}...`}
                                            />
                                            <button
                                                className="text-center border border-gray-400 p-1 cursor-pointer hover:border-black transition shadow-xl rounded-10 !text-gray-600"
                                                onClick={() => {
                                                    const path = generatePath(
                                                        PATH.movieDetail,
                                                        {
                                                            movieID: v.maPhim,
                                                        }
                                                    );
                                                    navigate(path);
                                                }}
                                            >
                                                Chi tiết phim
                                            </button>
                                        </Card>
                                    </div>
                                );
                            })
                    ) : (
                        <div>Dữ liệu đang được cập nhật</div>
                    )}
                </div>
            </div>
            <div>
                <h1 className="mt-20 text-3xl font-400 text-stone-700 text-center mb-20">
                    Lịch Chiếu {movieDetail?.tenPhim}
                </h1>
                {showTimesDetail?.heThongRapChieu?.length ? (
                    <Tabs tabPosition="top" items={returnCumRap()}></Tabs>
                ) : (
                    <NoScheduleMessage>
                        Phim hiện chưa được công chiếu
                    </NoScheduleMessage>
                )}
            </div>
        </div>
    );
};

const NoScheduleMessage = styled.div`
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    font-size: 18px;
    color: #555;
`;

const TitleWrapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    h1 {
        transition: all 0.3s ease-in-out;
        font-size: 30px;
        margin-right: 10px;
        color: #85144b;
        &:hover {
            color: #b10dc9;
            text-shadow: #b10dc9 0 0 1px;
        }
    }

    i {
        color: #ffdc00;
        font-size: 24px;
        transition: color 0.3s ease-in-out;
    }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;
