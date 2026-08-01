import api from "../api/api";

export const getWords = (page = 1, perPage = 20) =>
    api.get("/dictionary", {
        params: {
            page,
            per_page: perPage,
        },
    });

export const searchWords = (
    word,
    page = 1,
    perPage = 20
) =>
    api.get("/dictionary/search", {
        params: {
            word,
            page,
            per_page: perPage,
        },
    });

export const latestWords = (
    page = 1,
    perPage = 20
) =>
    api.get("/dictionary/latest", {
        params: {
            page,
            per_page: perPage,
        },
    });

export const getWord = (word) =>
    api.get(`/dictionary/word/${word}`);

export const createWord = (data) =>
    api.post("/dictionary", data);

export const updateWord = (id, data) =>
    api.put(`/dictionary/${id}`, data);

export const deleteWord = (id) =>
    api.delete(`/dictionary/${id}`);