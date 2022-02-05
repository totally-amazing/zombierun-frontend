import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import StandardModal from '../../common/components/StandardModal';

const PreviousResultScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModalHandler = () => {
    setModalVisible(true);
  };

  const testElement = (
    <View>
      <Text style={styles.testss}>user1</Text>
      <Text style={styles.testss}>user2</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <StandardModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        {testElement}
      </StandardModal>
      <Button
        disable={false}
        title="이전기록보기"
        onPress={openModalHandler} // 모달창 띄우기
      />
    </View>
  );
};

export default PreviousResultScreen;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  testss: {
    color: 'white',
  },
});
