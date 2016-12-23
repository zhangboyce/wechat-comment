'use strict';

import React from 'react';
import Footer from './layout/Footer.jsx';
import Header from './layout/Header.jsx';
import ToolBar from './layout/ToolBar.jsx';
import Container from './comment/Container.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container-fluid">
                <Header />
                <Container />
                <Footer />
            </div>
        );
    }
}
