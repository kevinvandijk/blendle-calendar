import React from 'react';
import { PropTypes } from '../../helpers';

const { oneOf, string } = PropTypes;

const InputField = (props) => {
  let inputClass = 'Form-InputField';
  if (props.type === 'date') inputClass = `${inputClass} Form-InputField-date`;
  if (props.type === 'textarea') inputClass = `${inputClass} Form-InputField-textarea`;

  return (
    <label htmlFor={ props.name } className="Form-InputField-label">
      { props.label }

      { props.type === 'textarea'
        ? <textarea id={ props.name } className={ inputClass } />
        : <input id={ props.name } className={ inputClass } type="text" />
      }
    </label>
  );
};

InputField.propTypes = {
  label: string,
  name: string.isRequired,
  type: oneOf(['text', 'textarea', 'date'])
};

InputField.defaultProps = {
  type: 'text'
};

export default InputField;
