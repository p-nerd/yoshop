import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";

const CheckoutStepItem = ({ step, to, label }) => (
    <Nav.Item>
        {step ? (
            <LinkContainer to={to}>
                <Nav.Link>{label}</Nav.Link>
            </LinkContainer>
        ) : (
            <Nav.Link disabled>{label}</Nav.Link>
        )}
    </Nav.Item>
);

CheckoutStepItem.propTypes = {
    step: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

CheckoutStepItem.defaultProps = {
    step: false,
};

export default CheckoutStepItem;
