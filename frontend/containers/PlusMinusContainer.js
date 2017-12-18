import PropTypes from 'prop-types';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import PlusMinus from '../components/PlusMinus/PlusMinus';
const PlusMinusContainer = () => {
    return (
      <MuiThemeProvider>
        <HashRouter>
          <div style={{height: "100%"}}>
            <Route exact path="/" component={PlusMinus} />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
};

PlusMinusContainer.propTypes = {
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
)(PlusMinusContainer);
