import { Outlet } from "react-router-dom";

import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-slate-950">
            <PublicNavbar />
            <main className="mx-auto max-w-7xl px-4 py-10">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
}