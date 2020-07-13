import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import ReactLogo from './components/layout/icon.svg';

//import Search from './components/search/Search';

//var getPokemonByName = async inputValue => {
//    if (inputValue == null)
//        return [];

//    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
//    const res = await fetch(url);
//    const pokemon = await res.json();

//    return pokemon;
//};


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }


    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-dark-red" dark>
                    <Container>
                        <NavbarBrand tag={Link} to="/"><img src={ReactLogo} alt="React Logo" className="logo" /> POKEDEX</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Minhas Cartas</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>

        );
    }
}
