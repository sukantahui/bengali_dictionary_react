export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
    loading = false,
}) {

    return (

        <div className="mt-6 flex items-center justify-between">

            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={loading || currentPage === 1}
                className="
                    rounded-lg
                    bg-slate-700
                    px-4
                    py-2
                    transition-colors
                    hover:bg-slate-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >

                ← Previous

            </button>

            <span className="text-slate-400">

                Page <strong>{currentPage}</strong> of{" "}
                <strong>{lastPage}</strong>

            </span>

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={loading || currentPage === lastPage}
                className="
                    rounded-lg
                    bg-slate-700
                    px-4
                    py-2
                    transition-colors
                    hover:bg-slate-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                Next →
            </button>
        </div>
    );

}