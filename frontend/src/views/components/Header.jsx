import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        YoShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/cart">
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                <i className="fas fa-user"></i> Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                <i className="fas fa-sign-in-alt"></i> Signup
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
