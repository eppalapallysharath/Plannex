exports.createEvent = (req,res)=>{
    try {
        res.send("create event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.getAllEvents = (req,res)=>{
    try {
        res.send("all event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.getEvent = (req,res)=>{
    try {
        res.send("get event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.updateEvent = (req,res)=>{
    try {
        res.send("update event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.deleteEvent = (req,res)=>{
    try {
        res.send("delete event")
    } catch (error) {
        console.log(error)
        res.status(400).send("something went wrong")
    }
}

exports.uploadEventPoster = (req, res, next)=>{
    try {
        res.send("upload events")
    } catch (error) {
        console.log("error .....")
        next(error)
    }
}