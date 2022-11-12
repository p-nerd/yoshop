import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pagesCount, page, isAdmin = false, keyword = "" }) => (
    <>
        {pagesCount > 1 && (
            <Pagination>
                {[...Array(pagesCount).keys()].map(x => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            isAdmin
                                ? `/admin/products/page/${x + 1}`
                                : keyword
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/page/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )}
    </>
);
export default Paginate;
