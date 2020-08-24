import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

const ItemModal = props => {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('');

    const toggle = () => setOpen(!isOpen);

    const onSubmit = e => {
        e.preventDefault();

        if (name) {
            props.addItem({ name }); 
            toggle();
        }

    };

    return (
        <div>
            <Button
                color='dark'
                style={{marginBottom: '2rem'}}
                onClick={toggle}
            >Add Item</Button>

            <Modal
                isOpen={isOpen}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add Shopping Item"
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Input>

                            <br/>
                            <Button
                                color='dark'                                             
                            >Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    item: state.itemS
});

export default connect(mapStateToProps, { addItem })(ItemModal);
