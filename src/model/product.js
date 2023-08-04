const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	VideoID: { type: Number, ref: "Videos", default: 0 },
	Title: {
		required: true,
		type: String,
	},
	Price: {
		required: true,
		type: Number,
	},
	LinkProduct: {
		required: true,
		type: String,
	},
	_id: { type: Number },
});

productSchema.pre("save", async function (next) {
	if (!this._id) {
		const count = await this.constructor.countDocuments({});
		this._id = count + 1;
	}
	next();
});

module.exports = mongoose.model("Product", productSchema);
