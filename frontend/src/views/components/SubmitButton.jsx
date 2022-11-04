import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const SubmitButton = ({ label }) => (
    <Button variant="primary" type="submit">
        {label}
    </Button>
);

SubmitButton.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SubmitButton;
