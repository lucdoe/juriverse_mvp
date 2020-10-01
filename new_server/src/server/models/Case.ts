import mongoose from 'mongoose'

const Schema = mongoose.Schema

const caseSchema = new Schema({
	caseId: String,
	author: {
		authorId: String,
		picture: String,
		name: String,
		email: String,
		university: String,
	},
	categories: [String],
	subcategories: [String],
	problems: [String],
	case: {
		title: String,
		task: String,
		issue: String,
		solution: String,
		footnotes: String,
	},
	meta: {
		likeCount: Number,
		ratingCount: Number,
		viewCount: Number,
		editorChoice: [String],
		isPublished: Boolean,
		isDraft: Boolean,
		isDeleted: Boolean,
		uploadDate: Date,
		wordCount: Number,
		readTime: Number,
		intro: String,
	},
	report: [
		{
			userId: String,
			caseId: String,
			reportText: String
		}
	],
	selfWriteConfirm: Boolean,
})

const Cases = mongoose.model('Cases', caseSchema)

export default Cases

