import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'

const Schema = mongoose.Schema

const userSchema = new Schema({
	id: String,
	uni: String,
	cases: {
		saved: [ObjectID],
		drafts: [ObjectID],
		owns: [ObjectID],
		open: [ObjectID],
		finished: [ObjectID],
		notes: [
			{
				caseId: ObjectID,
				positionIndex: Number,
				note: String,
				solution: String,
			},
		],
	},
})

const Users = mongoose.model('Users', userSchema)

export default Users
