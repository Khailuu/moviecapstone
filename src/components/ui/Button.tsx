import {Button as ButtonA , ButtonProps as ButtonPropsA} from "antd"
import styled from "styled-components"

type ButtonPros = ButtonPropsA & {
    color?: string
}

export const Button = (props : ButtonPros) => {
    return <ButtonS {...props} />
}


const ButtonS = styled(ButtonA)<ButtonPros>`
    background: ${p => p.color} !important;
    &:hover {
        border: 2px solid yellow !important;
    }
`
