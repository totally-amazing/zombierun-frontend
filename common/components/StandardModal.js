import React from 'react';

import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import COLORS from '../constants/COLORS';
import FONT from '../constants/FONT';
import { toggleModal } from '../../store/uiSlice';

const StandardModal = ({ children }) => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.ui.isVisible);

  const handleCloseButton = () => {
    dispatch(toggleModal());
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <TouchableOpacity
        style={styles.backSpace}
        activeOpacity={1}
        onPress={handleCloseButton}
      >
        <TouchableWithoutFeedback>
          <View style={styles.blankSpace}>
            <Pressable style={styles.button} onPress={handleCloseButton}>
              <Text>
                <AntDesign name="closecircleo" style={styles.closeCircleo} />
              </Text>
            </Pressable>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default StandardModal;

const styles = StyleSheet.create({
  backSpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: COLORS.BLACK,
  },

  blankSpace: {
    width: 300,
    height: 400,
    margin: 10,
    padding: 35,
    borderRadius: 20,
    elevation: 20,
    alignItems: 'center',
    backgroundColor: COLORS.BLACK,
  },
  button: {
    left: 115,
    bottom: 20,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: COLORS.BLACK,
  },
  closeCircleo: {
    fontSize: FONT.MEDIUM,
    color: COLORS.WHITE,
  },
});

StandardModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
