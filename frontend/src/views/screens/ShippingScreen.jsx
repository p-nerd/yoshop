import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveShippingAddressAction } from "../../stores/actions/cartActions.js";
import FormContainer from "../components/FormContainer.jsx";
import ShippingField from "../components/ShippingField.jsx";

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
                <ShippingField
                    label="Address"
                    name="address"
                    value={address}
                    setFunc={setAddress}
                />
                <ShippingField
                    label="City"
                    name="city"
                    value={city}
                    setFunc={setCity}
                />
                <ShippingField
                    label="Postal Code"
                    name="postalCode"
                    value={postalCode}
                    setFunc={setPostalCode}
                />
                <ShippingField
                    label="Country"
                    name="country"
                    value={country}
                    setFunc={setCountry}
                />
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
