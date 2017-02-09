import React from 'react';
import { PropTypes } from '../../helpers';

const { string, oneOf, func, bool } = PropTypes;

class Button extends React.Component {
  static propTypes = {
    label: string.isRequired,
    type: oneOf(['default', 'submit', 'reset']),
    onClick: func,
    disabled: bool
  }

  static defaultProps = {
    type: 'default',
    disabled: false
  }

  static contextTypes = {
    submit: func,
    reset: func
  }

  onClick = (e) => {
    e.preventDefault();

    if (this.props.type === 'submit' && this.context.submit) {
      this.context.submit();
    }

    if (this.props.type === 'reset' && this.context.reset) {
      this.context.reset();
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const { type, label, disabled } = this.props;
    let buttonClass = 'Form-Button';
    if (type === 'submit') buttonClass = `${buttonClass} Form-Button--isPrimary`;
    if (disabled) buttonClass = `${buttonClass} Form-Button--isDisabled`;

    return (
      <button className={ buttonClass } onClick={ this.onClick } disabled={ disabled }>
        { label }
      </button>
    );
  }
}

export default Button;
