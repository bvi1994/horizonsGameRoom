import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import Title from '../components/Title';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';

const AppContainer = (/*{ name }*/) => {
    return (
        <div>
            {/* <Title name={name} /> */}
            {/* <LoginForm /> */}
            <Dashboard />
        </div>
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
