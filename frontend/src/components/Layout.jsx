import { Outlet } from "react-router-dom";

import React from 'react'
import Navbar from "./Navbar";

function Layout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            
        </>
    )
}

export default Layout
