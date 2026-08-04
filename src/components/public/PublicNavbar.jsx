import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function PublicNavbar() {

    return (

        <header className="border-b border-slate-800 bg-slate-900">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >

                    <BookOpen
                        className="text-blue-500"
                        size={28}
                    />

                    <div>

                        <h1 className="text-xl font-bold text-white">

                            বাংলা অভিধান

                        </h1>

                    </div>

                </Link>

                <nav className="flex items-center gap-8">

                    <Link
                        to="/"
                        className="text-slate-300 hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        to="/about"
                        className="text-slate-300 hover:text-white"
                    >
                        About
                    </Link>

                    <Link
                        to="/login"
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            text-white
                            hover:bg-blue-700
                        "
                    >
                        Login
                    </Link>

                </nav>

            </div>

        </header>

    );

}