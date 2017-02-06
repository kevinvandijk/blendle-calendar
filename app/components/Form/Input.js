import React from 'react';
import { PropTypes } from '../../helpers';

const { oneOf, string } = PropTypes;

const Input = (props) => {
  return (
    <label htmlFor={ props.name } className="Form-Input-label">
      { props.label }

      <input id={ props.name } className="Form-Input-field" type={ props.type } />
    </label>
  );
};

Input.propTypes = {
  label: string,
  name: string.isRequired,
  type: oneOf(['text', 'textarea'])
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
