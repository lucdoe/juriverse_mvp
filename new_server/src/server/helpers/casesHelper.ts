import { Document, FilterQuery } from 'mongoose'
import Cases from '../models/Case'
import { suggestCatQuery, categoryQuery } from './queries'

export const findOneCase = async (id: string | object) => {
    const result: Document = await Cases.findOne({ caseId: id })
    return result
}

export const findCases = async (query: FilterQuery<object>) => {
    const result: Document[] = await Cases.find(query)
    return result
}

export async function getCatCases(rating: number, categorie: string) {
    const recommendedCases = await findCases(suggestCatQuery(rating, categorie))
    const allCases = await findCases(categoryQuery(categorie))
    return { allCases, recommendedCases }
}