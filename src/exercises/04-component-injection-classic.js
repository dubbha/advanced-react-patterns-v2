// render props alternative: component injection
// https://codesandbox.io/s/react-component-injection-byj3e

import React from 'react'
import {Switch} from '../switch'
class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  render() {
    return React.createElement(  // injection
      this.props.children,
      { on: this.state.on, toggle: this.toggle }
    )
  }
}

// Injected component: this can be class or functional
class Injected extends React.Component {
  // We may have lifecycle or whatever class component may have here
  render() {
    const { on, toggle } = this.props;
    return (
      <div>
        {on ? 'The button is on' : 'The button is off'}
        <Switch on={on} onClick={toggle} />
        <hr />
        <button aria-label="custom-button" onClick={toggle}>
          {on ? 'on' : 'off'}
        </button>
      </div>
    )
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>{Injected}</Toggle>
  )
}
Usage.title = 'Render Props'

export {Toggle, Usage as default}
