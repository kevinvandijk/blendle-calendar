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

    this.inputs = {};
  }

  getChildContext() {
    return {
      attach: this.attach,
      detach: this.detach,
      submit: this.submit,
      reset: this.reset
    };
  }

  getValues() {
    return Object.keys(this.inputs).reduce((values, name) => {
      return {
        ...values,
        [name]: this.inputs[name].getValue()
      };
    }, {});
  }

  attach = (component) => {
    this.inputs[component.props.name] = component;
  }

  detach = (component) => {
    delete this.inputs[component.props.name];
  }

  submit = () => {
    const values = this.getValues();

    if (this.props.onSubmit) this.props.onSubmit(values);
  }

  reset = () => {
    Object.keys(this.inputs).forEach((name) => {
      this.inputs[name].setValue('');
    });
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default Form;
