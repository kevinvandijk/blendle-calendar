import React from 'react';
import { PropTypes } from '../../helpers';

const { oneOf, string, func } = PropTypes;

class InputField extends React.Component {
  static propTypes = {
    label: string,
    name: string.isRequired,
    type: oneOf(['text', 'textarea', 'date']),
    value: string
  }

  static defaultProps = {
    type: 'text',
    value: ''
  };

  static contextTypes = {
    attach: func,
    detach: func
  }

  state = {
    value: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentWillMount() {
    if (this.context.attach) {
      this.context.attach(this);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentWillUnmount() {
    if (this.context.detach) {
      this.context.detach(this);
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.setState({
      value
    });
  }

  render() {
    let inputClass = 'Form-InputField';
    const { type, name, label } = this.props;
    if (type === 'date') inputClass = `${inputClass} Form-InputField-date`;
    if (type === 'textarea') inputClass = `${inputClass} Form-InputField-textarea`;

    return (
      <label htmlFor={ name } className="Form-InputField-label">
        { label }

        { type === 'textarea'
          ?
            <textarea
              id={ name }
              className={ inputClass }
              value={ this.state.value }
              onChange={ this.onChange }
            />
          :
            <input
              id={ name }
              className={ inputClass }
              type="text"
              value={ this.state.value }
              onChange={ this.onChange }
            />
        }
      </label>
    );
  }
}

export default InputField;
