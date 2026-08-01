import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="max-w-7xl mx-auto p-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}