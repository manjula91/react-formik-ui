import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { connect } from 'formik'
import { get } from '../../utils/helper'

const Select = ({
  className,
  disabled,
  hint,
  id,
  label,
  name,
  options,
  placeholder,
  required,
  formik,
}) => {
  const {
    touched, errors, values, handleChange,
  } = formik
  const error = get(touched, name) && get(errors, name)

  return (
    <div className={cx('form-element select-wrapper', className, { hasError: !!error, disabled })} >
      {
        label && (
          <label htmlFor={name}>
            {`${label}${required ? ' *' : ''}`}
          </label>
        )
      }
      <select
        id={id || name}
        name={name}
        value={get(values, name)}
        disabled={disabled}
        onChange={handleChange}
      >
        {
          placeholder && (
            <option value="">
              {placeholder}
            </option>
          )
        }
        {
          options.map(option => (
            <option
              key={option.label}
              value={option.value}
            >
              {option.label}
            </option>
          ))
        }
      </select>
      {
        error && (
          <span className="error">
            {error}
          </span>
        )
      }
      {
        hint && (
          <span className="hint">
            {hint}
          </span>
        )
      }
    </div>
  )
}

Select.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hint: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })).isRequired,
  required: PropTypes.bool,
}

Select.defaultProps = {
  className: null,
  disabled: false,
  hint: null,
  id: null,
  label: null,
  placeholder: null,
  required: false,
}

export default connect(Select)
