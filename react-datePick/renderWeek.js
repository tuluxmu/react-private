import React, { Component, PropTypes }from 'react';
const RenderWeek = React.createClass({
    render() {
      var week = ['日', '一', '二', '三', '四', '五', '六'];
      var ItemWidth = window.innerWidth / 7;
      var RenderWeekItem = week.map(function(item, index) {
            var ItemStyle = {
              width: (ItemWidth - 1) + "px",
              left: index * ItemWidth + "px",
              position: "absolute",
              height: '26px',
              top: '0'
            }
            return (<span className="WeekItem" style={ItemStyle}>{item}</span>);
      });
      return (
        <div className='week'>{RenderWeekItem}</div>
      );
      
    }
});
export default RenderWeek;