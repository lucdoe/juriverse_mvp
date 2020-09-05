import mongoose from 'mongoose'

const Schema = mongoose.Schema

const caseSchema = new Schema({
	key: String,
	name: String,
	owner: String,
	author: {
		id: String,
		name: String,
		email: String,
		uni: String,
	},
	categories: [String],
	subcategories: [String],
	problems: [String],
	case: {
		question: String,
		intro: String,
		solution: String,
	},
	meta: {
		votes: Number,
		favs: Number,
		private: Boolean,
	},
	uploadDate: Date,
	selfWriteConfirm: Boolean,
	recommended: Number,
	draft: Boolean,
})

const Cases = mongoose.model('Cases', caseSchema)

export default Cases
