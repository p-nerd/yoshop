import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RedirectOption = ({ msg, redirect, to, toName }) => (
    <Row className="py-3">
        <Col>
            {msg}
            <Link to={redirect ? `${to}?redirect=${redirect}` : `${to}`}>
                {toName}
            </Link>
        </Col>
    </Row>
);

RedirectOption.propTypes = {
    msg: PropTypes.string.isRequired,
    redirect: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    toName: PropTypes.func.isRequired,
};

export default RedirectOption;
