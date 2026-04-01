import Button from "./Button";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }

    let start = Math.max(2, currentPage - 1);
    // nếu trang hiện tại = 3 thì end = 4 =)))
    let end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) {
      end = 4;
    }
    if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
    return pages;
  };
  const pages = getPageNumbers();
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </Button>
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span key={index} className="px-4 py-2 text-gray-500">
              ...
            </span>
          );
        }
        return (
          <Button
            key={index}
            onClick={() => onPageChange(page as number)}
            variant={currentPage === page ? "outline" : "primary"}
          >
            {page}
          </Button>
        );
      })}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>
  );
}
