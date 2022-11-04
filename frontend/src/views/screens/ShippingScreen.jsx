import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveShippingAddressAction } from "../../stores/actions/cartActions.js";
import FormContainer from "../components/FormContainer.jsx";
import FormField from "../components/FormField.jsx";
import SubmitButton from "../components/SubmitButton.jsx";

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
                <FormField
                    label="Address"
                    name="address"
                    value={address}
                    setFunc={setAddress}
                />
                <FormField
                    label="City"
                    name="city"
                    value={city}
                    setFunc={setCity}
                />
                <FormField
                    label="Postal Code"
                    name="postalCode"
                    value={postalCode}
                    setFunc={setPostalCode}
                />
                <FormField
                    label="Country"
                    name="country"
                    value={country}
                    setFunc={setCountry}
                />
                <SubmitButton label="Continue" />
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
