const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((error) => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

personsRouter.post('/', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        res.status(400).json({ error: 'The name or number missing' })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person
            .save()
            .then((savedPerson) => {
                res.json(savedPerson)
            })
            .catch((error) => next(error))
    }
})


module.exports = personsRouter