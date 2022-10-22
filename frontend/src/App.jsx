import { Container } from "react-bootstrap";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";

const App = () => {
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <HomeScreen />
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default App;
