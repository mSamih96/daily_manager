let mongoose = require("mongoose");

(async () => {
	await mongoose.connect(process.env.MONGODB_URL);	
})();
