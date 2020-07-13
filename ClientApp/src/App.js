import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/layout/Layout';
import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path="/" component={Dashboard} />       
                <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Layout>
        );
    }
}
