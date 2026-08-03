import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import DictionaryForm from "../../components/dictionary/DictionaryForm";

import { createWord } from "../../services/dictionaryService";
import notify from "../../helpers/notify";
import RecentWords from "../../components/dictionary/RecentWords";
import alert from "../../helpers/alert";

export default function DictionaryCreate() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        word: "",
        meaning: "",
        relatedWords: "",
    });

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [recentWords, setRecentWords] = useState(() => {
        return JSON.parse(localStorage.getItem("recentWords") || "[]");
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function clearForm() {
        setForm({
            word: "",
            meaning: "",
            relatedWords: "",
        });
        setErrors({});
    }

    async function handleCreate(e) {
        e.preventDefault();
        const confirmed = await alert.confirm({
            title: "Save Word?",
            text: "Do you want to save this dictionary entry?",
            confirmText: "Save",
            icon: "question",
        });

        if (!confirmed) {
            return;
        }
        setSaving(true);
        setErrors({});
        try {

            const payload = {
                word: form.word,
                meaning: form.meaning,
                relatedWords: form.relatedWords
                    .split(",")
                    .map(word => word.trim())
                    .filter(Boolean),
            };

            const response = await createWord(payload);
            notify.success(response.data.message);
            const newWord = {
                ...response.data.data,
                addedAt: new Date().toISOString(),
            };
            setRecentWords(prev => {

                const updated = [newWord, ...prev].slice(0, 10);

                localStorage.setItem(
                    "recentWords",
                    JSON.stringify(updated)
                );

                return updated;

            });

            clearForm();

        } catch (error) {

            if (error.response?.status === 422) {

                setErrors(error.response.data.data || {});

                notify.error(error.response.data.message);

                return;

            }

            notify.error("Something went wrong.");

            console.error(error);

        } finally {

            setSaving(false);

        }

    }

    // on reset
    async function handleReset() {
        if (!form.word && !form.meaning && !form.relatedWords) {
            return;
        }
        const confirmed = await alert.confirm({
            title: "Reset Form?",
            text: "All entered information will be removed.",
            confirmText: "Reset",
        });

        if (confirmed) {
            clearForm();
        }
    }

    async function handleClearRecent() {

        if (!recentWords.length) {
            return;
        }
        const confirmed = await alert.confirm({

            title: "Clear Recent History?",
            text: "This action cannot be undone.",
            confirmText: "Clear",

        });

        if (!confirmed) {
            return;
        }
        localStorage.removeItem("recentWords");
        setRecentWords([]);
        notify.success("Recent history cleared.");
    }

    return (

        <div className="space-y-8">

            <PageHeader
                title="Add New Word"
                subtitle="Create a new dictionary entry."
            />

            <div className="mx-auto max-w-4xl">
                <DictionaryForm
                    values={form}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleCreate}
                    onReset={handleReset}
                    onCancel={() => navigate("/dictionary")}
                    submitText="Save Word"
                    loading={saving}
                />
            </div>
            <RecentWords
                words={recentWords}
                onClear={handleClearRecent}
            />
        </div>

    );

}