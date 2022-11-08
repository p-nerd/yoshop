import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const FormCheck = ({ label, name, value, setFunc }) => (
    <Form.Group className="mb-3" controlId={name}>
        <Form.Check
            type="checkbox"
            label={label}
            checked={value}
            onChange={e => setFunc(e.target.checked)}
        />
    </Form.Group>
);

FormCheck.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    setFunc: PropTypes.func.isRequired,
};

export default FormCheck;
