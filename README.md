# Node-JS-AgendaTelefono

Este proyecto muestra un ejemplo para usar las sentencias CRUD con el obbjetivo de, a futuro, poder estionar una base de datos.

La actividad se basa en una agenda de telefonos donde se puede ingresar el nombre y número telefónico de una persona.

La actividad se desarrolló a través de los siguientes pasos:

## 1. Código Node para visualizar una lista de telefonos
Como primer paso se realiza la instalación de `nodemon ` a través de la instrucción:
```wsl
npm install --save-dev nodemon
```

Seguidamente se crean los scripts para levantar el servidor y para iniciar la aplicación:

```json
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
```
Luego se instala Express:
```wsl
npm install express
```

Una vez realizadas las instalaciones, se realiza la programación en el archivo `app.js`.

El código utilizado para implementar el método `GET`, entre otras instrucciones, es el siguiente:
```js
app.get('/api/persons', (req, res) => {
    res.json(persons);
})
```

Para poder ejecutar la aplicación se debe levantar el servidor a través de `npm run dev`. El resultado de levantar el servidor es el siguiente:
![Alt text](/figures/npm_run_dev.jpg "npm run dev")

Para verificar el funcionamiento se hace uso de la herramienta `Postman` y el resultado del método `GET` se ve en la imagen:
![Alt text](/figures/GET_lista_contactos.jpg "método GET")

## 2. Visualización de una información específica
Para presentar una información específica en la dirección `http://localhost:3001/info` se uutilizan las instrucciones:
```js
app.get('/info', (request, res) => {
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1><p>${new Date()}</p>`);
});
```
y cuando entramos en la dirección `http://localhost:3001/info` observamos el siguiente resultado:
![Alt text](/figures/GET_informacion_especifica.jpg "info especifica")

## 3. Mostrar información de una sola entrada
En esta fase de la aplicación se utiliza el método `GET` para visualizar los datos de un contacto específico. Para esto utilizamos el siguiente código, siendo el `id` la identificación usada para seleccionar el contacto y sus informaciones.
```js
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === Number(id));

    if (!person) {
        res.status(404).json({ message: `Persons not found with id: ${id}` });
    } else {
        res.json(person);
    }
})
```
Un ejemplo es mostrado en la siguiente imagen:
![Alt text](/figures/GET_ID_contacto.jpg "get id")

## 4. Eliminar una entrada específica de la base de datos
Para eliminar las informaciones de un usuario específico, seleccionado a tráves de un id, utilizamos las siguinetes instrucciones:
```js
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const idx = persons.findIndex((item)=>{
        return item.id === Number(id);
    })
    console.log(idx)
    if(idx === -1){
        res.status(404).json({message: `not found`})
    }else{
        persons.splice(idx,1);
        res.status(200).json({ message: `Person with id: ${id} was deleted` });
    }
})
```
En el código anterior se usa `filter` para poder ubicar la posición que contiene el `id` de los datos que se quieren eliminar. 

Para verificar el funcionamiento se presenta la siguiente imagen:
![Alt text](/figures/DELETE.jpg "delete id")

## 5 y 6. Agregando nuevas entradas a la base de datos, y control de errores

```js
app.post('/api/persons', (req, res) => {
    const newId = Math.floor(Math.random() * 10000);
    const person = {
        id: newId,
        ...req.body
    };
    JSON.stringify({...req.body})   
    if(!person.name || !person.number){
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
```
![Alt text](/figures/POST_y_control_errores.jpg "post")


## 7 y 8. Instalación de Morgan y uso de mensajes definidos
```js
const morgan = require('morgan');
morgan.token('body',function(req,res){
    return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status - :response-time ms :body')) // Usando morgan para interceptar la aplicación.
```
 ![Alt text](/figures/MORGAN.jpg "post")
