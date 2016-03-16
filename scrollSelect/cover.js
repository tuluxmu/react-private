import React,
{
    Component,
    PropTypes
}
from 'react';
const Cover = React.createClass({
  clickCover() {
    this.props.clickEvent(false);
  },
  render() {
    return (
      <div onClick={this.clickCover} className='scroll-select-cover'></div>
      );
  }
}); 
export default Cover;