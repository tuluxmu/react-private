import React,
{
    Component,
    PropTypes
}
from 'react';
import Cover from './cover';
import ScrollSelectHeader from './scrollSelectHeader';
import ScrollSelectContent from './scrollSelectContent';
const ScrollSelect = React.createClass({
 getInitialState() {
  return {
    flag: true,
    leftValue: this.props.initialLeftValue,
    rightValue: this.props.initialRightValue,
    display: this.props.display
  }
 },
 listenerLeftValue(value) {
    //console.log('listenerLeftValue', this.props.leftData[value]);
    this.setState({
        leftValue: this.props.leftData[value]
    });
  },
 listenerRightValue(value) {
    //console.log('listenerRightValue', this.props.rightData[value]);
    this.setState({
        rightValue: this.props.rightData[value]
    });

 },
 clickEvent(bool) {
    console.log('clickEvent', bool);
    this.setState({display: false});
    !bool ? this.setState({leftValue: this.props.initialLeftValue, rightValue: this.props.initialRightValue}) : '';
   // !bool ? this.props.listenerValue({leftValue: this.props.initialLeftValue, rightValue: this.props.initialRightValue}) : this.props.listenerValue({leftValue: this.state.leftValue, rightValue: this.state.rightValue}) ;
 },
 render() {
    var ScrollSelect = this.state.display ? {} : {display: 'none'};
    return (
        <div className='scroll-select' style={ScrollSelect}>
          <Cover clickEvent={this.clickEvent}/>
          <ScrollSelectHeader ok='确定' no='取消' title='经期、周期' clickEvent={this.clickEvent}/>
          <div className='scroll-select-content clearfix'>
            <ScrollSelectContent sectionClassName='h5_scroll_left' ulClassName='h5_scroll_wrap_left' data={this.props.leftData } initialValue={this.props.initialLeftValue} listenerValue={this.listenerLeftValue}/>
            <ScrollSelectContent sectionClassName='h5_scroll_right' ulClassName='h5_scroll_wrap_right' data={this.props.rightData} initialValue={this.props.initialRightValue} listenerValue={this.listenerRightValue}/>
            <div className='selected-day'></div>
          </div>
        </div>
      );
  },
 componentWillReceiveProps(nextProps) {
  this.setState({
      display: nextProps.display
  });
 }
});
export default ScrollSelect;