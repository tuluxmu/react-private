import React, { Component, PropTypes }from 'react';
const RenderDay = React.createClass({
  getInitialState() {
      console.log('getInitialState');
      this.now = new Date();
      this.time = {
            year: this.now.getFullYear(),
            month: this.now.getMonth() + 1,
            date: this.now.getDate()
      }
      return {
        now: this.now,
        time: this.time,
        index: 0,
        height: '226px'
      }
    },
    renderDayItem(year, month) {
      var ItemWidth = window.innerWidth / 7;
      ItemWidth = ItemWidth.toFixed(0);
      var ItemHtml = '';
      var ItemDay = 0;
      var nextDay = 1;
      var Dayth = getDayWeek(year, month-1);
      var Row = 34;
      if (getMonthDay(year, month) + Dayth > 35) {
        Row = 41;
        this.setState({
          height: '273px'
        });
      }
      var RowArr = [];
          RowArr.length  = Row +1;
      var Obj = window["data"][month-1];
      var position = Dayth-1  ;
      var RenderItem = RowArr.map(function(index, item) {
        console.log(index, item);
        var ClassList = ['dayItem'];
          
          //上次排卵日
          if (i * 7 + j === (Obj.lastPaiRuanRi + position+1) &&  Obj.lastPaiRuanRi!= -1) {
            ClassList.push('paiRuanRi');
          }

          //这次排卵日

          if (Obj.PaiRuanRi !== -1 && i * 7 + j === Obj.PaiRuanRi + position) {
            ClassList.push('paiRuanRi');
          }

          //经期
          if (Obj["jingqi"][0] !== -1 && i * 7 + j >= (Obj["jingqi"][0] + position) && i * 7 + j < (Obj["jingqi"][1] + position)) {
            ClassList.push('selected-background');
          } 
          else if(Obj["jingqi"][0] !== -1 && i * 7 + j == (Obj["jingqi"][0] + position) && i * 7 + j == (Obj["jingqi"][1] + position)) {
           ClassList.push('selected-background');
          }

          //易孕期
          if (Obj["yiyunqi"][0] !== -1 && i * 7 + j >= (Obj["yiyunqi"][0] + position) && i * 7 + j <= (Obj["yiyunqi"][1] + position)) {
            ClassList.push('yiYunQi');
          }
          var ItemStyle = {
            position: 'absolute',
            height: '43px',
            width: ItemWidth - 2 + 'px'
          }
          

          if (i == 0 && j < Dayth) {
            ClassList.push('lastMonth');
          } else if (currentDay === 0) {
            ClassList.push('nextMonth');
          } else {
            var currentDay = (++ItemDay) % (getMonthDay(year, month) + 1);
            if (currentDay === 0) {
              ClassList.push('nextMonth');
            } else {
              if (month == this.time.now.month && currentDay == this.time.now.date) {
                ItemStyle = {
                  position: 'absolute',
                  height: '43px',
                  width: ItemWidth - 2 + 'px'
                }
                 ClassList.push('today');
              }
              var textContent = currentDay;
              
            }

          }
          ItemStyle.top = (i * 45 + 2) + 'px';
          ItemStyle.left = j * ItemWidth + 'px';
          return (
            <span className={ClassList.join('')} style={ItemStyle} data-index={ i*7+j }> 
              {textContent}
            </span>
          );
      });
      debugger;
      
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
    render() {
      var UlStyle = {
        height: this.state.height
      };
      this.renderDayItem(this.state.time.year, this.state.time.month);
      return (
        <ul id="bannerImg" className="swipe-wrap banner" style={UlStyle}>
          <li className='day pre'></li>
          <li className='day current'></li>
          <li className='day next'></li>
        </ul>
      );
    }  
});
export default RenderDay;