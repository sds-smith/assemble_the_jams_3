import {FC, ButtonHTMLAttributes } from "react"
import { CustomButton } from "./button.styles"

type ButtonProps = {
    children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ( {onClick, children, ...otherProps}) => {
    return (
        <CustomButton 
            onClick={onClick} 
            {...otherProps}  
        >
            {children}
        </CustomButton>
    )
}

export default Button