'use strict';

import React from 'react';
import Modal from './Modal.jsx';

export default class ModalDelete extends React.Component {

    static propTypes = {
        onDelete: React.PropTypes.func
    };

    handleDelete() {
        this.props.onDelete();
    }

    render () {
        return (
            <Modal show={this.props.showModal} id="modalDelete">
                <Modal.Header closeModal={this.props.closeModal}>
                    <h3>Are you sure to delete?</h3>
                </Modal.Header>
                <Modal.Footer>
                    <button type="button" value="Delete" className="btn btn-danger" onClick={() =>this.handleDelete()}>Delete</button>
                </Modal.Footer>
            </Modal>
        );
    }
};
