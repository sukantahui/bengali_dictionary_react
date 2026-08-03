import DataTable from "../table/DataTable";
import { timeAgo } from "../../helpers/dateTime";

export default function RecentWords({

    words = [],
    onClear,

}) {

    if (!words.length) return null;

    return (

        <div className="space-y-4">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">

                    Recently Added

                </h2>

                <button
                    onClick={onClear}
                    className="
                        rounded-lg
                        border
                        border-red-600
                        px-4
                        py-2
                        text-sm
                        text-red-400
                        hover:bg-red-600/10
                    "
                >
                    🗑 Clear History
                </button>

            </div>

            <DataTable
                showSerial={true}
                columns={[
                    {
                        key: "word",
                        label: "Word",
                        width: "15%",
                    },
                    {
                        key: "meaning",
                        label: "Meaning",
                        width: "45%",
                        render: (row) =>
                            row.meaning.length > 80
                                ? row.meaning.substring(0, 80) + "..."
                                : row.meaning,
                    },
                    {
                        key: "relatedWords",
                        label: "Related Words",
                        width: "40%",
                        render: (row) => (
                            <div className="flex flex-wrap gap-2">

                                {row.relatedWords?.slice(0, 3).map((word, index) => (

                                    <span
                                        key={index}
                                        className="
                                            rounded-full
                                            border
                                            border-blue-700
                                            bg-blue-900/30
                                            px-2
                                            py-1
                                            text-xs
                                            text-blue-300
                                        "
                                    >
                                        {word}
                                    </span>

                                ))}

                                {row.relatedWords?.length > 3 && (

                                    <span
                                        className="
                                            rounded-full
                                            bg-slate-700
                                            px-2
                                            py-1
                                            text-xs
                                            text-slate-300
                                        "
                                    >
                                        +{row.relatedWords.length - 3}
                                    </span>

                                )}

                            </div>
                        ),
                    },
                    {
                        key: "addedAt",
                        label: "Added",
                        render: (row) => timeAgo(row.addedAt),
                    },
                ]}
                data={words}
            />

        </div>

    );

}