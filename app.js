const express = require('express');

const app = express();
app.use(express.json()) // Importante para poder usar el req.body

const persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-0123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]

// GET /INFO
app.get('/info', (request, res) => {
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1><p>${new Date()}</p>`);
});

// GET API/PERSONS
app.get('/api/persons', (req, res) => {
    res.json(persons);
})

// GET BY ID
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === Number(id));

    if (!person) {
        res.status(404).json({ message: `Persons not found with id: ${id}` });
    } else {
        res.json(person);
    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const personsVec = persons.filter(person => person.id != id)
    //res.send(`User with the id ${id} deleted.`)
    res.json(personsVec)
})

app.post('/api/persons', (req, res) => {
    const newId = Math.floor(Math.random() * 10000);
    console.log(req.body)
    const person = {
        id: newId,
        ...req.body
        };
    persons.push(person);
    res.json(persons);
});
    /*
    console.log(newName)
    console.log(newNumber)
    if(!newName && !newNumber){
        res.status(404).json({ error: `Persons not found with id` });
        console.log(`Holaaaa`)
    }else{
        persons.push({
            id: newId,
            name: newName,
            number: newNumber
        });
        console.log(`Chaoooo`)
        res.json(persons)
    }*/

/*
app.use(function(err, req, res, next) {
    // logic
    console.log(`Errores`)
    res.status(404).json({ error: `Persons not found with id` });
  });
  */



const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`);
