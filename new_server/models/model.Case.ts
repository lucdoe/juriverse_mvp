import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'

const Schema = mongoose.Schema

const caseSchema = new Schema({
	name: String,
	key: String,
	author: {
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
		draft: Boolean,
		private: Boolean,
	},
	uploadDate: Date,
	sharedWith: [String],
	selfWriteConfirm: Boolean,
	recommended: Number,
})

const Blog = mongoose.model('Case', caseSchema)

export default Blog
