'use strict';
import React from 'react';

class Modal extends React.Component {

    static propTypes = {
        id: React.PropTypes.string.required,
    };

    showModal = () => {
        $("#" + this.props.id).modal('show');
    };

    hideModal = () => {
        $("#" + this.props.id).modal('hide')
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
            <div className="modal fade" id={this.props.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.Header = class ModalHeader extends React.Component {
    render() {
        return (
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        onClick={this.props.closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.children}
            </div>
        );
    }
};

Modal.Body = class ModalBody extends React.Component {
    render() {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
};

Modal.Footer = class ModalFooter extends React.Component {
    render() {
        return (
            <div className="modal-footer">
                {this.props.children}
            </div>
        );
    }
};


export default Modal;