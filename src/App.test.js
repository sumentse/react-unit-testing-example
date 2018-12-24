import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props}/>);
  
  if(state){
    wrapper.setState(state);
  }

  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test('render without error', ()=>{
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'app-component');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', ()=>{
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders display counter', ()=>{
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', ()=>{
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);

});

test('clicking button increment the counter', ()=>{
  const counter = 7;
  const wrapper = setup(null, {counter});

  //find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);

});

test('clicking button decrement the counter', ()=>{
  const counter = 2;
  const wrapper = setup(null, {counter});
  
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('count should not go below zero', ()=>{
  const counter = 0;
  const wrapper = setup(null, {counter});

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  const countState = wrapper.state('counter');
  expect(countState).toBe(0);
});

test('incrementing count should remove error', ()=>{
  const counter = 0;
  const wrapper = setup(null, {counter});

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  decrementButton.simulate('click');
  wrapper.update();
  incrementButton.simulate('click');
  wrapper.update();

  const errorState = wrapper.state('errorMessage');
  expect(errorState).toBe('');
    
});
