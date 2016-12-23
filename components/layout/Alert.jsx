'use strict';

import React from 'react';

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccess: false,
            showInfo: false,
            showWarn: false,
            showError: false,
        };
    }

    change = (showWhat) => {
        if (showWhat === 'success') {
            this.setState({
                showSuccess: true
            });
        } else if (showWhat === 'info') {
            this.setState({
                showInfo: true
            });
        } else if (showWhat === 'warn') {
            this.setState({
                showWarn: true
            });
        } else if (showWhat === 'error') {
            this.setState({
                showError: true
            });
        } else {
            this.setState({
                showSuccess: false,
                showInfo: false,
                showWarn: false,
                showError: false,
            });
        }
    }

    componentDidMount() {
        this.change(this.props.show);

        console.log('Alert componentDidMount -> ');
        console.log(this.state);
    }


    componentWillReceiveProps(nextProps) {
        let showWhat = nextProps.show;
        this.change(showWhat);

        console.log('Alert componentWillReceiveProps -> ');
        console.log(this.state);
    }

    render() {
        return (
            <div className="alert-container">
                <Alert_Success id="success" show={this.state.showSuccess} >
                    {this.props.children}
                </Alert_Success>

                <Alert_Info  id="info" show={this.state.showInfo} >
                    {this.props.children}
                </Alert_Info>

                <Alert_Warn  id="warn" show={this.state.showWarn} >
                    {this.props.children}
                </Alert_Warn>

                <Alert_Error  id="error" show={this.state.showError} >
                    {this.props.children}
                </Alert_Error>
            </div>
        );
    }
}

let Alert_Message = Wrapped => class extends React.Component {

    static propTypes = {
        id: React.PropTypes.string.required,
    };

    showModal = () => {
        $("#" + this.props.id).show(600).hide(1200);
    };

    hideModal = () => {
        $("#" + this.props.id).hide();
    };

    componentDidMount() {
        if (this.props.show === true) {
            this.showModal();
        } else {
            this.hideModal();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show === true) {
            this.showModal();
        } else {
            this.hideModal();
        }
    }

    render() {
        return (
            <Wrapped {...this.props}/>
        );
    }
};

let Alert_Success = Alert_Message(class extends React.Component {
    render() {
        return (
            <div className="alert alert-success alert-dismissible" role="alert" id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
});

let Alert_Info = Alert_Message(class extends React.Component {
    render() {
        return (
            <div className="alert alert-info alert-dismissible" role="alert" id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
});

let Alert_Warn = Alert_Message(class extends React.Component {
    render() {
        return (
            <div className="alert alert-warning alert-dismissible" role="alert" id={this.props.id}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.children}
            </div>
        );
    }
});

let Alert_Error = Alert_Message(class extends React.Component {
    render() {
        return (
            <div className="alert alert-danger alert-dismissible" role="alert" id={this.props.id}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.children}
            </div>
        );
    }
});