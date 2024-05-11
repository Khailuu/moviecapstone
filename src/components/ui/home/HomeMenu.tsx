import { useState } from "react";
import { Tabs } from "antd";
import { useGetLichChieuHeThongRap } from "hooks/api/useGetLichChieuHeThongRap";

type TabPosition = 'left' | 'right' | 'top' | 'bottom';

export const HomeMenu = () => {
    const { data: rapList } = useGetLichChieuHeThongRap()
    console.log(rapList)
    const [tabPosition] = useState<TabPosition>('left');
  return (
    <div>
            <>
                <Tabs tabPosition={tabPosition}>
                    {rapList?.map((rap, i) => {
                        const id = String(i + 1);
                        return (
                            <Tabs.TabPane
                                tab={
                                    <div>
                                        <img src={rap.logo} alt={rap.tenHeThongRap} style={{ width: '60px', marginRight: '8px' }} />
                                        
                                    </div>
                                }
                                key={id}
                            >
                                {`Content of Tab ${id}`}
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
            </>
        </div>
  );
};
