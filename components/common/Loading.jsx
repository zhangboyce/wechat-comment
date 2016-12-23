'use strict';
import React from 'react';

export default class Loading extends React.Component {

    render() {
        return (
            <div className="loading">
                <img src="/public/images/gears_quick.svg"/>
            </div>
        );
    }
}