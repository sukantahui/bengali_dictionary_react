import useDictionary from "../../hooks/useDictionary";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/form/SearchInput";
import DataTable from "../../components/table/DataTable";
import Pagination from "../../components/pagination/Pagination";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";

export default function DictionaryList() {


    const [searchParams, setSearchParams] = useSearchParams();
    const initialSearch =
        searchParams.get("search") || "";

    const highlightId =
        Number(searchParams.get("highlight")) || null;


    const navigate = useNavigate();

    const {
        words,
        search,
        setSearch,
        pagination,
        loading,
        fetching,
        loadWords,
    } = useDictionary(initialSearch);

    useEffect(() => {
        if (search === "") {
            loadWords(1);
        }
    }, [search]);

    function handleSearch() {

        if (search.trim()) {

            setSearchParams({
                search,
            });

        } else {

            setSearchParams({});

        }

        loadWords(1);

    }

    function handleClear() {

        setSearch("");

        setSearchParams({});

    }


    if (loading) {
        return <Loader text="Loading Dictionary..." />;
    }

    return (

        <div className="space-y-8">

            {/* Page Header */}
            <PageHeader
                title="Dictionary"
                subtitle={
                    <>
                        Showing <strong>{pagination.from}</strong>
                        {" - "}
                        <strong>{pagination.to}</strong>
                        {" of "}
                        <strong>{pagination.total}</strong>
                        {" words"}

                        <br />

                        Page <strong>{pagination.currentPage}</strong>
                        {" of "}
                        <strong>{pagination.lastPage}</strong>
                    </>
                }
                buttonText="+ Add Word"
                onButtonClick={() => navigate("/dictionary/create")}
            />
            {/* Search */}
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={() => setSearchParams(
                    search ? { search } : {}
                )}
                onClear={() => {
                    setSearch("");
                    setSearchParams({});
                }}
            />


            <DataTable
                columns={[
                    { key: "word", label: "Word" },
                    { key: "meaning", label: "Meaning" },
                    {
                        key: "actions",
                        label: "Actions",
                        width: "120px",
                        render: (row) => (
                            <button
                                onClick={() => navigate(`/dictionary/${row.id}/edit`)}
                                className="
                                rounded-lg
                                bg-amber-600
                                px-3
                                py-2
                                text-sm
                                hover:bg-amber-700"
                            >
                                ✏ Edit
                            </button>
                        ),
                    }
                ]}
                data={words}
                startIndex={pagination.from}
                highlightId={highlightId}
            />

            {/* Pagination */}
            <Pagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={loadWords}
                loading={fetching}
            />

        </div>

    );

}