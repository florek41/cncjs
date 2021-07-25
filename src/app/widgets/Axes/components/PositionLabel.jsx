import PropTypes from 'prop-types';
import React from 'react';

const PositionLabel = ({ value, customClickEvent }) => {
    value = String(value);
    return (
        <div onClick={customClickEvent} style={{ fontSize: 24, padding: 5, textAlign: 'right' }} aria-hidden="true">
            <span>{value.split('.')[0]}</span>
            <span>.</span>
            <span>{value.split('.')[1]}</span>
        </div>
    );
};

PositionLabel.propTypes = {
    customClickEvent: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default PositionLabel;
