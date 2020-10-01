import Users from "../models/User"

export const findOneUser = async (id: string) => {
    await Users.find({ caseId: id })
}