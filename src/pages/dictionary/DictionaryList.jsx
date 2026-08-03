import useDictionary from "../../hooks/useDictionary";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/form/SearchInput";
import DataTable from "../../components/table/DataTable";
import Pagination from "../../components/pagination/Pagination";
import { deleteWord } from "../../services/dictionaryService";
import alert from "../../helpers/alert";
import notify from "../../helpers/notify";
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

    async function handleDelete(row) {
        const confirmed = await alert.confirm({
            title: "Delete Word?",
            text: `"${row.word}" will be permanently deleted.`,
            confirmText: "Delete",
            icon: "warning",
        });
        if (!confirmed) {
            return;
        }
        try {
            const response = await deleteWord(row.id);
            notify.success(response.data.message);
            loadWords(pagination.currentPage);
        } catch (error) {
            notify.error(
                error.response?.data?.message ??
                "Unable to delete word."
            );
            console.error(error);

        }

    }

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
                subtitle="Manage all Bengali dictionary entries."
                stats={[
                    {
                        label: "Total Words",
                        value: pagination.total,
                    },
                    {
                        label: "Showing",
                        value: `${pagination.from}-${pagination.to}`,
                    },
                    {
                        label: "Page",
                        value: `${pagination.currentPage}/${pagination.lastPage}`,
                    },
                ]}
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
                        width: "180px",
                        render: (row) => (
                            <div className="flex justify-center gap-2">

                                <button
                                    onClick={() => navigate(`/dictionary/${row.id}/edit`)}
                                    className="
                                        rounded-lg
                                        bg-amber-600
                                        px-3
                                        py-2
                                        text-sm
                                        hover:bg-amber-700
                                    "
                                >
                                    ✏ Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(row)}
                                    className="
                                    rounded-lg
                                    bg-red-600
                                    px-3
                                    py-2
                                    text-sm
                                    text-white
                                    hover:bg-red-700
                                "
                                >
                                    🗑 Delete
                                </button>

                            </div>
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