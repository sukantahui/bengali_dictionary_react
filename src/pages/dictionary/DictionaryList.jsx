import { useEffect, useState } from "react";
import {
    getWords,
    searchWords,
} from "../../services/dictionaryService";
import Loader from "../../components/common/Loader";
import config from "../../config/app";
import DataTable from "../../components/table/DataTable";
import PageHeader from "../../components/common/PageHeader";
import Pagination from "../../components/pagination/Pagination";


export default function DictionaryList() {

    const [words, setWords] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: config.pagination,
        total: 0,
        from: 0,
        to: 0,
    });

    const [loading, setLoading] = useState(true);      // first page only
    const [fetching, setFetching] = useState(false);   // page changes

    useEffect(() => {
        loadWords(1);
    }, []);

    async function loadWords(page = 1) {

        if (words.length === 0) {
            setLoading(true);
        } else {
            setFetching(true);
        }

        try {

            const response = await getWords(
                page,
                config.pagination
            );

            const { data, meta } = response.data.data;

            setWords(data);

            setPagination({
                currentPage: meta.current_page,
                lastPage: meta.last_page,
                perPage: meta.per_page,
                total: meta.total,
                from: meta.from,
                to: meta.to,
            });

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
            setFetching(false);

        }

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
            />
            <Pagination
                currentPage={pagination.currentPage}
                lastPage={pagination.lastPage}
                onPageChange={loadWords}
                loading={fetching}
            />
            <DataTable
                columns={[
                    { key: "word", label: "Word" },
                    { key: "meaning", label: "Meaning" },
                ]}
                data={words}
            />

        </div>

    );

}