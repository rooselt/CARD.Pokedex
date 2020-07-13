import React, { Component } from 'react';

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

export default class Pokemon extends Component {
    static displayName = Pokemon.name;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            pokemonIndex: '',
            imageUrl: '',
            types: [],
            description: '',
            statTitleWidth: 3,
            statBarWidth: 9,
            stats: {
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                specialAttack: '',
                specialDefense: ''
            },
            height: '',
            weight: '',
            eggGroups: '',
            catchRate: '',
            abilities: '',
            genderRatioMale: '',
            genderRatioFemale: '',
            evs: '',
            hatchSteps: '',
            themeColor: '#EF5350'
        };
    }

    async componentDidMount() {

        const { pokemonIndex } = this.props.match.params;

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        let response = await fetch(pokemonUrl);
        let pokemon = await response.json();
        let name = pokemon.name;
        let imageUrl = pokemon.sprites["front_default"];

        pokemon.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });

        let height =
            Math.round((pokemon.height * 0.328084 + 0.00001) * 100) / 100;
        let weight =
            Math.round((pokemon.weight * 0.220462 + 0.00001) * 100) / 100;

        let types = pokemon.types.map(type => type.type.name);
        let themeColor = `${main_types[types[types.length - 1]]}`;
        let abilities = pokemon.abilities
            .map(ability => {
                return ability.ability.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            })
            .join(', ');

        let evs = pokemon.stats
            .filter(stat => {
                if (stat.effort > 0) {
                    return true;
                }
                return false;
            })
            .map(stat => {
                return `${stat.effort} ${stat.stat.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}`;
            })
            .join(', ');

        await fetch(pokemonSpeciesUrl)
            .then(response => response.json())
            .then(response => {

                let description = '';

                response.flavor_text_entries.some(flavor => {
                    if (flavor.language.name === 'en') {
                        description = flavor.flavor_text;
                        return;
                    }
                });

                let femaleRate = response.gender_rate;
                let genderRatioFemale = 12.5 * femaleRate;
                let genderRatioMale = 12.5 * (8 - femaleRate);
                let catchRate = Math.round((100 / 255) * response.capture_rate);
                let eggGroups = response.egg_groups.map(group => {
                    return group.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                }).join(', ');

                let hatchSteps = 255 * (response.hatch_counter + 1);

                this.setState({
                    description,
                    genderRatioFemale,
                    genderRatioMale,
                    catchRate,
                    eggGroups,
                    hatchSteps
                });
            });

        this.setState({
            imageUrl,
            pokemonIndex,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            themeColor,
            height,
            weight,
            abilities,
            evs
        });
    }

    render() {
        return (
            <div className="card-container">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>{this.state.pokemonIndex}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {this.state.types.map(type => (
                                        <span
                                            key={type}
                                            className="badge badge-pill mr-1"
                                            style={{
                                                backgroundColor: `${tagColors[type]}`,
                                                color: 'white'
                                            }}>
                                            {type
                                                .toLowerCase()
                                                .split(' ')
                                                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                                .join(' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className=" col-md-3 ">
                                <img
                                    src={this.state.imageUrl}
                                    className="card-img-top rounded mx-auto mt-2"
                                />
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto">
                                    {this.state.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')}
                                </h4>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        HP
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.hp}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Attack
                                     </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.attack}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Defense
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.defense}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Speed
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.speed}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Sp Atk
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.specialAttack}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow={this.state.stats.specialAttack}
                                                aria-valuemin="0">
                                                <small>{this.state.stats.specialAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        Sp Def
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.specialDefense}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow={this.state.stats.specialDefense}
                                                aria-valuemin="0"
                                                aria-valuemax="100">
                                                <small>{this.state.stats.specialDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col text-compress">
                                <p className="text-compress">{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title text-center">Profile</h5>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="col-2">
                                            <h6 className="float-left">Height:</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="float-right">{this.state.height} ft.</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6 className="float-left">Weight:</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="float-right">{this.state.weight} lbs</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6 className="float-left">Catch Rate:</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="float-right">{this.state.catchRate}%</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="float-left">Gender Ratio:</h6>
                                        </div>
                                        <div className="col-9">
                                            <div className="progress float-right" style={{ width: '65%' }}>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${this.state.genderRatioFemale}%`,
                                                        backgroundColor: '#c2185b'
                                                    }}
                                                    aria-valuenow="15"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100">
                                                    <small>{this.state.genderRatioFemale}</small>
                                                </div>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${this.state.genderRatioMale}%`,
                                                        backgroundColor: '#1976d2'
                                                    }}
                                                    aria-valuenow="30"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100">
                                                    <small>{this.state.genderRatioMale}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="col-4">
                                            <h6 className="float-left">Egg Groups:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">{this.state.eggGroups} </h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="float-left">Hatch Steps:</h6>
                                        </div>
                                        <div className="col-5">
                                            <h6 className="float-right">{this.state.hatchSteps}</h6>
                                        </div>
                                        <div className="col-4">
                                            <h6 className="float-left">Abilities:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">{this.state.abilities}</h6>
                                        </div>
                                        <div className="col-2">
                                            <h6 className="float-left">EVs:</h6>
                                        </div>
                                        <div className="col-5">
                                            <h6 className="float-right">{this.state.evs}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        Data From{' '}
                        <a href="https://pokeapi.co/" target="_blank" className="card-link">
                            PokeAPI.co
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}