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
                    colorPrimary: 'red',
                    colorPrimaryHover: 'red'
                }
            }
        }}
    >
        <StyleProvider hashPriority="high">
            {children}
        </StyleProvider>
    </ConfigProvider>
}