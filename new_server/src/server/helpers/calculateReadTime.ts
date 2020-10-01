export const readTime = (wordCount: number): number => {
    const toBerounded = 0.00588235294 * wordCount
    const readTimeNumber = Math.round(toBerounded)
    console.log(readTimeNumber)
    return readTimeNumber
}