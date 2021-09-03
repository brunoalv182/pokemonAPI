const sequence = {
    _id: 1,
    get id() { return this._id++}
}

const pokemons = []

//função salvar pokemon
function salvarPokemons(pokemon) {
    if(!pokemon.id) pokemon.id = sequence.id
    pokemons [pokemon.id] = pokemon
    return pokemon
}

//função mostrar os pokemons
function mostrarPokemon(id) {
    return pokemons[id] || {}
}

//mostrar todos os pokemons

function mostrarPokemons() {
    return Object.values(pokemons)
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