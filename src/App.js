import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createDefaultRedirector} from './router'

import * as pages from './containers'

const App = ({page, location}) => {
  const CurrentPage = pages[page];
  return <CurrentPage />
}

App.propTypes = {
    defaultRedirector: PropTypes.func.isRequired
}

const mapStateToProps = ({page, location}) => ({page, location})

const mapDispatchToProps = (dispatch) => ({
    defaultRedirector: createDefaultRedirector(dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, { forwardRef: true }
)(App);
