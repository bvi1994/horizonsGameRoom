import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import Triangle from '../components/Triangle/Triangle';
const ReadyContainer = () => {
    return (
        <HashRouter>
          <div style={{height: "100%"}}>
            <Route exact path="/" component={Triangle} />
          </div>
        </HashRouter>
    );
};

ReadyContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadyContainer);
