import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";

export default () => (
    <BrowserRouter>
        <Header />
        <main className="py-3">
            <Container>
                <Routes>
                    <Route path="/" element={<HomeScreen />} exact />
                    <Route
                        path={`/products/:id`}
                        element={<ProductScreen />}
                        exact
                    />
                </Routes>
            </Container>
        </main>
        <Footer />
    </BrowserRouter>
);
