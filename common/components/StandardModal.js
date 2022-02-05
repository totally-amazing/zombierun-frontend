import React from 'react';

import { Modal, StyleSheet, View, Pressable, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import COLORS from '../constants/COLORS';
import FONT from '../constants/FONT';

const StandardModal = ({ modalVisible, setModalVisible, children }) => {
  const closeModalHandler = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.backSpace}>
          <View style={styles.blankSpace}>
            <Pressable style={styles.button} onPress={closeModalHandler}>
              <Text>
                <AntDesign name="closecircleo" style={styles.closeCircleo} />
              </Text>
            </Pressable>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StandardModal;

const styles = StyleSheet.create({
  backSpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
    opacity: 0.8,
  },

  blankSpace: {
    width: 300,
    height: 400,
    margin: 10,
    padding: 35,
    borderRadius: 20,
    backgroundColor: COLORS.BLACK,
    alignItems: 'center',
  },
  button: {
    left: 115,
    bottom: 20,
    borderRadius: 20,
    elevation: 2,
  },
  closeCircleo: {
    fontSize: FONT.MEDIUM,
    color: COLORS.WHITE,
  },
});

StandardModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  children: PropTypes.objectOf(PropTypes.object),
};

StandardModal.defaultProps = {
  children: {},
};
