import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer.jsx";
import { saveShippingAddressAction } from "../../stores/actions/cartActions.js";

const field = (label, name, value, setFunc, required = true, type = "text") => (
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

const ShippingScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector(s => s.cart);

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(
            saveShippingAddressAction({ address, city, postalCode, country })
        );
        navigate("/payment");
    };

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={handleSubmit}>
                {field("Address", "address", address, setAddress)}
                {field("City", "city", city, setCity)}
                {field("Postal Code", "postalCode", postalCode, setPostalCode)}
                {field("Country", "country", country, setCountry)}
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
