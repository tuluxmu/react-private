import React, { Component, PropTypes }from 'react';
var leftImg = require('./img/left.png');
var rightImg = require('./img/right.png');
const YearMonth = React.createClass({
  getInitialState() {
    var now = new Date();
    this.time = {
      now: {
          year: now.getFullYear(),
          month: now.getMonth() + 1
        }
    }
    return {
      time: this.time,
      index: 0
    }
  },
  render() {
    var pre = this.pre;
    var next = this.next;
    return (
      <div  className='select-date'>
          <img className='select-date-pre' src={leftImg} onClick={pre}/>
          <span className='select-date-center'>
            <span className='select-date-center-year'>{this.state.time.now.year}</span>年
            <span className='select-date-center-month'>{this.state.time.now.month}</span>月
          </span>
          <img className='select-date-next' src={rightImg} onClick={next}/>
      </div>
      );
  },
  pre() {
    this.setState({
      time:{
        now: {
          year: this.preNext(this.state.time.now.year, this.state.time.now.month).pre.year,
          month: this.preNext(this.state.time.now.year, this.state.time.now.month).pre.month
        }
      }
    });
  },
  next() {
    this.setState({
      time:{
        now: {
          year: this.preNext(this.state.time.now.year, this.state.time.now.month).next.year,
          month: this.preNext(this.state.time.now.year, this.state.time.now.month).next.month
        }
      }
    });
  },
  preNext: function(year, month) { //计算前后的年-月
    var pre = {
      year: preDay(year, month).year,
      month: preDay(year, month).month
    };
    var next = {
      year: nextDay(year, month).year,
      month: nextDay(year, month).month
    };

    return {
      pre: pre,
      next: next
    }
    function preDay(year, month) {
      if (month === 1) {
        year = year - 1;
        month = 12;
      } else {
        month = month - 1;
      }
      return {
        year: year,
        month: month
      }
    }

    function nextDay(year, month) {
      if (month === 12) {
        year = year + 1;
        month = 1;
      } else {
        month = month + 1;
      }
      return {
        year: year,
        month: month
      }
    }

  }
});
export default YearMonth;
