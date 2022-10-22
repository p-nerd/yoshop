import { Container } from "react-bootstrap";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const App = () => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <h1>Yo Shop</h1>
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default App;
