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
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  unit: PropTypes.string,
};

TextChunk.defaultProps = {
  title: '',
  value: '',
  unit: '',
};

export default TextChunk;
