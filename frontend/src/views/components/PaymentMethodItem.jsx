import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const PaymentMethodItem = ({ label, id, setFunc, ...rest }) => (
    <Form.Check
        type="radio"
        name="paymentMethod"
        label={label}
        id={id}
        value={id}
        onChange={e => setFunc(e.target.value)}
        {...rest}
    />
);

PaymentMethodItem.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setFunc: PropTypes.func.isRequired,
};

export default PaymentMethodItem;
