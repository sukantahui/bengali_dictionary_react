import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="max-w-7xl mx-auto p-8">

                <Outlet />

            </main>

            <Footer />

        </div>

    );

}