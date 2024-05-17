import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useAuth = () => {
    const { userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );
  return { userLogin }
}
