let mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL).catch((err) => {
	console.log(err);
});
