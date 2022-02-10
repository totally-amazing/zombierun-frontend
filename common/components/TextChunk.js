import React from 'react';
import PropTypes from 'prop-types';

import TinyTitle from './TinyTitle';
import ValueWithUnit from './ValueWithUnit';

const TextChunk = ({ title, value, unit }) => {
  return (
    <TinyTitle title={title}>
      <ValueWithUnit value={value} unit={unit} />
    </TinyTitle>
  );
};

TextChunk.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string,
};

TextChunk.defaultProps = {
  unit: '',
};

export default TextChunk;
