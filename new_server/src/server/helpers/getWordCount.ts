export const getWordCount = (title: string, task: string, issue: string, solution: string, footnotes: string): number => {

    const wordCount = title.split(" ").length + task.split(" ").length + issue.split(" ").length + solution.split(" ").length + footnotes.split(" ").length

    return wordCount
}