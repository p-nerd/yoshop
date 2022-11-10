import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { isAdmin, isObjectEmpty } from "../../logic/commonLogic.js";
import { userLogoutAction } from "../../stores/actions/userActions.js";

const { Brand, Toggle, Collapse } = Navbar;

const HeaderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(s => s.userLogin);
    const logoutHandler = () => {
        dispatch(userLogoutAction());
    };
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Brand as={Link} to="/">
                        YoShop
                    </Brand>
                    <Toggle aria-controls="basic-navbar-nav" />
                    <Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/cart">
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                            {!isObjectEmpty(userInfo) ? (
                                <>
                                    <NavDropdown
                                        title={userInfo.name}
                                        id="username"
                                    >
                                        <NavDropdown.Item
                                            as={Link}
                                            to="/profile"
                                        >
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">
                                        <i className="fas fa-user"></i> Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/signup">
                                        <i className="fas fa-sign-in-alt"></i>{" "}
                                        Signup
                                    </Nav.Link>
                                </>
                            )}
                            {isAdmin(userInfo) && (
                                <>
                                    <NavDropdown title="Admin" id="adminMenu">
                                        <LinkContainer to="/admin/users">
                                            <NavDropdown.Item>
                                                Users
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/products">
                                            <NavDropdown.Item>
                                                Products
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orders">
                                            <NavDropdown.Item>
                                                Orders
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default HeaderScreen;
