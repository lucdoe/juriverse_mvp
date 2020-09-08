import mongoose from 'mongoose'

const Schema = mongoose.Schema

const caseSchema = new Schema({
	case_id: String,
	author: {
		author_id: String,
		picture: String,
		name: String,
		email: String,
		uni: String,
	},
	categories: [String],
	subcategories: [String],
	problems: [String],
	case: {
		title: String,
		aufgabe: String,
		sachverhalt: String,
		musterloesung: String,
		fussnoten: String,
	},
	meta: {
		votes: Number,
		favs: Number,
		recommended: Number,
		public: Boolean,
		draft: Boolean,
		uploadDate: Date,
	},
	selfWriteConfirm: Boolean,
})

const Cases = mongoose.model('Cases', caseSchema)

export default Cases

