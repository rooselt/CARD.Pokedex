import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonList';
import Search from '../search/Search';


var getPokemonByName = async inputValue => {
    if (inputValue == null)
        return [];

    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
    const res = await fetch(url);
    const pokemon = await res.json();

    return pokemon;
};


export default class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            pokemon: {}
        };

        this.useRef = React.createRef();
    }

    onSearchSubmit = async text => {
        const response = await getPokemonByName(text);

        this.setState({ pokemon: response });
    }


    render() {
        const scroll = (scrollOffset) => {
            this.useRef.current.scrollLeft += scrollOffset;
        };


        return (
            <div>
                <Search onSubmit={this.onSearchSubmit} />
                <div className="div-direction-left pull-left">
                    <a href="#" className="pull-left a-left" onClick={() => scroll(-300)}>
                        <i className="fa fa-angle-left" style={{ fontSize: '22px' }}></i>
                    </a>
                </div>
                <div className="row">
                    <div className="col" ref={this.useRef}>
                        <PokemonList filtered={this.state.pokemon} />
                    </div>
                </div>
                <div className="div-direction-right pull-right">
                    <a href="#" className="pull-right a-right" onClick={() => scroll(+300)}>
                        <i className="fa fa-angle-right" style={{ fontSize: '22px' }}></i>
                    </a>
                </div>
            </div>
        );
    }
}