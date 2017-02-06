import React from 'react';
import { PropTypes } from '../../helpers';

const { string, oneOf } = PropTypes;

const Button = (props) => {
  let buttonClass = 'Form-Button';
  if (props.type === 'primary') buttonClass = `${buttonClass} Form-Button--isPrimary`;

  return (
    <button className={ buttonClass }>
      { props.label }
    </button>
  );
};

Button.propTypes = {
  label: string.isRequired,
  type: oneOf(['default', 'primary'])
};

Button.defaultProps = {
  type: 'default'
};

export default Button;
