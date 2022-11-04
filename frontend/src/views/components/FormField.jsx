import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const FormField = ({ label, name, value, setFunc, required, type }) => (
    <Form.Group className="mb-3" controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            name={name}
            placeholder={`Enter ${name}`}
            value={value}
            required={required}
            onChange={e => setFunc(e.target.value)}
            type={type}
        />
    </Form.Group>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setFunc: PropTypes.func.isRequired,
    required: PropTypes.bool,
    type: PropTypes.string,
};

FormField.defaultProps = {
    required: true,
    type: "text",
};

export default FormField;
