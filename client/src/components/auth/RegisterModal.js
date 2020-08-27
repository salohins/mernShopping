import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap' 

const RegisterModal = props => {
    const [state, setState] = useState({
        isOpen: false,
        name: '',
        email: '',
        password: '',
        msg: null
    })

    const usePrevious = value => {
        const ref = useRef()
        useEffect(() => {
            ref.current = value
        })
        return ref.current
    }

    const { error } = props
    const prevError = usePrevious({ error })

    useEffect(() => {
        if (error !== prevError) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL')
                setState({ ...state, msg: error.msg.msg })
            else    
                setState({ ...state, msg: null })
        }

        // IF authenticated close modal
        if (state.isOpen && props.isAuthenticated) toggle()

    },[props])

    const toggle = () => {
        //Clear errors
        props.clearErrors()
        setState({...state, isOpen: !state.isOpen})
    }
    const onSubmit = e => {
        e.preventDefault() 

        const { name, email, password} = state

        // Create user object
        const newUser = {
            name,
            email,
            password
        }
        
        // Attempt to register
        props.register(newUser)
    } 

    return (
        <div>
            <NavLink onClick={ toggle } href="#">
                Register
            </NavLink>

            <Modal
                isOpen={state.isOpen}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    { state.msg && <Alert color='danger'> { state.msg } </Alert>}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="User name"
                                onChange={(e) => setState({...state, name: e.target.value})}
                                className="mb-3"
                                required
                            >
                            </Input>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="User email"
                                onChange={(e) => setState({...state, email: e.target.value})}
                                className="mb-3"
                            >
                            </Input>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="User password"
                                onChange={(e) => setState({...state, password: e.target.value})}
                                className="mb-3"
                                required
                            >
                            </Input>

                            <br/>
                            <Button
                                color='dark'                                             
                            >Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
}) 

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps, 
    { register, clearErrors }
)(RegisterModal) 
