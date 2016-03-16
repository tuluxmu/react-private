import React,
{
    Component,
    PropTypes
}
from 'react';
const ScrollSelectHeader = React.createClass({
  clickNo() {
    console.log('clickNo');
    this.props.clickEvent(false);
  },
  clickYes() {
    console.log('clickYes');
    this.props.clickEvent(true);
  },
  render() {
    
    return (
      <header>
            <span className='scroll-select-no' onClick={this.clickNo}>{this.props.no}</span>
            <span className='scroll-select-title'>{this.props.title}</span>
            <span className='scroll-select-ok' onClick={this.clickYes}>{this.props.ok}</span>
      </header>
      );
  }
});
export default ScrollSelectHeader;