import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	id: String,
	uni: String,
	cases: {
		saved: [String],
		open: [String],
		finished: [String],
		notes: [
			{
				caseId: String,
				positionIndex: Number,
				note: String,
				solution: String,
			},
		],
	},
})

const Users = mongoose.model('Users', userSchema)

export default Users
