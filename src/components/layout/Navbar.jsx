import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-slate-900 border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-2xl font-bold text-white"
                >
                    📖 Bengali Dictionary
                </Link>

                <div className="flex gap-6 text-gray-300">

                    <Link
                        to="/"
                        className="hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        to="/login"
                        className="hover:text-white"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="hover:text-white"
                    >
                        Register
                    </Link>

                </div>

            </div>
        </nav>
    );
}