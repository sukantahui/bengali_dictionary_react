import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />

            <Route
                path="/login"
                element={
                    <MainLayout>
                        <Login />
                    </MainLayout>
                }
            />

            <Route
                path="/register"
                element={
                    <MainLayout>
                        <Register />
                    </MainLayout>
                }
            />

        </Routes>

    );

}