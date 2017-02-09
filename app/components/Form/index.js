import React from 'react';
import './styles.scss';
import { PropTypes } from '../../helpers';

const { node, func } = PropTypes;

class Form extends React.Component {
  static propTypes = {
    children: node,
    onSubmit: func
  }

  static childContextTypes = {
    attach: func,
    detach: func,
    submit: func,
    reset: func
  }

  constructor(props) {
    super(props);

    this.inputs = [];
  }

  getChildContext() {
    return {
      attach: this.attach,
      detach: this.detach,
      submit: this.submit,
      reset: this.reset
    };
  }

  onKeyUp = (e) => {
    if (e.key === 'Enter') {
      const currentFocus = this.inputs.findIndex((i) => i.state.focused);
      const nextIndex = currentFocus + 1;
      if (this.inputs[nextIndex] && this.inputs[nextIndex]) {
        this.inputs[nextIndex].input.focus();
      }
    }
  }

  getValues() {
    return this.inputs.reduce((values, input) => {
      return {
        ...values,
        [input.props.name]: input.getValue()
      };
    }, {});
  }

  attach = (component) => {
    this.inputs[component.props.name] = component;
    this.inputs.push(component);
  }

  detach = (component) => {
    this.inputs = this.inputs.filter((input) => component.name !== input.name);
  }

  submit = () => {
    const values = this.getValues();

    if (this.props.onSubmit) this.props.onSubmit(values);
    this.reset();
  }

  reset = () => {
    this.inputs.forEach((input) => {
      input.setValue('');
    });
  }

  render() {
    return (
      <div onKeyUp={ this.onKeyUp }>
        { this.props.children }
      </div>
    );
  }
}

export default Form;
