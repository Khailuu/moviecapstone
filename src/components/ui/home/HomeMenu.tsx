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
      {
        rapList?.map((rap, index)=>{
          return (
            <img key={index} src={rap.logo} style={{width: 40}} alt="..." />
          )
        })
      }
        <Tabs
          tabPosition={tabPosition}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
              key: id,
              children: `Content of Tab ${id}`,
            };
          })}
        />
      </>
    </div>
  );
};
