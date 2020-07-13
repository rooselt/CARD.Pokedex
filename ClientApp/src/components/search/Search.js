import React, { Component } from 'react';

export default class Search extends Component {
    static displayName = Search.name;

    constructor(props) {
        super(props);

        this.state = { text: '' }
    }

    onFormSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.text.toLowerCase())
    }


    render() {
        return (
            <div>
                <div style={{ margin: '31px' }}>
                    <h3>Digite as cartas que deseja e aperte ENTER ou Escolha as do DECK:</h3>
                </div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder="Pokemon"
                        className="form-control mx-auto"
                        value={this.state.text.toLowerCase()}
                        onChange={e => this.setState({ text: e.target.value.toLowerCase() })}
                        style={{
                            backgroundColor: 'white transparent',
                            height: '1.75em',
                            width: '95%',
                            borderRadius: '15px',
                            opacity: '0.8',
                            fontSize: '1.75em',
                            marginBottom: '27px'
                        }}
                    />
                </form>
                <hr />
                <h3>DECK</h3>
            </div>
        );
    }
}