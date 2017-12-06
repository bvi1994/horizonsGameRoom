import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
const AppContainer = () => {
    return (
        <HashRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={LoginForm} />
          </div>
        </HashRouter>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
