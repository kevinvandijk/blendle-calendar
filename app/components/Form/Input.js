import React from 'react';
import { PropTypes } from '../../helpers';

const { oneOf, string } = PropTypes;

const Input = (props) => {
  let inputClass = 'Form-Input-field';
  if (props.type === 'date') inputClass = `${inputClass} Form-Input-date`;
  if (props.type === 'textarea') inputClass = `${inputClass} Form-Input-textarea`

  return (
    <label htmlFor={ props.name } className="Form-Input-label">
      { props.label }

      { props.type === 'textarea'
        ? <textarea id={ props.name } className={ inputClass } />
        : <input id={ props.name } className={ inputClass } type="text" />
      }
    </label>
  );
};

Input.propTypes = {
  label: string,
  name: string.isRequired,
  type: oneOf(['text', 'textarea', 'date'])
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
