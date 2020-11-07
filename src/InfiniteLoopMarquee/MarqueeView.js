import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import QuickMakeMoneyAnimatedItem from './QuickMakeMoneyAnimatedItem';
import UI from '../../../../style/UI';

export default class MarqueeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.dataList = []; // 数据源
    this.setRefs = this.setRefs.bind(this);
  }

  static propTypes = {
    data: PropTypes.shape({}),
    speed: PropTypes.number,
  };

  static defaultProps = {
    data: [],
    speed: 1,
  };

  componentDidMount() {
    this.startMove();
    const {data} = this.props;
    this.addDataItem(data);
  }

  componentWillReceiveProps(props) {
    const {data} = props;
    this.addDataItem(data);
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  startMove = () => {
    this.move();
  };

  // 平移
  move = () => {
    const {speed} = this.props;
    this.interval = setInterval(() => {
      for (let index = 0; index < this.dataList.length; index += 1) {
        const b = this.dataList[index];
        b.position.left -= speed;
        const newLeft = b.position.left;
        if (newLeft < -b.ref.width) {
          this.removeItemFromList(b);
          continue;
        }
        b.ref.view.setNativeProps({
          style: {
            left: newLeft,
          },
        });
      }
    }, 30);
  };

  // 添加数据
  addDataItem = (item) => {
    const barrage = {
      ...item,
      position: {left: UI.size.screenWidth},
    };
    this.dataList.push(barrage);
    this.setState({list: this.dataList});
  };

  // 删除已经移动到屏幕外的数据
  removeItemFromList = (a) => {
    this.dataList = this.dataList.filter((item) => {
      return item.id !== a.id;
    });
    this.setState({
      list: this.dataList,
    });
  };

  setRefs(a, index) {
    if (a) {
      this.dataList[index].ref = a;
    }
  }

  getBarrageItems = () => {
    const {list} = this.state;
    const views = [];
    for (let index = 0; index < list.length; index += 1) {
      const b = list[index];
      const barrageItem = (
        <QuickMakeMoneyAnimatedItem
          ref={(a) => this.setRefs(a, index)}
          key={b.id}
          data={b}
          speed={2}
          type={2}
          heightOfLine={25}
        />
      );
      views.push(barrageItem);
    }
    return views;
  };

  render() {
    const barrageItems = this.getBarrageItems();
    console.log('barrageItems', barrageItems.length);
    return <View style={styles.container}>{barrageItems}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  barrageLine: {
    overflow: 'hidden',
  },
});
