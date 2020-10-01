export const escapeRegex = async (text: string) => {

    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

}