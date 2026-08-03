export function timeAgo(date) {

    if (!date) return "-";

    const seconds = Math.floor(
        (Date.now() - new Date(date).getTime()) / 1000
    );

    if (seconds < 60)
        return "Just now";

    if (seconds < 3600)
        return `${Math.floor(seconds / 60)} min ago`;

    if (seconds < 86400)
        return `${Math.floor(seconds / 3600)} hr ago`;

    if (seconds < 172800)
        return "Yesterday";

    return new Date(date).toLocaleDateString("en-IN");

}