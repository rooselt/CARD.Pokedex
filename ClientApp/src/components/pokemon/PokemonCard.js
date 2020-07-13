import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import spinner from '../layout/spinner.gif';
import Loading from '../layout/Loading';

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

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
    let popEl = `${pokemon}_info`;
    let actEl = document.getElementById(popEl).style.display;

    if (actEl === "none") {
        document.getElementById(popEl).style.display = "block";
        document.getElementById(popEl).style.opacity = "1";
        document.getElementById(pokemon + "_container").style.opacity = "0";
    } else {
        document.getElementById(popEl).style.display = "none";
        document.getElementById(pokemon + "_container").style.opacity = "1";
    }
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

var getPokemonById = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    let res = await fetch(url);
    let pokemon = await res.json();

    return pokemon;
};

export default class PokemonCard extends Component {
    static displayName = PokemonCard.name;

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            pokemon: {},
            pokemons: [],
            name: '',
            color: '',
            types: '',
            imageUrl: '',
            ability: {},
            abilityUrl: '',
            imageLoading: true,
            toManyRequests: false
        };

    }

    async componentDidMount() {
        let pokemon = await createPokemonCard(this.props.pokemon);

        this.setState({ pokemon: pokemon });
    }


    handleError(err) {
        console.error(err)
    }

    async addItem(e, id) {
        e.preventDefault();

        let list = this.state.pokemons;
        let response = await getPokemonById(id);

        if (response.status !== 404) {
            list.push(response);

            this.setState({
                pokemons: list
            });

            this.setState({ pokemons: list });
        }
    }

    removeItem(item) {
        const list = this.state.list.slice();

        list.some((el, i) => {
            if (el === item) {
                list.splice(i, 1);
                return true;
            }
        });

        this.setState({
            pokemons: list
        });
    }

    componentDidUpdate() {
        if (this.props.handleChange) {
            this.props.handleChange(this.state.pokemons);
        }
    }


    render() {

        function renderTooltipInfo(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Card Details
                </Tooltip>
            );
        }

        function renderTooltipAdd(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Card Add
                </Tooltip>
            );
        }

        function renderTooltipRemove(props) {
            return (
                <Tooltip id="button-tooltip" {...props}>
                    Card Remove
                </Tooltip>
            );
        }

        function SpanTypes(item) {
            let types = item.types;

            if (types.length === 2) {
                let firstType = types[1];
                let secondType = types[0];

                return (
                    <div className="types">
                        <span className="types" style={{ backgroundColor: setColor(firstType) }}>{firstType}</span>
                        <span className="types" style={{ backgroundColor: setColor(secondType) }}>{secondType}</span>
                    </div>);
            }

            let uniqueType = types[0];

            return (<div className="types">
                <span className="types" style={{ backgroundColor: setColor(uniqueType) }}>{uniqueType}</span>
            </div>);
        }

        let isPokemon = Object.getOwnPropertyNames(this.state.pokemon).length > 0;

        return (
            <div className="pokemon" style={{ backgroundColor: this.state.pokemon.color }}>
                {isPokemon ?
                    (
                        <div>
                            <div id={this.state.pokemon.name.toLowerCase() + "_container"} className="poke-container">
                                <div className="card-controls">
                                    <ul>
                                        <li>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipInfo}
                                            >
                                                <a href={`pokemon/${this.state.pokemon.id}`} className="card-icon card-info">
                                                    <i className="fa fa-info-circle"></i>
                                                </a>
                                            </OverlayTrigger>
                                        </li>
                                        <li>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipRemove}
                                            >
                                                <a href="#" className="card-icon card-remove">
                                                    <i className="fa fa-minus"></i></a>
                                            </OverlayTrigger>
                                        </li>
                                        <li>
                                            <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltipAdd}
                                            >
                                                <a href="#" onClick={(e) => this.addItem(e, this.state.pokemon.id)} className="card-icon card-add">
                                                    <i className="fa fa-plus"></i></a>
                                            </OverlayTrigger>
                                        </li>
                                    </ul>
                                </div>
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
                                <SpanTypes types={this.state.pokemon.types} />
                            </div>
                            <div id={this.state.pokemon.name.toLowerCase() + "_info"} className="more_info" style={{ display: 'none', opacity: '0' }} onClick={() => createPopUpCard(this.state.pokemon.name.toLowerCase())}>
                                <span className="title">Ability Info</span>
                                <h3 className="name_ability">{this.state.pokemon.ability.name}</h3>

                                {this.state.pokemon.ability.effect.map(ef => (
                                    <p>{ef}</p>
                                ))}
                            </div>
                        </div>
                    )
                    :
                    (
                        <Loading />
                    )}
            </div>
        );
    }
}