import { ConfigProvider } from "antd";
import { StyleProvider } from '@ant-design/cssinjs';
import React from "react";

type Props = {
    children: React.ReactNode
}

export const ThemeProvider = ({children}: Props) => {
    return <ConfigProvider
        theme={{
            components: {
                Button: {
                    // colorText: "white",
                    // colorPrimaryTextHover:"white",
                    // borderColorDisabled: "true",
                    colorPrimary: '#72be43',
                    colorPrimaryBgHover: '#61a138'
                },
                
            }
        }}
    >
        <StyleProvider hashPriority="high">
            {children}
        </StyleProvider>
    </ConfigProvider>
}