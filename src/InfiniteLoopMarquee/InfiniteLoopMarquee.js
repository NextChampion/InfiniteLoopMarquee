import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import UI from '../../../../style/UI';

import QuickMakeMoneyMovedList from './QuickMakeMoneyMovedList';

export default class InfiniteLoopMarquee extends Component {
  constructor(props) {
    super(props);
    const [first] = props.data;
    this.dataIndex = 0;
    this.state = {
      newItem: first,
    };
    this.dataId = 1000;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.addItem();
    }, 6000);
  };

  addItem = () => {
    this.dataIndex += 1;
    const {data} = this.props;
    const {length} = data;
    if (this.dataIndex >= length) {
      this.dataIndex = 0;
    }
    const item = data[this.dataIndex];
    this.dataId += 1;
    this.setState({
      newItem: {...item, id: this.dataId},
    });
  };

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  render() {
    const {newItem} = this.state;
    return (
      <View style={styles.container}>
        <QuickMakeMoneyMovedList data={newItem} numberOfLines={10} speed={1} />
      </View>
    );
  }
}

const Scale = UI.size.screenWidth / 375;
const styles = StyleSheet.create({
  container: {
    height: 110 * Scale,
    marginHorizontal: 3,
  },
});
