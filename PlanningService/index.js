const app = require("./src/app.js");
require("./src/db/mongoose.js");

app.listen(process.env.PORT);
