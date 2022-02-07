import React from 'react';
import PropTypes from 'prop-types';
import TitleText from './TitleText';
import UnitText from './UnitText';

const TextChunk = ({ title, value, unit }) => {
  return (
    <TitleText title={title}>
      <UnitText value={value} unit={unit} />
    </TitleText>
  );
};

TextChunk.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  unit: PropTypes.string,
};

TextChunk.defaultProps = {
  unit: '',
};

export default TextChunk;
