import React, { Component } from 'react';
import PokemonCard from './PokemonCard';
import Loading from '../layout/Loading';

const pokeNumber = 24;

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
            filtered: [],
            isRemove: false,
            pokemons: []
        };
    }

    async componentDidMount() {
        let pokemon = await fetchPokemon();

        this.setState({ card: pokemon });
    }

    handleFieldChange = (pokemons) => {

        this.setState({ card: pokemons });
    };

    render() {

        const eventhandler = (data, item) => {
            if (Object.keys(data).length > 0) {
                this.setState({ pokemons: data,  isRemove: false});
            } else if (item){
                this.setState({ pokemons: [], isRemove: true });
            }
        }

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
            <div>
                <div className="poke-container">
                    {Object.keys(filtered).length > 0 ? (
                        <div className="row">
                            {this.state.card && Object.keys(this.props.filtered).length === 0 ?
                                this.state.card.map(pokemon => (
                                    <PokemonCard key={pokemon.id} pokemon={pokemon} handleChange={eventhandler} />
                                )) :
                                <PokemonCard key={this.props.filtered.id} pokemon={this.props.filtered} />
                            }
                        </div>
                    ) : (
                            <Loading />
                        )}
                </div>
                <hr />
                <div>
                    <h3>Minhas Cartas</h3>
                </div>
                <div className="poke-container">
                    {this.state.pokemons ? (
                        <div className="row">

                            {this.state.pokemons.map(pokemon => {
                                return <PokemonCard key={pokemon.id} pokemon={pokemon} handleChange={eventhandler} />
                            })}
                        </div>
                    ) : (
                            <Loading />
                        )}

                </div>
            </div >
        );
    }
}
