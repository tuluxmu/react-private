import React,
{
    Component,
    PropTypes
}
from 'react';
const ScrollSelectContent = React.createClass({
  getInitialState() {
    //debugger;
    this.topPosition = -this.props.initialValue*35; //initial Top Position
    return {
      distance: -this.props.initialValue*35,
      value: this.props.initialValue
    }
  },
  renderScrollSelectContentItem(data) {
    var self =this;
    var renderScrollSelectContentItems = data.map(function(index, item) {
      var renderItemClassName = self.state.value == item ? "li-activity"  :  "";
      return (
         <ScrollSelectContentItem item={index} className={renderItemClassName}/>
        );
    });
    return renderScrollSelectContentItems;
  },
  touchStart(evt) {
    console.log('touchStart');
    var self = this;
    self.startY = evt.touches[0].pageY;
    self.offsetY = 0;
    var target = evt.target;
    while(target.nodeName != 'SECTION'){
              target = target.parentNode;
    }
    self.target = target;
  },
  touchMove(evt) {
    var self = this;
    //console.log('touchMove');
    //兼容chrome android，阻止浏览器默认行为
    evt.preventDefault();
    //计算手指的偏移量
    self.offsetY = evt.targetTouches[0].pageY - self.startY;
    self.setState({
      distance: self.topPosition + parseInt(self.offsetY)/5
    });
    self.topPosition = self.topPosition + parseInt(self.offsetY)/5;
  },
  touchEnd(evt) {
    var self = this;
    var num = this.props.data.length-1;
    console.log('touchEnd');
    evt.preventDefault();

    self.topPosition = parseInt(self.topPosition/35)*35;
    if(self.topPosition < -(num-1)*35) {
        self.topPosition = -(num-1)*35
    } else if(self.topPosition >0) {
        self.topPosition = 0 ;
    }
    var selectValue = parseInt(self.topPosition/35);
    self.setState({
          distance: self.topPosition,
          value: Math.abs(selectValue)
    });
    this.props.listenerValue(Math.abs(selectValue));
  },
  render() {
    var RenderItem = this.renderScrollSelectContentItem(this.props.data);
    var UlStyle = {
      transition: '-webkit-transform 0s ease-out',
      transform: 'translate3d(0px, '+ this.state.distance +'px, 0px)'
    }
    return(
      <section className={this.props.sectionClassName}>
                <ul style={UlStyle} className={this.props.ulClassName} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                  {RenderItem}
                </ul>
      </section>
    );
  }
});

const ScrollSelectContentItem = React.createClass({
  getInitialState() {
    return {
      className: this.props.className
    }
  },
  render () {
    return(
      <li className={this.state.className}>{this.props.item}</li>
      );
    },
  componentWillReceiveProps(nextProps) {
    this.setState({
      className: nextProps.className
     });
  }
});
 export default ScrollSelectContent;