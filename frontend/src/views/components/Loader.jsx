import { Spinner } from "react-bootstrap";

const Loader = () => (
    <Spinner
        animation="border"
        role="status"
        style={{ margin: "auto", display: "block" }}
    >
        <span className="sr-only">Loading...</span>
    </Spinner>
);

export default Loader;
