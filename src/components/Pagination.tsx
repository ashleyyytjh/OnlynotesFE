type Props = {
    currentPage: number;
    totalPages: number;
    maxPagesToShow: number;
    onPageChange: (page: number) => void;
    onPageNext: (page: number) => void;
    onPagePrevious: (page:number) => void;
}

const PaginationMINE : React.FC<Props> = (props:Props) => {
    
    const pagesToShow = generatePagination(props.currentPage, props.totalPages, 3);
    if (props.totalPages === 1) {
        return 
    }
    return (
        <div className="flex justify-center items-center mt-8 text-primary_text w-full">
            <nav className="relative z-0 inline-flex rounded-md ">
                <button
                    className="mr-2 relative inline-flex items-center  px-3 py-1 rounded border-2 border-gray-300 bg-white text-sm font-medium  hover:bg-gray-50"
                    onClick={()=> props.onPagePrevious(props.currentPage)}>
                        {`<`}
                </button>
                {pagesToShow.map((page, index) => (
                    <div className="" key={index}>
                        {page === -1 ? (
                            <button className="relative inline-flex  px-3 py-1 text-sm font-medium ">...</button>
                        ) : (
                            <button
                                className={` relative inline-flex items-center mx-1 px-3 py-1 border-gray-300 bg-[#F5F5F5] border text-sm font-medium rounded ${props.currentPage === page ? `text-white bg-gray-400`  : ' hover:opacity-80 '}`}
                                onClick={() => props.onPageChange(page)}
                            >
                            {page}
                            </button>
                        )}
                    </div>
                ))}
                <button
                    className="ml-2 relative inline-flex items-center px-3 py-1 rounded border-2 border-gray-300 bg-white text-sm font-medium  hover:bg-gray-50"
                    onClick={()=> props.onPageNext(props.currentPage)}
                    >
                    {`>`}
                </button>
            </nav>
        </div>
    )
}

export default PaginationMINE;


function generatePagination(currentPage: number, totalPages: number, maxPagesToShow: number): number[] {
    let startPage: number, endPage: number;
    if (totalPages <= maxPagesToShow) {
        // If total pages are less than or equal to max pages to show, display all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // Calculate start and end pages based on current page and max pages to show
        const halfMaxPages = Math.floor(maxPagesToShow / 2);
        if (currentPage <= halfMaxPages) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + halfMaxPages >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfMaxPages;
            endPage = currentPage + halfMaxPages;
        }
    }

    // Ensure startPage is at least 1 and endPage is at most totalPages
    startPage = Math.max(1, startPage);
    endPage = Math.min(totalPages, endPage);

    // Generate an array of page numbers to display
    const pagesToShow: number[] = [];
    if (startPage !== 1) {
        pagesToShow.push(1); // Add link to go to the first page
        if (startPage > 2) {
            pagesToShow.push(-1); // Add ellipsis if not adjacent to the first page
        }
    }
    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }
    if (endPage !== totalPages) {
        if (endPage < totalPages - 1) {
            pagesToShow.push(-1); // Add ellipsis if not adjacent to the last page
        }
        pagesToShow.push(totalPages); // Add link to go to the last page
    }

    return pagesToShow;
}