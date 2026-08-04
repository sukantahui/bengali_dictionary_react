import api from "../api/api";

export function getLatestWords() {
    return api.get("/public/latest");
}

export function searchWords(word) {

    return api.get("/dictionary/search", {

        params: {
            word,
        },

    });

}

export function lookupWord(word) {

    return api.get("/public/lookup", {
        params: {
            word,
        },
    });

}