import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import Loading from '../layout/Loading';


//var createPopUpCard = pokemon => {
//    let popEl = `${pokemon.name}_info`;
//    let actEl = document.getElementById(popEl).style.display;

//    if (actEl === "none") {
//        document.getElementById(popEl).style.display = "block";
//        document.getElementById(popEl).style.opacity = "1";
//        document.getElementById(pokemon.name + "_container").style.opacity = "0";
//    } else {
//        document.getElementById(popEl).style.display = "none";
//        document.getElementById(pokemon.name + "_container").style.opacity = "1";
//    }
//};

const pokeNumber = 10;

//var getPokemonAll = async url => {
//    const res = await fetch(url);
//    const pokemon = await res.json();

//    return pokemon;
//};

var getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    let res = await fetch(url);
    let pokemon = await res.json();

    return pokemon;
};

var fetchPokemon = async () => {
    let result = [];

    for (let i = 1; i <= pokeNumber; i++) {
        var item = await getPokemon(i);
        result.push(item);
    }

    return result;
};


export default class PokemonList extends Component {
    static displayName = PokemonList.name;

    constructor(props) {
        super(props);

        this.state = {
            card: [],
            loading: true,
            url: 'https://pokeapi.co/api/v2/pokemon/',
        };

        //this.handleScan = this.handleScan.bind(this)
    }


    async componentDidMount() {
        let pokemon = await fetchPokemon();

        this.setState({ card: pokemon });
    }

    //handleScan(data) {
    //    let cardPhase = newPhaseCardItem(data);
    //    //this.setState({
    //    //    card: { item: dataValue }
    //    //});

    //    this.saveCardData(cardPhase);
    //}

    render() {
        return (
            <div className="poke-container" >
            
                {this.state.card ? (
                    <div className="row">
                        {this.state.card.map(pokemon => (
                            <PokemonCard key={pokemon.name} pokemon={pokemon} />
                        ))}
                    </div>
                ) : (
                        <Loading />
                    )}

            </div>
        );
    }

    saveCardData = async card => {
        const response = await fetch('pokemon', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card[0])
        });

        await response.json();
    }
}
