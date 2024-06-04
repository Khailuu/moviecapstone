import { Tabs } from 'antd'
import { TabUserInfo } from 'components/ui'

const tabItems = [
    {
        label: 'Thông tin tài khoản',
        key: 'thongTinTaiKhoan',
        children: <TabUserInfo />,
    },
]

export const UserInfoTemplate = () => {
    // const { data } = useQuery({
    //     queryKey: ['UserInfo'],
    //     queryFn: () => qlNguoiDungServices.getUserInfo(),
    // })

    // Nếu user cập nhật thành công:
    // B1: Lưu lại thông tin mới vào local storage
    // B2: Set giá trị store redux đang lưu userLogin

    return (
        <div>
            <Tabs tabPosition="left" items={tabItems} />
        </div>
    )
}
