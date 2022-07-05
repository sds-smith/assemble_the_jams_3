import { CustomButton } from "./button.styles"

const Button = ({onClick, children}) => {
    return (
        <CustomButton onClick={onClick}  >{children}</CustomButton>
    )
}

export default Button