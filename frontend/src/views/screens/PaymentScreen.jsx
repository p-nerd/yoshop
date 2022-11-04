import { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethodAction } from "./../../stores/actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import FormContainer from "../components/FormContainer.jsx";
import PaymentMethodItem from "../components/PaymentMethodItem.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

const paymentMethods = [
    {
        label: "PayPal or Credit Card",
        id: "paypal",
        value: "PayPal",
        rest: { checked: true },
    },
    {
        label: "bKash",
        id: "bkash",
        value: "bKash",
        rest: {},
    },
    {
        label: "Cash on Delivery",
        id: "cod",
        value: "Cash on Delivery",
        rest: {},
    },
];

export default () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector(s => s.cart);
    if (!shippingAddress) navigate("/shipping");

    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].value);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(savePaymentMethodAction(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <FormContainer>
            <>
                <CheckoutSteps step1 step2 step3 />
                <h1>Payment Method</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label as="legend">Select Method</Form.Label>
                    </Form.Group>
                    <Col style={{ marginBottom: "20px" }}>
                        {paymentMethods.map(method => (
                            <PaymentMethodItem
                                key={method.id}
                                label={method.label}
                                id={method.id}
                                value={method.value}
                                setFunc={setPaymentMethod}
                                {...method.rest}
                            />
                        ))}
                    </Col>
                    <SubmitButton label="Continue" />
                </Form>
            </>
        </FormContainer>
    );
};
