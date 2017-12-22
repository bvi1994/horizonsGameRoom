import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import SlowMo from '../components/Ready/SlowMo';
const ReadyContainer = () => {
    return (
        <SlowMo />
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
