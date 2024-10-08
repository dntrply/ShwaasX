import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  ScrollView,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { Text } from 'react-native-paper';
import QuestionBase from './QuestionBase';
import { t } from '../../messages';
import questionTypes from '../../domain/questionTypes/questionTypes';
import { isDefined } from '../../domain/questions/utils';
import QuestionImage from './QuestionImage';
import get from 'lodash/get';
import Image from 'react-native-scalable-image';
import { Image as ImageNative } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nonSelectedItem: {
    backgroundColor: '#F4F5F6',
    paddingHorizontal: 16,
    marginVertical: 8,
    marginRight: 8,
    minHeight: 50,
    borderRadius: 8,
    justifyContent: 'center',
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: '#4A58DD',
    paddingHorizontal: 16,
    marginVertical: 8,
    marginRight: 8,
    minHeight: 50,
    borderRadius: 8,
    justifyContent: 'center',
    elevation: 2,
  },
  selectedAnswerText: {
    fontSize: 24,
    color: '#FFF',
  },
  nonSelectedAnswerText: {
    fontSize: 24,
    color: '#000',
  },
  imageBackground: {
    width: 50,
    height: 50,
    paddingHorizontal: 0,
  },
  thumbnail: {
    borderRadius: 8,
  },
  flexUp: {
    flex: 1,
    justifyContent: 'center',
  },
});

const Item = ({ title, onPress, selectedAnswers, image }) => {
  const isSelected = selectedAnswers.includes(title);
  const [modalVisible, setModalVisible] = useState(false);
  const totalWidthOfScreen = Dimensions.get('window').width;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Modal
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
            {console.log("SelectQuestion.js --> TouchableOpacity --> before Image")}
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <ImageNative source={image} width={totalWidthOfScreen - 32} />
            </View>
            {console.log("SelectQuestion.js --> TouchableOpacity --> after Image")}
          </TouchableOpacity>
        )}
      </Modal>
      <View style={{ flex: 1 }}>
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedback onPress={() => onPress(title)}>
            <View
              style={[isSelected ? styles.selectedItem : styles.nonSelectedItem]}>
              <Text
                style={[
                  isSelected
                    ? styles.selectedAnswerText
                    : styles.nonSelectedAnswerText,
                ]}>
                {t(title)}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableOpacity onPress={() => onPress(title)}>
            <View style={[isSelected ? styles.selectedItem : styles.nonSelectedItem]}>
              <Text style={[isSelected ? styles.selectedAnswerText : styles.nonSelectedAnswerText]}>
                {t(title)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={[
          isSelected ? styles.selectedItem : styles.nonSelectedItem,
          styles.imageBackground,
        ]}>
        {image ? (
          Platform.OS === 'android' ? (
            <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
              <View style={styles.flexUp}>
                <Image source={image} width={50} style={styles.thumbnail}></Image>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {console.log("SelectQuestion.js --> TouchableOpacity 2 --> before Image")}
              <View style={styles.flexUp}>
                <ImageNative source={image} width={50} style={styles.thumbnail} resizeMode={'contain'} />
              </View>
              {console.log("SelectQuestion.js --> TouchableOpacity 2 --> after Image")}
            </TouchableOpacity>
          )
        ) : (
          <TouchableNativeFeedback onPress={() => onPress(title)}>
            <View style={styles.flexUp}></View>
          </TouchableNativeFeedback>
        )}
      </View>
    </View>
  );
};

const isSingleSelect = question =>
  [questionTypes.singleChoice.key, questionTypes.boolean.key].includes(
    question.type.key,
  );

export default ({ number, question, onAnswered = () => { }, value }) => {
  const answer = !isDefined(value)
    ? []
    : isSingleSelect(question)
      ? [value]
      : value;

  const onItemSelected = key => {
    if (isSingleSelect(question)) {
      onAnswered(question, key);
      return;
    }

    if (answer.includes(key)) {
      onAnswered(
        question,
        answer.filter(val => val !== key),
      );
      return;
    }

    onAnswered(question, answer.concat(key));
  };

  const RenderItem = ({ item, index, image }) => {
    return (
      <Item
        question={question}
        key={index}
        title={item}
        onPress={onItemSelected}
        selectedAnswers={answer}
        image={image}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionBase number={number} question={question} />
        {question.options.map((option, index) => {
          return (
            <RenderItem
              key={index}
              item={option}
              image={get(question, 'optionImages.' + option)}
            />
          );
        })}
        <QuestionImage image={question.commonImage} />
      </ScrollView>
    </View>
  );
};
