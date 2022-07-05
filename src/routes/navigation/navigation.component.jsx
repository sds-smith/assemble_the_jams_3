import { Outlet } from "react-router-dom"

const Navigation = () => {

    return (
        <div>
            <div>Header</div>
            <Outlet />
        </div>
    )
}

export default Navigation