"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type TProps = {
  limit: number;
  page: number;
  total: number;
};

const APagination = ({ limit, page, total }: TProps) => {
  const totalPages = Math.ceil(total / limit);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handlePageChange = (page: number) => {
    params.delete("page");
    params.append("page", page.toString());

    router.replace(`${pathName}?${params}`);
  };

  return (
    <Pagination className="sm:justify-end">
      <PaginationContent className="gap-2">
        <PaginationItem className="group bg-slate-100 rounded-full hover:bg-primary cursor-pointer">
          <PaginationPrevious
            className="group-hover:bg-transparent group-hover:text-white duration-0"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageChange(page - 1);
            }}
          />
        </PaginationItem>

        <RenderPaginationItems
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={page}
        />

        <PaginationItem className="group bg-slate-100 rounded-full hover:bg-primary cursor-pointer">
          <PaginationNext
            className="group-hover:bg-transparent group-hover:text-white duration-0"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) handlePageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default APagination;

const RenderPaginationItems = ({
  totalPages,
  currentPage,
  handlePageChange,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) => {
  const items = [];
  const maxVisiblePages = 5;
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxVisiblePages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxVisiblePages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <PaginationItem
        key={`pagination-${page}`}
        className={cn("bg-slate-100 rounded-full cursor-pointer", {
          "bg-primary text-white": currentPage === page,
          "hover:bg-primary-hover": currentPage !== page,
        })}
        onClick={() => handlePageChange(page)}
      >
        <PaginationLink className="hover:bg-transparent hover:text-inherit">
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (startPage > 1) {
    items.unshift(
      <PaginationItem
        key="ellipsis-start"
        className="bg-slate-100 rounded-full cursor-pointer"
      >
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  if (endPage < totalPages) {
    items.push(
      <PaginationItem
        key="ellipsis-end"
        className="bg-slate-100 rounded-full cursor-pointer"
      >
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  return items;
};
