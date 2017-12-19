import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import Plane from '../components/Ready/Plane';
import SlowMo from '../components/Ready/SlowMo';
const ReadyContainer = () => {
    return (
        <HashRouter>
          <div style={{height: "100%"}}>
            <Route exact path="/plane" component={Plane} />
            <Route exact path="/slowMo" component={SlowMo} />
          </div>
        </HashRouter>
    );
};

ReadyContainer.propTypes = {
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
)(ReadyContainer);
