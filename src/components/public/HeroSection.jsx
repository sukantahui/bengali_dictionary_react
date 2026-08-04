import { Search } from "lucide-react";

export default function HeroSection({

    search,
    onSearchChange,
    onSearch,

}) {

    return (

        <section className="py-20 text-center">

            <h1 className="text-5xl font-bold text-white">

                বাংলা অভিধান

            </h1>

            <p className="mt-6 text-lg text-slate-400">

                Explore Bengali words, meanings and related words instantly.

            </p>

            <div className="mx-auto mt-10 max-w-2xl">

                <div className="relative">

                    <Search
                        className="
                            absolute
                            left-5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={onSearchChange}
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                onSearch();

                            }

                        }}
                        placeholder="Search Bengali word..."
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-700
                            bg-slate-900
                            py-5
                            pl-14
                            pr-36
                            text-lg
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    />

                    <button
                        type="button"
                        onClick={onSearch}
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-2
                            font-medium
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >

                        Search

                    </button>

                </div>

            </div>

        </section>

    );

}