export default function DataTable({
    columns = [],
    data = [],
    showSerial = true,
    startIndex = 1,
    highlightId = null,
}) {

    return (

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">

            <table className="min-w-full">

                <thead className="bg-slate-800">

                    <tr>

                        {showSerial && (

                            <th className="w-16 px-6 py-4 text-left font-semibold">

                                #

                            </th>

                        )}

                        {columns.map((column) => (

                            <th
                                key={column.key}
                                style={{ width: column.width }}
                                className={`px-6 py-4 font-semibold ${column.align === "center"
                                        ? "text-center"
                                        : column.align === "right"
                                            ? "text-right"
                                            : "text-left"
                                    }`}
                            >

                                {column.label}

                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.length > 0 ? (

                        data.map((row, index) => (

                            <tr
                                key={row.id}
                                className={`
                                border-t
                                border-slate-700
                                transition-colors
                                hover:bg-slate-800
                                ${row.id === Number(highlightId)? "bg-green-900/40": ""}
                            `}
                            >

                                {showSerial && (

                                    <td className="px-6 py-3">

                                        {startIndex + index}

                                    </td>

                                )}

                                {columns.map((column) => (

                                    <td
                                        key={column.key}
                                        className={`px-6 py-3 ${column.align === "center"
                                                ? "text-center"
                                                : column.align === "right"
                                                    ? "text-right"
                                                    : "text-left"
                                            }`}
                                    >

                                        {column.render
                                            ? column.render(row)
                                            : row[column.key]}

                                    </td>

                                ))}

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={
                                    columns.length +
                                    (showSerial ? 1 : 0)
                                }
                                className="py-10 text-center text-slate-400"
                            >

                                No records found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}