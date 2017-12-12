import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import Ready from '../components/Ready';
const SlapAppContainer = () => {
    return (
        <HashRouter>
          <div style={{height: "100%"}}>
            {/* <Route exact path="/" component={SlapJack} /> */}
            <Route exact path="/" component={Ready} />
          </div>
        </HashRouter>
    );
};

SlapAppContainer.propTypes = {
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
)(SlapAppContainer);
