import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Search from './components/search/Search';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
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
                        <NavbarBrand tag={Link} to="/">POKEDEX</NavbarBrand>
                        <Search />
                        <div class="div-direction-left pull-left">
                            <a href="#" id="left-button" className="pull-left a-left"><i className="fa fa-angle-left" style={{ fontSize: '22px' }}></i></a>
                        </div>                     
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Minhas Cartas</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                        <div class="div-direction-right pull-right">
                            <a href="#" id="right-button" className="pull-right a-right "><i className="fa fa-angle-right" style={{ fontSize: '22px' }}></i></a>
                        </div>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
