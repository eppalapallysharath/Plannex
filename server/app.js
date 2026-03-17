const express = require("express");
const app = express()
const {port} = require("./constants/env.js")
const {apiNotFound, globalError} = require("./middlewares/appLevelMiddlewares.js")


app.get("/", (req, res)=>{
    try {
        res.status(200).send("Im running healthy")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
})

app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/users", require("./routes/admin.js"))
app.use("/api/events", require("./routes/events.js"))
app.use("/api/eventRegister", require("./routes/eventRegistration.js"))
app.use("/api/uploads", require("./routes/fileupload.js"))

app.use(apiNotFound)
app.use(globalError)

app.listen(port,()=>{console.log("server started on port "+port)})