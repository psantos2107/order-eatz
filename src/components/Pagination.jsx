const Pagination = ({
  pageNumber,
  setPageNumber,
  numItemStart,
  numItemEnd,
  totalNumItems,
  limit,
}) => {
  //handles buttons for previous 10 and next 10 results based on the page number
  function handlePrevious(e) {
    e.preventDefault();
    setPageNumber((page) => page - 1);
  }

  function handleNext(e) {
    e.preventDefault();
    setPageNumber((page) => page + 1);
  }

  //ternary operators are present to display the previous buttons and next buttons only when the make sense in context of the page number and actual number of gifs available
  return (
    <div className="flex gap-4 justify-center mb-4 text-2xl">
      {pageNumber > 1 ? (
        <button
          onClick={handlePrevious}
          className="block bg-gray-300 pt-2 pl-1 pr-1 text-black border-black border-2 border-solid"
        >
          Previous {limit}
        </button>
      ) : (
        ""
      )}
      <p className="pt-2">
        Showing {numItemStart}-{numItemEnd} out of {totalNumItems} items.
      </p>
      {pageNumber * 10 < totalNumItems ? (
        <button
          onClick={handleNext}
          className="block bg-gray-300 pt-2 pl-1 pr-1 text-black border-black border-2 border-solid"
        >
          Next {limit}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
