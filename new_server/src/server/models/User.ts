import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({

	userId: String,
	screenname: String,
	university: String,
	cases: {
		saved: [{
			caseId: String,
			savedTimestamp: Date,
		}],
		opened: [{
			caseId: String,
			openTimestamp: Date,
			closedTimestamp: Date,
		}],
		finished: [{
			caseId: String,
			finishedTimestamp: Date,
		}],
		likes: [{
			caseId: String,
			likedTimestamp: Date,
		}],
		notes: [
			{
				caseId: String,
				positionIndex: Number,
				note: String,
				solution: String,
				notedTimestamp: Date,
			},
		],
	},
	meta: {
		visitedAuthors: [{
			authorId: String,
			visitedTimestamp: Date,
		}],
		isDeleted: Boolean,
	},
})

const Users = mongoose.model('Users', userSchema)

export default Users
