import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/bootstrap.css";
import "./styles/index.css";
import FooterScreen from "./screens/FooterScreen.jsx";
import HeaderScreen from "./screens/HeaderScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import UserListScreen from "./screens/UserListScreen.jsx";

export default () => (
    <BrowserRouter>
        <HeaderScreen />
        <main className="py-3">
            <Container>
                <Routes>
                    <Route path="/" exact element={<HomeScreen />} />
                    <Route
                        path="/products/:id"
                        exact
                        element={<ProductScreen />}
                    />
                    <Route path="/cart/:id" exact element={<CartScreen />} />
                    <Route path="/cart" exact element={<CartScreen />} />
                    <Route path="/login" exact element={<LoginScreen />} />
                    <Route path="/signup" exact element={<RegisterScreen />} />
                    <Route path="/profile" exact element={<ProfileScreen />} />
                    <Route
                        path="/shipping"
                        exact
                        element={<ShippingScreen />}
                    />
                    <Route path="/payment" exact element={<PaymentScreen />} />
                    <Route
                        path="/placeorder"
                        exact
                        element={<PlaceOrderScreen />}
                    />
                    <Route path="/order/:id" exact element={<OrderScreen />} />
                    <Route
                        path="/admin/users"
                        exact
                        element={<UserListScreen />}
                    />
                </Routes>
            </Container>
        </main>
        <FooterScreen />
    </BrowserRouter>
);
