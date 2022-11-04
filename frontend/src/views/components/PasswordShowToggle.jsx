import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const PasswordShowToggle = ({ showPassword, setFunc }) => (
    <Form.Group className="mb-3" controlId="checkbox">
        <Form.Check
            type="checkbox"
            label="Show Password"
            onClick={() => setFunc(!showPassword)}
        />
    </Form.Group>
);

PasswordShowToggle.propTypes = {
    showPassword: PropTypes.bool.isRequired,
    setFunc: PropTypes.func.isRequired,
};

export default PasswordShowToggle;
