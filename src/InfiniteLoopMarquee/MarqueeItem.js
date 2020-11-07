import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import UI from '../../../../style/UI';
import QuickItem from '../QuickItem';

const imageWidth = 20;

export default class MarqueeItem extends Component {
  constructor(props) {
    super(props);
    this.position = UI.size.screenWidth;
    this.isFreeState = false; // 是否空闲
    this.width = 0; // 弹幕本身的宽度
  }

  static propTypes = {
    data: PropTypes.object, // 数据
    type: PropTypes.number, // 弹幕类型
  };

  static defaultProps = {
    data: {},
    type: 1,
  };

  shouldComponentUpdate() {
    return false;
  }

  renderTextType = () => {
    const {data} = this.props;
    const {title} = data;
    this.width = 16 * title.length;
    return (
      <View
        style={[styles.view, {left: this.position}]}
        removeClippedSubviews={true}
        ref={(a) => (this.view = a)}>
        <Text>{title}</Text>
      </View>
    );
  };

  renderImageType = () => {
    const {data} = this.props;
    const {title} = data;
    this.width = 16 * title.length + imageWidth;
    return (
      <View
        style={[styles.imageView, {left: this.position}]}
        removeClippedSubviews={true}
        ref={(a) => (this.view = a)}>
        <QuickItem data={data} onPress={this.onQuickItemPress} />
      </View>
    );
  };

  render() {
    return this.renderImageType();
  }
}

const styles = StyleSheet.create({
  view: {
    overflow: 'hidden',
    position: 'absolute',
    // borderWidth: 1,
  },
  text: {
    backgroundColor: 'red',
    fontSize: 16,
    lineHeight: 20,
  },
  imageView: {
    overflow: 'hidden',
    position: 'absolute',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
