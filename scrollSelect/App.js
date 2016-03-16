import React,
{
    Component,
    PropTypes
}
from 'react';
import ScrollSelect from './scrollSelect';
// require('./app.css');
const App = React.createClass({
    getInitialState() {
      return {
        display: true
      }
    },
    value() {
        var leftData=[];
        var rightData=[];
        for(var i = 2; i<=14;i++) {
          leftData[i-2] = i ;
        }
        for(var i = 15; i<=60;i++) {
          rightData[i-15] = i ;
        }
        return {
          leftData: leftData,
          rightData: rightData
        }
    },
    listenerDisplay() {
        this.setState({
            display: true
        });
    },
    listenerValue(value) {
        var leftData = this.value().leftData;
        var rightData = this.value().rightData;
        console.log('listenerValue', value);
    },
    render() {
        var leftData = this.value().leftData;
        var rightData = this.value().rightData;
        return ( < div > <span onClick={this.listenerDisplay}>点击我弹出select弹框!</span>
                    <ScrollSelect leftData={leftData} rightData={rightData} initialLeftValue={3} initialRightValue={13} listenerValue={this.listenerValue} display={this.state.display}/>
                 </div>);
  },
  componentDidMount() {
  }
}); 
export default App;