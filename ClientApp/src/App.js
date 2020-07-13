import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import Home from './components/layout/Home';
import Pokemon from './components/pokemon/Pokemon';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path="/" component={Home} />       
                <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Layout>
        );
    }
}
