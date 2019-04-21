import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createDefaultRedirector} from '../router'

import Dashboard from './Dashboard'
import PageLogin from './PageLogin'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {
        return renderFunction(this.props)
    }
}

const renderFunction = ({location, defaultRedirector}) => {

  console.log('router location', location);
    if(location.pathname === '/login') {
      return <PageLogin />
    } else {
      return <Dashboard/>
    }
}

App.propTypes = {
    defaultRedirector: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
      location: state.location
    }
}

const mapDispatchToProps = (dispatch) => ({
    defaultRedirector: createDefaultRedirector(dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, { forwardRef: true }
)(App);
