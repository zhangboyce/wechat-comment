'use strict';

import React from 'react';
import Modal from './Modal.jsx';

export default class ModalAdd extends React.Component {

    static propTypes = {
        onAdd: React.PropTypes.func,
        row: React.PropTypes.object
    };

    handleAdd() {
        let inputs = $('#add input.form-control');

        let addedRow = {};
        for (let i=0; i<inputs.length; i++) {
            addedRow[$(inputs[i]).attr('name')] = $(inputs[i]).val();
        }
        this.props.onAdd(addedRow);
    }

    render() {
        let row = this.props.row;

        let inputs = [];
        for (let r in row) {

            let placeholder = "Enter " + r;
            let input = (
                <div className="form-group row">
                    <label for="example-text-input" className="col-xs-2 col-form-label">{r}</label>
                    <div className="col-xs-10">
                        <input className="form-control" defaultValue={row[r]} name={r} type="text" placeholder={placeholder}/>
                    </div>
                </div>
            );
            inputs.push(input);
        }

        return (
            <Modal show={this.props.showModal} id="modalAdd">
                <Modal.Header closeModal={this.props.closeModal}>
                    <h3>Add a Item.</h3>
                </Modal.Header>
                <Modal.Body>
                    <div id="add">
                        {inputs}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" value="Add" className="btn btn-success" onClick={() => this.handleAdd()}>Add</button>
                </Modal.Footer>
            </Modal>
        );
    }
};
