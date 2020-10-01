export const safelyParseJSON = (json: string) => {

    let parsed: any[]

    try {
        parsed = JSON.parse(json)

    } catch (err) {
        console.error(err)
    }

    return parsed
}