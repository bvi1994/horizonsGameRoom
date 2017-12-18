import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
const AppContainer = () => {
    return (
        <HashRouter>
          <div style={{height: "100%"}}>
<<<<<<< HEAD
            {/* <Route exact path="/" component={LoginForm} /> */}
            <Route exact path="/" component={Dashboard} />
=======
            <Route exact path="/" component={LoginForm} />
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
            <Route exact path="/dashboard" component={Dashboard} />
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
