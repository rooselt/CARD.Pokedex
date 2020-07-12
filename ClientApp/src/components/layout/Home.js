import React, { Component } from 'react';

import PokemonList from '../pokemon/PokemonList';
import Search from '../search/Search';

export default class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <PokemonList />
                </div>
            </div>
        );
    }
}