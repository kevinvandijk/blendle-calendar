import React from 'react';
import './styles.scss';
import { PropTypes } from '../../helpers';

const { node } = PropTypes;

const Form = (props) => {
  return (
    <div>
      { props.children }
    </div>
  );
};

Form.propTypes = {
  children: node
};

export default Form;
