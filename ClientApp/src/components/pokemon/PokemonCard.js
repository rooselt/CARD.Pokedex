import React, { Component } from 'react';

import styled from 'styled-components';
import spinner from '../layout/spinner.gif';
import Loading from '../layout/Loading';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;



//const pokeContainer = document.getElementById("poke_container");
//const pokeNumber = 1000;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#e1bdf0",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5"
};

const tagColors = {
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC"
};
const main_types = Object.keys(colors);

//var setState = el => {
//    const display = document.getElementById(el).style.display;

//    if (display === "info") {
//        document.getElementById(el).style.display = "block";
//    } else {
//        document.getElementById(el).style.display = "none";
//    }
//}

var setColor = color => {
    let actColor = tagColors[color];
    return actColor;
}

var setAbility = async url => {
    const res = await fetch(url);
    const ability = await res.json();

    return ability;
};

var createPopUpCard = pokemon => {
    let popEl = `${pokemon.name}_info`;
    let actEl = document.getElementById(popEl).style.display;

    if (actEl === "none") {
        document.getElementById(popEl).style.display = "block";
        document.getElementById(popEl).style.opacity = "1";
        document.getElementById(pokemon.name + "_container").style.opacity = "0";
    } else {
        document.getElementById(popEl).style.display = "none";
        document.getElementById(pokemon.name + "_container").style.opacity = "1";
    }
};


var selectPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    let pokemon = await res.json();

    createPopUpCard(pokemon);
};


var createPokemonCard = async pokemon => {
    let poke_types = pokemon.types.map(el => el.type.name);
    let type = main_types.find(type => poke_types.indexOf(type) > -1);
    let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    let color = colors[type];
    let types = pokemon.types.map(types => types.type.name);
    let abilityUrl = pokemon.abilities.map(ability => ability.ability.url);
    let selectAbility = await setAbility(abilityUrl[0]);
    let ability = {
        name: selectAbility.name[0].toUpperCase() + selectAbility.name.slice(1),
        effect: selectAbility.effect_entries.map(ablt => ablt.short_effect)
    };

    return {
        id: pokemon.id,
        name: name,
        color: color,
        types: types,
        imageUrl: pokemon.sprites["front_default"],
        ability: ability,
        abilityUrl: abilityUrl
    }
}


export default class PokemonCard extends Component {
    static displayName = PokemonCard.name;

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            pokemon: {},
            name: '',
            color: '',
            types: '',
            imageUrl: '',
            ability: {},
            abilityUrl: '',
            imageLoading: true,
            toManyRequests: false
        };
        //this.handleScan = this.handleScan.bind(this)
    }


    async componentDidMount() {
        let pokemon = await createPokemonCard(this.props.pokemon);

        this.setState({ pokemon: pokemon });
    }

    //handleScan(data) {
    //    let cardPhase = newPhaseCardItem(data);
    //    //this.setState({
    //    //    card: { item: dataValue }
    //    //});

    //    this.saveCardData(cardPhase);
    //}

    handleError(err) {
        console.error(err)
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

    render() {

        function SpanTypes(item) {
            let types = item.types;

            if (types.length === 2) {
                let firstType = types[1];
                let secondType = types[0];

                return (
                    <div>
                        <span className="types" style={{ backgroundColor: setColor(secondType) }}>{firstType}</span>
                        <span className="types" style={{ backgroundColor: setColor(secondType) }}>{secondType}</span>
                    </div>);
            }
            let uniqueType = types[0];

            return (<span className="types" style={{ backgroundColor: setColor(uniqueType) }}>{uniqueType}</span>);
        }

        let isPokemon = Object.getOwnPropertyNames(this.state.pokemon).length > 0;

        return (
            <div className="pokemon" style={{ backgroundColor: this.state.pokemon.color }}>
                {isPokemon ?
                    (
                        <div className="poke-container">
                            <div className="img-container">
                                {this.state.imageLoading ?
                                    (<img src={spinner}
                                        style={{ width: '5em', height: '5em' }}
                                        className="card-img-top rounded mx-auto d-block mt-2" />) :
                                    null}
                                <Sprite
                                    className="card-img-top rounded mx-auto mt-2"
                                    src={this.state.pokemon.imageUrl}
                                    onLoad={() => this.setState({ imageLoading: false })}
                                    onError={() => this.setState({ toManyRequests: true })}
                                    style={
                                        this.state.toManyRequests
                                            ? { display: 'none' }
                                            : this.state.imageLoading
                                                ? null
                                                : { display: 'block' }
                                    }
                                />
                            </div>
                            <div className="info">
                                <span className="number">#{this.state.pokemon.id.toString().padStart(3, "0")}</span>
                                <h3 className="name">{this.state.pokemon.name}</h3>
                            </div>
                            <div className="types">
                                <SpanTypes types={this.state.pokemon.types} />
                            </div>

                            <div id={this.state.pokemon.name + "_info"} className="more_info" style={{ display: 'none', opacity: '0' }}>
                                <span className="title">Ability Info</span>
                                <h3 className="name_ability">{this.state.pokemon.ability.name}</h3>

                                {this.state.pokemon.ability.effect.map(ef => (
                                    <p>{ef}</p>
                                ))}
                            </div>
                        </div>

                    )
                    :
                    (<Loading />
                    )}
            </div>
        );
    }
}