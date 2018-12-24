import React, { Component } from 'react';
import './App.css';

const centerStyle = {
  textAlign: 'center'
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      counter: 0,
      errorMessage: ''
    };
  }

  incrementCount(){
    this.setState({
      counter: this.state.counter + 1,
      errorMessage: ''
    });
  }

  decrementCount(){

    if(this.state.counter - 1 < 0){
      this.setState({
        errorMessage: 'Cannot go below 0'
      });
    } else {
      this.setState({
        counter: this.state.counter - 1
      });
    }
  }

  render() {
    return (
      <div className="App" data-test="app-component">
        <h1 data-test="counter-display" style={centerStyle}>Your count is {this.state.counter}</h1>
        <h3 style={{color:'red'}}>{this.state.errorMessage}</h3>
        <button data-test="increment-button" onClick={()=>this.incrementCount()}>Increment</button>
        <button data-test="decrement-button" onClick={()=>this.decrementCount()}>Decrement</button>
      </div>
    );
  }
}

export default App;
