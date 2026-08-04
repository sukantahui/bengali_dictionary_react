import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import About from "../pages/public/About";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/Dashboard";

import DictionaryList from "../pages/dictionary/DictionaryList";
import DictionaryCreate from "../pages/dictionary/DictionaryCreate";
import DictionaryEdit from "../pages/dictionary/DictionaryEdit";

import NotFound from "../pages/errors/NotFound";
import SearchResults from "../pages/public/SearchResults";

export default function AppRoutes() {

    return (

        <Routes>

            {/* =======================
                    PUBLIC ROUTES
            ======================== */}

            <Route element={<PublicLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/search"
                    element={<SearchResults />}
                />

            </Route>

            {/* =======================
                    AUTH
            ======================== */}

            <Route
                path="/login"
                element={<Login />}
            />

            {/* =======================
                  PROTECTED ROUTES
            ======================== */}

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/dictionary"
                    element={<DictionaryList />}
                />

                <Route
                    path="/dictionary/create"
                    element={<DictionaryCreate />}
                />

                <Route
                    path="/dictionary/:id/edit"
                    element={<DictionaryEdit />}
                />

            </Route>

            {/* =======================
                    404
            ======================== */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}