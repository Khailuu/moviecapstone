import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useAuth = () => {
    const {accessToken, userLogin } = useSelector(
        (state: RootState) => state.quanLyNguoiDung
    );
  return { 
    accessToken,
    userLogin }
}
