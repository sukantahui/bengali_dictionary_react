import { useCallback, useEffect, useState } from "react";

import {
    getWords,
    searchWords,
} from "../services/dictionaryService";

import config from "../config/app";

export default function useDictionary() {

    const [search, setSearch] = useState("");

    const [words, setWords] = useState([]);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: config.pagination,
        total: 0,
        from: 0,
        to: 0,
    });

    const [loading, setLoading] = useState(true);

    const [fetching, setFetching] = useState(false);

    const [initialLoad, setInitialLoad] = useState(true);

    const loadWords = useCallback(async (page = 1) => {

        if (initialLoad) {

            setLoading(true);

        } else {

            setFetching(true);

        }

        try {

            let response;

            if (search.trim()) {

                response = await searchWords(
                    search,
                    page,
                    config.pagination
                );

            } else {

                response = await getWords(
                    page,
                    config.pagination
                );

            }

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

            setInitialLoad(false);

        }

    }, [search, initialLoad]);

    useEffect(() => {

        loadWords(1);

    }, [loadWords]);

    return {

        words,

        search,
        setSearch,

        pagination,

        loading,
        fetching,

        loadWords,

    };

}