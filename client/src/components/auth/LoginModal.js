import React, { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux' 
import PropTypes from 'prop-types' 
import { login } from '../../actions/authActions'
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

const LoginModal = props => {
    const [state, setState] = useState({
        isOpen: false,
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
            if (error.id === 'LOGIN_FAIL')
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

        const  { email, password } = state

        const user = {
            email,
            password
        }

        // Attempt to login
        props.login(user)
    } 

    return (
        <div>
            <NavLink onClick={ toggle } href="#">
                Login
            </NavLink>

            <Modal
                isOpen={state.isOpen}
                toggle={toggle}
            >

                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    { state.msg && <Alert color='danger'> { state.msg } </Alert>}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
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
                            >Login</Button>
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

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps, 
    { login, clearErrors }
)(LoginModal) 
