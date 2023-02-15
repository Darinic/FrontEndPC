import React from "react";

import ReactPaginate from "react-paginate";

const Pagination = ({ currentPage, handlePageClick, maxPages }) => {

	return (
		<div className="pagination__container">
			<ReactPaginate
				previousLabel={"←"}
				forcePage={currentPage}
				nextLabel={"→"}
				breakLabel="..."
				pageCount={maxPages}
				pageRangeDisplayed={7}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				previousLinkClassName={"pagination__link"}
				nextLinkClassName={"pagination__link"}
				disabledClassName={"pagination__link--disabled"}
				activeClassName={"pagination__link--active"}
			/>
		</div>
	);
};

export default Pagination;