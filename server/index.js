const express = require('express')
const app = express()

app.use(require('cors')())
app.use(express.json())

require("../server/plugins/db")(app)
require('./routes/admin/index.js')(app)
require('./routes/common/index.js')(app)
require('./routes/students/index.js')(app)
require('./routes/teachers/index.js')(app)

app.listen(3000, () => {
    console.log("127.0.0.1:3000")
})