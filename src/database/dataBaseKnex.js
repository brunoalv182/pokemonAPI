const {dataBaseConnection} = require ('./connection')



const pokemons = []

//função salvar pokemon
async function salvarPokemons(pokemon) {
    //const queryInsertPokemon = `INSERT INTO pokedex (nome, tipo, fraqueza, resistencia, hp) VALUES ('${pokemon.nome}', '${pokemon.tipo}',
    // '${pokemon.fraqueza}', '${pokemon.resistencia}', '${pokemon.hp}')`
    //const result = await dataBaseConnection.raw(queryInsertPokemon)

    const insertPokemon = {
        nome: pokemon.nome,
        tipo: pokemon.tipo,
        fraqueza: pokemon.fraqueza,
        resistencia: pokemon.resistencia,
        hp: pokemon.hp

    }


    const result = await dataBaseConnection('pokedex').insert(insertPokemon)

    if(result){
        return{
            nome: pokemon.nome,
            tipo: pokemon.tipo,
            fraqueza: pokemon.fraqueza,
            resistencia: pokemon.resistencia,
            hp: pokemon.hp,
            id: result[0]
        }
    }else{
        console.error("Deu erro")
        return{
            erro: "Deu erro na aplicação"
        }
    }
}

//função mostrar o pokemon
async function mostrarPokemon(id) {
    const querySelectPokemon = `SELECT * FROM pokedex WHERE ID = ${id}`

    const result = await dataBaseConnection.raw(querySelectPokemon)

    return result[0]
}

//mostrar todos os pokemons

async function mostrarPokemons() {
    const querySelectPokemons = `SELECT * FROM pokedex`

    const result = await dataBaseConnection.raw(querySelectPokemons)

    return result[0]
}

//atualizar pokemon
function atualizarPokemon(id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}


//Deletar pokemon
function deletarPokemon(id) {
    sequence._id = sequence._id -1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if(pokemon.id > id) {
            pokemon.id = pokemon.id -1
        }
    })
    return pokemonDeletado
}
//batalha pokemon
function batalhaPokemon(id1, id2) {
    const superEfetivo = 40
    const efetivo = 20
    const naoEfetivo = 10

    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]
    //Ataque pokemon 1
    if(pokemon1.hp != 0 && pokemon2.hp !=0){
        if(pokemon1.tipo == pokemon2.fraqueza) {
            pokemon2.hp = pokemon2.hp - superEfetivo
            
        } else if(pokemon1.tipo == pokemon2.resistencia){
            pokemon2.hp = pokemon2.hp - naoEfetivo
            
        } else{
            pokemon2.hp = pokemon2.hp - efetivo
            
        }
    }
    //Ataque pokemon 2
    if(pokemon1.hp != 0 && pokemon2.hp !=0){
        if(pokemon2.tipo == pokemon1.fraqueza) {
            pokemon1.hp = pokemon1.hp - superEfetivo
            
        } else if(pokemon2.tipo == pokemon1.resistencia){
            pokemon1.hp = pokemon1.hp - naoEfetivo
            
        } else{
            pokemon1.hp = pokemon1.hp - efetivo
            
        }
    }

    if(pokemon1.hp < 0) pokemon1.hp = 0
    if(pokemon2.hp < 0) pokemon2.hp = 0
    

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
}

function helarPokemon (id) {
    const pokemon1 = pokemons[id]
    const pocao = 20
    
    if(pokemon1.hp < 100){
        pokemon1.hp = pokemon1.hp + pocao
        
    } else{
        return `O pokemon ${pokemon1.nome} já está com a HP Máxima` 
    }

    if(pokemon1.hp > 100) pokemon1.hp = 100
    
    return `O pokemon ${pokemon1.nome} foi curado e está com ${pokemon1.hp} de HP`
}

module.exports = { salvarPokemons, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon,batalhaPokemon, helarPokemon}