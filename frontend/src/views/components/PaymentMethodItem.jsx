import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const PaymentMethodItem = ({ label, id, setFunc, value, ...rest }) => (
    <Form.Check
        type="radio"
        name="paymentMethod"
        label={label}
        id={id}
        value={value}
        onChange={e => {
            setFunc(e.target.value);
        }}
        {...rest}
    />
);

PaymentMethodItem.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setFunc: PropTypes.func.isRequired,
};

export default PaymentMethodItem;
