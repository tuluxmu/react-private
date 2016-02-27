import React from 'react';
import classnames from 'classnames';
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      disabled:this.props.disabled===undefined?false:this.props.disabled
    };
  }
  render() {
    var className = this.state.disabled ? "btn btn-default disabled" : "btn btn-default";
    return (
          <button {...this.props} type="button"  onClick={this.onClick.bind(this)} className={className}>{this.props.text}</button>
      );
  }
  onClick(){
    this.props.onClick()
    if(this.props.num === '0' ){
      this.setState({
        disabled:'disabled'
      });
    }
  }
}
Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  num : React.PropTypes.string.isRequired
};
// API
// props
// 参数  说明  类型  默认值
// text  按钮文本  string  ''
// disabled  是否禁用(disabled 或 true false) string  false
// className 增加额外的class  string  ''
// num   按钮是否点击一次后被禁用 string '0/1'[0代表点击一次后被禁用]