const express = require('express');
const app = express();
const dataBase = require('./database/dataBaseKnex');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

//mostrar todos os pokemons
app.get('/pokemons', async (req, res) => {
    res.send(await dataBase.mostrarPokemons())
});

//mostrar um pokemon
app.get('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.mostrarPokemon(req.params.id))
});

//salvar pokemon
app.post('/pokemons', async (req, res) => {
    const pokemon = await dataBase.salvarPokemons({
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100
    })
    res.send(pokemon)
});

//função atualizar pokemon
app.put('/pokemons/:id', (req, res) => {
    const pokemon = dataBase.atualizarPokemon(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        fraqueza: req.body.fraqueza,
        resistencia: req.body.resistencia,
        hp: 100,
        id: parseInt(req.params.id)
    })
    res.send(pokemon)
});

//Deletar pokemon
app.delete('/pokemons/:id', async (req, res) => {
    res.send(await dataBase.deletarPokemon(req.params.id))
})

//batalha Pokemon
app.post('/batalha', (req, res) => {
    res.send(dataBase.batalhaPokemon(req.body.id1, req.body.id2))
})

//helar Pokemons
app.post('/curar', (req, res) => {
   res.send(dataBase.helarPokemon(req.body.id))
   
})

app.listen(3003)