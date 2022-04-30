const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json()) // Intercepta la aplicación: importante para poder usar el req.body

morgan.token('body',function(req,res){
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status - :response-time ms :body')) // Usando morgan para interceptar la aplicación.

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

// DELET
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const personDeleted = persons.filter( n => n.id === Number(id));
    if(!personDeleted){
        res.status(404).json({message: `not found`})
    }else{
        res.status(200).json({ message: `Person with id: ${id} was deleted` });
    }
})

// POST API/PERSONS
app.post('/api/persons', (req, res) => {
    const newId = Math.floor(Math.random() * 10000);
    const person = {
        id: newId,
        ...req.body
    };
    JSON.stringify({...req.body})   
    if(!person.name || !person.number){
        /*  400 Bad Request
            Esta respuesta significa que el servidor no pudo interpretar la solicitud dada una sintaxis inválida.
         */
        res.status(400).json({ error: `name and number values are required` });
    }else{
        const repetPerson = persons.find((item)=>item.name===person.name);
        if(!repetPerson){
            persons.push(person);
            res.status(201).json({messaee: `contact data is added`})
        }else{
            res.status(400).json({error: `name must be unique` });
        }
    }
});




const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server running at http://localhost:${port}/`);
