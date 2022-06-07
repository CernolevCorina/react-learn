import { Outlet } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import NavBar from './NavBar'

const Layout = () => {
    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <NavBar/>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    )
};

export default Layout;