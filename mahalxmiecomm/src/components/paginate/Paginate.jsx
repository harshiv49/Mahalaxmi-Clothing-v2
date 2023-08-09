import { Fragment } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


const Paginate = ({ page, pages, keyword = "", isAdmin = false }) => {
  if (keyword) {
    //split the length of the text into two parts and take either the zeroth element or the last element
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }
  return (
    //if pages greater than 1 only then we render our buttons
    pages > 1 && (
    <div>
      <Pagination>
        {/* the ...Array method takes pages number and converts it into an array andd .keys() adds the value in the array */}
        {[...Array(pages).keys()].map((x) => {
          return (
            //map through the element give a link to each elements which would be equal to the number of pages

            //to in linkcotainer takes us to the  link we want to go at so we design it in a way that it gives u information about the keyword and the page
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? {
                      pathname: "/",
                      search: `/?keyword=${keyword}&page=${x + 1}`,
                    }
                  : {
                      pathname: "/admin/productList",
                      search: `/?keyword=${keyword}&page=${
                        x + 1
                      }`,
                    }
              }
            >
           
              <Pagination.Item className="m-1" active={x+1 === page }>{x + 1}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
      </div>
    )
  );
};
export default Paginate;
