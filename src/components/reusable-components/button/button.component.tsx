import { useState, useContext, FC, ButtonHTMLAttributes, MouseEvent, MouseEventHandler } from "react"
import { ResponsiveContext } from "../../../contexts/responsive.context";
import { CustomButton } from "./button.styles"

type ButtonProps = {
    children: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ( {onClick, children, ...otherProps}) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const { isMobile } = useContext(ResponsiveContext)
    
    const click = (e: MouseEvent<HTMLButtonElement>) => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 600)
        onClick(e)
    }

    return (
        <CustomButton 
            onClick={click}
            isMobile={isMobile}
            clicked={clicked} 
            {...otherProps}  
        >
            {children}
        </CustomButton>
    )
}

export default Button