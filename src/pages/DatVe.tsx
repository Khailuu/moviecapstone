import { Tabs } from 'antd';
import { PhongVe } from 'components/ui/datVe';
import { KetQuaDatVe } from 'components/ui/datVe/KetQuaDatVe';
import { useAuth } from 'hooks';
import { useEffect } from 'react';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    color: white !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #aff14d !important;
  }

  .ant-tabs-ink-bar {
    background-color: #aff14d !important;
  }
`;



export const DatVe = () => {
  const { userLogin } = useAuth()
  const navigate = useNavigate()
  
  console.log(userLogin)

  useEffect(()=>{
    if(!userLogin) {
      navigate('/login')
    }
  }, [userLogin])
  const items = [
    {
      label: '01: CHỌN GHẾ & THANH TOÁN',
      key: 'chonghethanhtoan',
      children: <PhongVe />
    },
    {
      label: '02: KẾT QUẢ ĐẶT VÉ',
      key: 'ketquadatve',
      children: <KetQuaDatVe />
    },
  ];

  return (
    <div>
      <StyledTabs
        defaultActiveKey="chonghethanhtoan"
        centered
        items={items}
      />
    </div>
  );
};
