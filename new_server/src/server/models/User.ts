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
	isDeleted: Boolean,
})

const Users = mongoose.model('Users', userSchema)

export default Users
