import { Search, X } from "lucide-react";

export default function SearchInput({

    value,
    onChange,
    onSearch,
    onClear,
    placeholder = "Search...",

}) {

    return (

        <div className="relative">

            {/* Search Icon */}

            <Search
                size={18}
                className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                "
            />

            {/* Input */}

            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={(e) => {

                    if (e.key === "Enter") {
                        onSearch();
                    }

                }}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    py-3
                    pl-12
                    pr-28
                    text-white
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                "
            />

            {/* Clear Button */}

            {value && (

                <button
                    type="button"
                    onClick={onClear}
                    title="Clear Search"
                    className="
                        absolute
                        right-16
                        top-1/2
                        -translate-y-1/2
                        rounded-full
                        p-1
                        text-slate-400
                        transition
                        hover:bg-slate-700
                        hover:text-white
                    "
                >

                    <X size={18} />

                </button>

            )}

            {/* Search Button */}

            <button
                type="button"
                onClick={onSearch}
                className="
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    bg-blue-600
                    px-3
                    py-1.5
                    text-sm
                    text-white
                    hover:bg-blue-700
                "
            >

                Search

            </button>

        </div>

    );

}