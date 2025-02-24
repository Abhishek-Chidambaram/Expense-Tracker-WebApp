export const dateFormat = (date) => {
    if (!date) return "N/A"; // ✅ Prevents "Invalid date" errors

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date(date)); // ✅ Uses native Intl API (No extra dependency)
};
