import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Button, StyleSheet } from 'react-native';

import COLORS from '../../../common/constants/COLORS';

const Pause = ({ onPress }) => {
  return (
    <Modal transparent>
      <View style={styles.backdrop}>
        <Button title="start" onPress={onPress} />
      </View>
    </Modal>
  );
};

export default Pause;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    opacity: 0.7,
  },
});

Pause.propTypes = {
  onPress: PropTypes.func.isRequired,
};
