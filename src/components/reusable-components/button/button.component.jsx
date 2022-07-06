import { CustomButton } from "./button.styles"

const Button = ( {onClick, children, ...otherProps}) => {
    return (
        <CustomButton onClick={onClick} {...otherProps}  >{children}</CustomButton>
    )
}

export default Button