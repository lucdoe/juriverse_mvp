import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'

const Schema = mongoose.Schema

const userSchema = new Schema({
	name: String,
	email: String,
	university: String,
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
			},
		],
		solutions: [{
			caseId: ObjectID,
			solution: String,
		}],
	},
	draft: Boolean,
})

const User = mongoose.model('User', userSchema)

export default User
