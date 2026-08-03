import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import DictionaryForm from "../../components/dictionary/DictionaryForm";

import {
    getWordById,
    updateWord,
} from "../../services/dictionaryService";

import Loader from "../../components/common/Loader";
import notify from "../../helpers/notify";
import alert from "../../helpers/alert";

export default function DictionaryEdit() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        word: "",
        meaning: "",
        relatedWords: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        loadWord();
    }, [id]);

    async function loadWord() {

        try {

            const response = await getWordById(id);

            const word = response.data.data;

            setForm({
                word: word.word,
                meaning: word.meaning,
                relatedWords: word.relatedWords.join(", "),
            });

        } catch (error) {
            console.error(error);
            console.log(error.response);
            notify.error("Unable to load dictionary entry.");

            // navigate("/dictionary");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({
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

    async function handleReset() {
        const confirmed = await alert.confirm({
            title: "Discard Changes?",
            text: "All unsaved changes will be lost.",
            confirmText: "Reset",
        });
        if (!confirmed) {
            return;
        }
        loadWord();
    }

    async function handleUpdate(e) {
        e.preventDefault();
        const confirmed = await alert.confirm({
            title: "Update Word?",
            text: "Save the changes to this dictionary entry?",
            confirmText: "Update",
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
            const response = await updateWord(id, payload);
            notify.success(response.data.message);
            navigate(
                `/dictionary?search=${encodeURIComponent(form.word)}&highlight=${id}`
            );
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

    return (

        <div className="space-y-8">

            <PageHeader
                title="Edit Word"
                subtitle="Update dictionary entry."
            />

            {loading
                ? <Loader text="Loading..." />
                : (
                    <DictionaryForm
                        values={form}
                        errors={errors}
                        onChange={handleChange}
                        onSubmit={handleUpdate}
                        onReset={handleReset}
                        onCancel={() => navigate("/dictionary")}
                        submitText="Update Word"
                        loading={saving}
                    />
                )}

        </div>

    );

}