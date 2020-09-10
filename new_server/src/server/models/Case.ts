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
		likes: Number,
		favs: Number,
		rating: Number,
		isPublished: Boolean,
		isDraft: Boolean,
		uploadDate: Date,
	},
	report: [
		{
			user_id: String,
			case_id: String,
			reportText: String
		}
	],
	isDeleted: Boolean,
	selfWriteConfirm: Boolean,
})

const Cases = mongoose.model('Cases', caseSchema)

export default Cases

