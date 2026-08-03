import Input from "../form/Input";
import Textarea from "../form/Textarea";

export default function DictionaryForm({

    values = {},
    errors = {},
    onChange,
    onSubmit,
    onCancel,
    onReset,
    submitText = "Save Word",

    loading = false,

}) {

    return (

        <form
            onSubmit={onSubmit}
            className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-700
                bg-slate-800
                shadow-xl
            "
        >

            {/* Card Header */}

            <div className="border-b border-slate-700 px-8 py-6">

                <h2 className="text-2xl font-semibold text-white">

                    Dictionary Information

                </h2>

                <p className="mt-2 text-slate-400">

                    Fill in the information below.

                </p>

            </div>

            {/* Card Body */}

            <fieldset
                disabled={loading}
                className={loading ? "opacity-70" : ""}
            >

                <div className="space-y-8 px-8 py-8">

                    {/* First Row */}

                    <div className="grid gap-6">

                        <Input
                            label={
                                <>
                                    Word
                                    <span className="ml-1 text-red-500">*</span>
                                </>
                            }
                            name="word"
                            value={values.word || ""}
                            onChange={onChange}
                            error={errors.word}
                            placeholder="Enter Bengali word"
                        />

                        <Textarea
                            label={
                                <>
                                    Meaning
                                    <span className="ml-1 text-red-500">*</span>
                                </>
                            }
                            name="meaning"
                            rows={6}
                            value={values.meaning || ""}
                            onChange={onChange}
                            error={errors.meaning}
                            placeholder="Enter dictionary meaning..."
                        />

                        <Input
                            label="Related Words"
                            name="relatedWords"
                            value={values.relatedWords || ""}
                            onChange={onChange}
                            placeholder="ফল, গাছ, মিষ্টি..."
                        />

                    </div>

                    {/* Meaning */}



                    <p className="text-sm text-slate-400">

                        Example:
                        <span className="ml-2 italic">

                            ফল, গাছ, মিষ্টি, গ্রীষ্ম

                        </span>

                    </p>

                </div>

            </fieldset>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t border-slate-700 bg-slate-900 px-8 py-6">

                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        rounded-lg
                        border
                        border-slate-600
                        px-6
                        py-3
                        transition
                        hover:bg-slate-700
                    "
                >

                    ← Back

                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    {loading ? "Saving..." : `💾 ${submitText}`}

                </button>

                {/* Reset button */}
                <button
                    type="button"
                    onClick={onReset}
                    className="
                        rounded-lg
                        border
                        border-yellow-600
                        px-6
                        py-3
                        text-yellow-300
                        transition
                        hover:bg-yellow-600/10
                    "
                >
                    ↺ Reset
                </button>

            </div>

        </form>

    );

}