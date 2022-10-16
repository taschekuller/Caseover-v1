import React from "react"
import PropTypes from "prop-types"
import { Row, Col, BreadcrumbItem } from "reactstrap"

import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from "availity-reactstrap-validation"

const DynamicInput = props => {
 //dataKey:isValue
  const { inputType, baseName, index, title, dataKey, dataArray } = props

  switch (inputType) {
    case "string":
      return (
        <AvField
          key={"e1_" + index}
          id={baseName + "_" + index + "__"+dataKey}
          name={baseName + "[" + index + "]."+dataKey}
          type="text"
          label={item.title}
          placeholder={item.title}
          value={item.isValue}
          onChange={e => handleChangeInput(index, e, dataKey)}
          validate={{
            required: { value: false },
          }}
        />
      )
    default:
      return null
  }
}

DynamicInput.propTypes = {
  inputType: PropTypes.string,
  title: PropTypes.string,
  baseName: PropTypes.string,
  index: PropTypes.string,
}

export default DynamicInput


export const handleChangeInput = (i, e, inputName, state) => {
    const values = [...state]
    values[i][inputName] = e.target.value
    //setPaymentPlanObjects(values)
    return values;
}

export const handleChangeInputBoolean = (i, e, inputName, state) => {
    const values = [...state]
    values[i][inputName] =
      e.target.value === "" ? false : e.target.value == "false" ? true : false
    //setPaymentPlanObjects(values)
    return values;
}