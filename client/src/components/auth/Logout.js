import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { NavLink } from 'reactstrap'
import PropTypes from 'prop-types'

const Logout = props => {
    return (
        <Fragment>
            <NavLink onClick={ props.logout } href='#'>
                Logout
            </NavLink>
        </Fragment>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(
    null,
    { logout }
)(Logout)