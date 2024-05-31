import {Card as CardA , CardProps as CardPropsA} from "antd"
import { CardGridProps, CardMetaProps } from "antd/es/card"

type CardObject = {
    (props:CardPropsA) : JSX.Element
    Meta : React.FC<CardMetaProps>
    Grid : React.FC<CardGridProps>
}

export const Card:CardObject = (props) => {
  return (
    <CardA {...props}/>
  )
}

Card.Meta = CardA.Meta
Card.Grid = CardA.Grid