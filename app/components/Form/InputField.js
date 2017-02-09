import React from 'react';
import moment from 'moment';
import { PropTypes } from '../../helpers';

const { oneOf, string, func } = PropTypes;

class InputField extends React.Component {
  static propTypes = {
    label: string,
    name: string.isRequired,
    type: oneOf(['text', 'textarea', 'date']),
    value: string,
    onBlur: func,
    onFocus: func,
    onChange: func
  }

  static defaultProps = {
    type: 'text',
    value: ''
  }

  static contextTypes = {
    attach: func,
    detach: func
  }


  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  state = {
    value: ''
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
    let value = e.target.value;
    if (this.props.type === 'date') {
      // When entering time allow only digits and : and .
      value = value.replace(/[^\d,:,.]+/gi, '');

      // When entering time notation with : and ., the max is 5 characters
      // When only entering digits, the max is 4 characters
      if (value.match(/\d{1,2}[:,.]/g)) {
        value = value.substr(0, 5);
      } else {
        value = value.substr(0, 4);
      }
    }

    this.setState({
      value
    });

    if (this.props.onChange) this.props.onChange(value);
  }

  onBlur = () => {
    this.setState({
      focused: false
    });

    if (this.props.type === 'date' && this.state.value.length) {
      const value = this.state.value.replace(/[^\d]/g, '');

      let formattedValue;
      if (value.length <= 2) {
        formattedValue = moment().hour(value).startOf('hour').format('HH:mm');
      } else {
        const minutes = value.slice(-2);
        const hours = value.slice(0, -2);

        formattedValue = moment().hour(hours).minute(minutes).format('HH:mm');
      }

      this.setState({
        value: formattedValue
      });
    }

    if (this.props.onBlur) this.props.onBlur(this.state.value);
  }

  onFocus = () => {
    this.setState({
      focused: true
    });

    if (this.props.onFocus) this.props.onFocus();
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
              onBlur={ this.onBlur }
              onFocus={ this.onFocus }
              ref={ (ref) => { this.input = ref; } }
            />
          :
            <input
              id={ name }
              className={ inputClass }
              type="text"
              value={ this.state.value }
              onChange={ this.onChange }
              onBlur={ this.onBlur }
              onFocus={ this.onFocus }
              ref={ (ref) => { this.input = ref; } }
            />
        }
      </label>
    );
  }
}

export default InputField;
