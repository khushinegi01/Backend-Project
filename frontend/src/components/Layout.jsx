import { Outlet } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { fetchCurrentUser } from "../features/auth/authSlice";
import React from 'react'
import Navbar from "./Navbar";
import { useEffect } from "react";

function Layout({children}) {
    const dispatch = useDispatch()
    const { user , loading , isAuthenticated } = useSelector((state)=>state.auth)
    useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
    return (
        <>
            <Navbar user={user} isAuthenticated={isAuthenticated}/>
            <main className="min-h-screen">
                <Outlet/>
            </main>
            
        </>
    )
}

export default Layout
