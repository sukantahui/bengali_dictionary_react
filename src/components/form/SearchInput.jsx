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
                    pr-64
                    text-white
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                "
            />

            {/* Right Side Buttons */}

            <div
                className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    -translate-y-1/2
                    items-center
                    gap-3
                "
            >

                {value && (

                    <button
                        type="button"
                        onClick={onClear}
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-lg
                            border
                            border-slate-600
                            px-3
                            py-2
                            text-sm
                            text-slate-300
                            transition
                            hover:border-red-500
                            hover:text-red-400
                            hover:bg-slate-700
                        "
                    >
                        <X size={16} />
                        Clear
                    </button>

                )}

                <button
                    type="button"
                    onClick={onSearch}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    <Search size={16} />
                    Search
                </button>

            </div>

        </div>

    );

}