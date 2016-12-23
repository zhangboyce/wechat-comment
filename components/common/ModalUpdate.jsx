'use strict';

import React from 'react';
import Modal from './Modal.jsx';

export default class ModalUpdate extends React.Component {

    static propTypes = {
        onUpdate: React.PropTypes.func,
        row: React.PropTypes.object
    };

    handleUpdate () {
        let inputs = $('#update input.form-control');

        let updatedRow = {};
        for (let i=0; i<inputs.length; i++) {
            updatedRow[$(inputs[i]).attr('name')] = $(inputs[i]).val();
        }
        this.props.onUpdate(updatedRow);
    }

    render() {
        let row = this.props.row;

        let inputs = [];
        for (let r in row) {
            let input = (
                <div className="form-group row">
                    <label for="example-text-input" className="col-xs-2 col-form-label">{r}</label>
                    <div className="col-xs-10">
                        <input className="form-control" defaultValue={row[r]} name={r} type="text" />
                    </div>
                </div>
            );
            inputs.push(input);
        }

        return (
            <Modal show={this.props.showModal} id="modalUpdate">
                <Modal.Header closeModal={this.props.closeModal}>
                    <h3>Update a Item.</h3>
                </Modal.Header>
                <Modal.Body>
                    <div id="update">
                        {inputs}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" value="Ok" className="btn btn-success" onClick={() => this.handleUpdate()}>Update</button>
                </Modal.Footer>
            </Modal>
        );
    }
};
