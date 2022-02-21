export const getExamId = (email: string | undefined) => {
    const rawData = localStorage.getItem(email ?? "unknown");
    if (rawData) {
        return JSON.parse(rawData).examId
    }
    return 1
}