import React, { Component, PropTypes }from 'react';
import {hasClass, addClass, removeClass} from './common';
import YearMonth from './yearMonth';
import RenderWeek from './renderWeek';
import RenderDay from './renderDay';
require('./app.css');
const App = React.createClass({
  propTypes: {
    children: PropTypes.any,
    className: PropTypes.string
  },
  getDefaultProps() {
    console.log('getDefaultProps');
    return {
      placeholder: '搜索'
    }
  },
  getInitialState() {
    console.log('getInitialState');
    this.now = new Date();
    this.time = {
      now: {
          year: this.now.getFullYear(),
          month: this.now.getMonth() + 1,
          date: this.now.getDate()
        }
    }
    return {
      now: this.now,
      time: this.time,
      index: 0
    }
  },
  render() {
    console.log('render');
    
    return (
      <div>  
        <YearMonth />
        <RenderWeek />
        <RenderDay />
      </div>
    );
  },
  
  renderDay(ele, year, month) {
    var ItemWidth = window.innerWidth / 7;
    ItemWidth = ItemWidth.toFixed(0);
    var ItemHtml = '';
    var ItemDay = 0;
    var nextDay = 1;
    var Dayth = getDayWeek(year, month-1);
    var Row = 34;
    document.querySelectorAll('.swipe-wrap')[0].cssText="height:226px";
    
    if (getMonthDay(year, month) + Dayth > 35) {
      Row = 41;
      document.querySelectorAll('.swipe-wrap')[0].cssText="height:273px";
    }
    var Obj = window["data"][month-1];
    var position = Dayth-1  ;
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        var Item = document.createElement('span');
        Item.className='dayItem';
        Item.setAttribute ('data-index', i*7+j);

        //上次排卵日
        if (i * 7 + j === (Obj.lastPaiRuanRi + position+1) &&  Obj.lastPaiRuanRi!= -1) {
          addClass(Item, 'paiRuanRi');
        }

        //这次排卵日

        if (Obj.PaiRuanRi !== -1 && i * 7 + j === Obj.PaiRuanRi + position) {
          addClass(Item, 'paiRuanRi');
        }

        //经期
        if (Obj["jingqi"][0] !== -1 && i * 7 + j >= (Obj["jingqi"][0] + position) && i * 7 + j < (Obj["jingqi"][1] + position)) {
          addClass(Item, 'selected-background');
        } 
        else if(Obj["jingqi"][0] !== -1 && i * 7 + j == (Obj["jingqi"][0] + position) && i * 7 + j == (Obj["jingqi"][1] + position)) {
         addClass(Item, 'selected-background');
        }

        //易孕期
        if (Obj["yiyunqi"][0] !== -1 && i * 7 + j >= (Obj["yiyunqi"][0] + position) && i * 7 + j <= (Obj["yiyunqi"][1] + position)) {
          addClass(Item, 'yiYunQi');
        }
        
        Item.style.position = 'absolute';
        Item.style.height = '43px';
        Item.style.width = ItemWidth - 2 + 'px';

        if (i == 0 && j < Dayth) {
          addClass(Item, 'lastMonth');
        } else if (currentDay === 0) {
          addClass(Item, 'nextMonth');
        } else {
          var currentDay = (++ItemDay) % (getMonthDay(year, month) + 1);
          if (currentDay === 0) {
            addClass(Item, 'nextMonth');
          } else {
            if (month == this.time.now.month && currentDay == this.time.now.date) {
              Item.style.position = 'absolute';
              Item.style.height = '43px';
              Item.style.width = ItemWidth - 2 + 'px';
              addClass(Item, 'today');
            }
            Item.textContent = currentDay;
            
          }

        }
        Item.style.top = (i * 45 + 2) + 'px';
        Item.style.left = j * ItemWidth + 'px';
        document.querySelectorAll(ele)[0].appendChild(Item);
      }
    }
    function getDayWeek(year, month) {
          if (month < 10) {
            month = '0' + month;
          }
          if(month == '00' ) {
              return new Date(year, 0,1).getDay();
          }
          else {
            var currentMonthFirstDay = year + '-' + month + '-01';
            return new Date(currentMonthFirstDay).getDay();
          }
    }

    function getMonthDay(year, month) {
      var days;
      //当月份为二月时，根据闰年还是非闰年判断天数
      if (month == 2) {

        days = year % 4 == 0 ? 29 : 28;
      } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
      } else {
        //其他月份，天数为：30.
        days = 30;

      }
      return days;
    }
  },
  pre: function(year, month) { //前一个月的时间
    this.boolButton(false, '.no');
    preYear = this.preNext(year, month).pre.year;
    preMonth = this.preNext(year, month).pre.month;
    //console.log('pre', preYear, preMonth);
    this.RenderThreePartDay(preYear, preMonth);
  },
  next: function(year, month) { //后一个月的时间
     this.boolButton(false, '.no');
     nextYear = this.preNext(year, month).next.year;
     nextMonth = this.preNext(year, month).next.month;
     this.RenderThreePartDay(nextYear, nextMonth);
  },
  RenderThreePartDay: function(year, month) { //渲染三个月的日期
    document.querySelectorAll('.select-date-center-year')[0].textContent = year;
    document.querySelectorAll('.select-date-center-month')[0].textContent = month; 
    var ObjDay = document.querySelectorAll('.day');
    for( var i = 0; i < ObjDay.length; i++) {
      ObjDay.innerHTML = '';
    }
    var days = this.preNext(year, month);
    
    this.renderDay('.day.pre', year, month);
    this.renderDay('.day.next', year, month);
    this.renderDay('.day.current', year, month);
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
  },
  boolButton: function(bool, ele) { //按钮开关
    var ele = document.querySelectorAll(ele)[0];
    var ObjButton = document.querySelectorAll('.periodComingButton span');
    if (bool) {
      removeClass(ObjButton[1], 'button-activity-no');
      addClass(ele, 'button-activity-yes');
    } else {
      removeClass(ObjButton[0], 'button-activity-yes');
      addClass(ele, 'button-activity-no');
    }
  },
  componentDidMount() {
    console.log('componentDidMount');
    
    // this.RenderThreePartDay(this.time.now.year, this.time.now.month);
  
  }
});
export default App;