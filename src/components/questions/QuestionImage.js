import { Dimensions, Modal, TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';
import React, { useState } from 'react';
import Image from 'react-native-scalable-image';
import { Image as NativeImage} from 'react-native';

const QuestionImage = ({ image }) => {
  if (!image) return null;
  const totalWidthOfScreen = Dimensions.get('window').width - 32;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginVertical: 16, alignItems: 'center', width: '120px', height: '120px',  alignContent: 'center'}}>
      <Modal
      width='auto'
      height='120px'
        animationType={'fade'}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Image source={image} width={totalWidthOfScreen - 32} />
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <NativeImage source={image} width={'20px'} height={'20px'}/>
            </View>
          </TouchableOpacity>
        )}
      </Modal>
      {Platform.OS === 'android' ? (
        <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
              <Image source={image} width={totalWidthOfScreen / 2} />
        </TouchableNativeFeedback>
      ) : (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
              <NativeImage source={image} width={'20px'} height={'20px'}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

QuestionImage.displayName = 'QuestionImage';

export default QuestionImage;
