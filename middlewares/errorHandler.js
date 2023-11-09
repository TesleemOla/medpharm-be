const errorHandler=(error,req, res, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return res.status(404).send({ error: "malformatted id"})
    }
    next(error)
}