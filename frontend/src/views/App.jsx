import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/bootstrap.css";
import "./styles/index.css";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";

export default () => (
    <BrowserRouter>
        <Header />
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
                </Routes>
            </Container>
        </main>
        <Footer />
    </BrowserRouter>
);
