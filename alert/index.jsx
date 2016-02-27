import React from 'react';
import classnames from 'classnames';
export default class Alert extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			time:this.props.time===undefined?false:this.props.time
		}
	}
	render() {
			var bsStyle = this.props.bsStyle===undefined?'alert-info':this.props.bsStyle;
			var closeLabel = this.props.closeLabel===undefined?'':<span aria-hidden="true" onClick={this.closeAlert.bind(this)}>&times;</span>;
			if(this.props.time){
				var self = this ;
			    var timer = setInterval(function(){
						if(self.state.time>0){
							self.setState({
								time:self.state.time-1
							})
						}
						else{
							clearInterval(timer)
						}
					},1000)
			}
			return(
			<div {...this.props} className={bsStyle} className="alert" role="alert" className={this.state.time===0?'hide':''} >
  				<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
  				<span className="sr-only"></span>
				{this.props.text}
				{closeLabel}
			</div>
			);
	}
	closeAlert(){
		this.setState({
			time:0
		})
	}
}
Alert.propTypes = {
	bsStyle: React.PropTypes.string.isRequired,//['alert-success','alert-info','alert-warning','alert-danger']
	closeLabel: React.PropTypes.bool.isRequired,// 0/1 => 0 stands for display:none  1 stands for disblay:block
	text: React.PropTypes.string.isRequired //the alert context
}
// API

// props

// 参数  说明  类型  默认值
// bsStyle  alert类型  string  ['alert-success','alert-info','alert-warning','alert-danger']
// closeLabel  是否含有关闭按钮 string  0/1 => 0 stands for display:none  1 stands for disblay:block
// time alert存在几秒后hide num 0
// text   文本 string ''