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


var getPokemonByName = async inputValue => {

    if (inputValue == null)
        return [];

    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;

    const res = await fetch(url);
    const pokemon = await res.json();

    return pokemon;
};

var getPokemonById = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    let res = await fetch(url);
    let pokemon = await res.json();

    return pokemon;
};

var fetchPokemon = async () => {
    let result = [];

    for (let i = 1; i <= pokeNumber; i++) {
        var item = await getPokemonById(i);
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
            filtered: []
        };

       
        //this.handleChange = this.handleChange.bind(this);
    }


    async componentDidMount() {
        let pokemon = await fetchPokemon();

        this.setState({ card: pokemon });
    }


    render() {
        
        let filtered = Object.keys(this.props.filtered).length > 0 ? this.props.filtered : this.state.card;

        if (filtered.count !== undefined && filtered.count > 0) {
            return (
                <div className="poke-container">
                    <div className="row">
                        {this.state.card.map(pokemon => {
                            return <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        })}
                    </div>
                </div>
            )
        }

        return (
            <div className="poke-container" >              
                {Object.keys(filtered).length > 0 ? (
                    <div className="row">
                        {this.state.card && Object.keys(this.props.filtered).length === 0 ?
                            this.state.card.map(pokemon => (
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                            )) :
                            <PokemonCard key={this.props.filtered.id} pokemon={this.props.filtered} />
                        }
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
