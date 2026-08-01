import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import DictionaryList from "../pages/dictionary/DictionaryList";

export default function AppRoutes() {

    return (

        <Routes>

            {/* ----------------------------------------------
             | Public Routes
             ---------------------------------------------- */}

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

            {/* ----------------------------------------------
             | Protected Routes
             ---------------------------------------------- */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dictionary"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <DictionaryList />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}