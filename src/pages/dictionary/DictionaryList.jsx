import useDictionary from "../../hooks/useDictionary";

import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/form/SearchInput";
import DataTable from "../../components/table/DataTable";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";

export default function DictionaryList() {


    const navigate = useNavigate();
    const {
        words,
        search,
        setSearch,
        pagination,
        loading,
        fetching,
        loadWords,
    } = useDictionary();


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
                onSearch={() => loadWords(1)}
                placeholder="Search Bengali word or meaning..."
            />


            <DataTable
                columns={[
                    { key: "word", label: "Word" },
                    { key: "meaning", label: "Meaning" },
                ]}
                data={words}
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