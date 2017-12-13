import React from 'react';
import PropTypes from 'prop-types';

const PlusMinus = ( { name } ) => {
    return (
        <h1>{name}</h1>
    );
};

PlusMinus.propTypes = {
    name: PropTypes.string,
};


export default PlusMinus;
