import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../../NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <Container style={{ marginBottom: '50px' }}>
                    {this.props.children}
                </Container>
                <footer>
                    <p>Created with: <a href="https://pokeapi.co/">PokeAPI</a></p>
                </footer>
            </div>
        );
    }
}
