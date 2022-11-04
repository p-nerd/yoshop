import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import CheckoutStepItem from "./CheckoutStepItem.jsx";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => (
    <Nav className="justify-content-center mb-4">
        <CheckoutStepItem step={step1} to="/login" label="Sign In" />
        <CheckoutStepItem step={step2} to="/shipping" label="Shipping" />
        <CheckoutStepItem step={step3} to="/payment" label="Payment" />
        <CheckoutStepItem step={step4} to="/placeorder" label="Place Order" />
    </Nav>
);

CheckoutStepItem.propTypes = {
    step1: PropTypes.bool.isRequired,
    step2: PropTypes.bool.isRequired,
    step3: PropTypes.bool.isRequired,
    step4: PropTypes.bool.isRequired,
};

CheckoutStepItem.defaultProps = {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
};

export default CheckoutSteps;
