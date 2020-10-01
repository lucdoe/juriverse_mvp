export const fuzzySearch = (query: RegExp): object => {
    return ({
        $and: [
            { $or: [{ 'case.title': query }, { categories: query }, { subcategories: query }, { problems: query, }, { 'author.name': query }] },
            { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
            { 'meta.isDeleted': false }
        ]
    })
}


export const recommandationQuery = { $and: [{ 'meta.ratingCount': { $gt: 980 } }, { 'meta.isDeleted': false }, { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }] }


export const allCasesQuery = { $and: [{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }, { 'meta.isDeleted': false }] }


export const suggestQuerySubcat = (query: [string]): object => {
    return (
        { $and: [{ $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] }, { 'meta.ratingCount': { $gt: 750 } }, { 'meta.isDeleted': false }, { subcategories: query }] })
}

export const publicCasesQuery = (userId: string) => {
    return (
        { $and: [{ 'meta.isPublished': true }, { 'meta.isDeleted': false }, { 'author.authorId': userId }] })
}

export const draftCasesQuery = (userId: string) => {
    return (
        { $and: [{ 'meta.isDraft': true }, { 'meta.isDeleted': false }, { 'author.authorId': userId }] })
}

export const categoryQuery = (categorie: string) => {
    return ({
        $and: [
            { $or: [{ categories: categorie }] },
            { $or: [{ 'meta.isPublished': true }, { 'meta.isDraft': false }] },
            { 'meta.isDeleted': false }
        ]
    })
}

export const suggestCatQuery = (rating: number, categorie: string): object => {
    return {
        $and: [{ 'meta.ratingCount': { $gt: rating } }, { categories: categorie }, { 'meta.isPublished': true }, { 'meta.isDraft': false }]
    }
}