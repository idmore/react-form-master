import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "../lib/validator/InputValidator";

const supported_types = ["text", "email", "url", "tel", "search"];

const generatedCount = props => {
  return (
    <small>
      {props.value.length} {props.max ? ` / ${props.max}` : null} characters
    </small>
  );
};

export default class InputText extends Component {
  handleChange(e) {
    const { name, value } = e.target;
    const validator = new Validator(
      Object.assign({}, { name, value }, this.props)
    );
    const validate_result = validator.validate();
    this.props.setState({
      [name]: value,
      [`${name}_validation`]: validate_result
    });
  }

  render() {
    const { style, label, name, min, max, validation } = this.props;
    let { info } = this.props;
    if (validation && !validation.is_valid) info = validation.msg;
    return (
      <div
        className={`form-row ${
          validation && !validation.is_valid ? "error" : ""
        }`}
        style={style}
      >
        {label ? <label>{label}</label> : null}
        <input
          type={this.props.type}
          name={this.props.name}
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          onClick={e => this.handleChange(e)}
          placeholder={this.props.placeholder}
          value={this.props.value}
        />
        {info ? <small className="form-description">{info}</small> : null}
        {this.props.count ? generatedCount(this.props) : null}
      </div>
    );
  }
}

InputText.defaultProps = {
  style: {},
  value: "", //value, auto generated by parrent state
  type: "text", //input type
  count: false //show characters count
};

InputText.propType = {
  setState: PropTypes.func.isRequired,
  type: PropTypes.oneOf(supported_types),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  validation: PropTypes.object,
  value: PropTypes.any
};
