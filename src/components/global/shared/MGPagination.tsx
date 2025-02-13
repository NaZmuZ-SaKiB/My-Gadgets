"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

type TProps = {
  limit: number;
  page: number;
  total: number;
  admin?: boolean;
  customFunction?: (page: number) => void;
};

const MGPagination = ({
  limit,
  page,
  total,
  admin = false,
  customFunction,
}: TProps) => {
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
      <PaginationContent className="flex-wrap gap-2">
        <PaginationItem
          className={cn(
            "group cursor-pointer rounded-md bg-slate-100 hover:bg-primary",
            {
              hidden: page === 1,
              "rounded-full": admin,
            },
          )}
        >
          <PaginationPrevious
            className="duration-0 group-hover:bg-transparent group-hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) {
                if (!!customFunction) {
                  customFunction(page - 1);
                } else {
                  handlePageChange(page - 1);
                }
              }
            }}
          />
        </PaginationItem>

        <RenderPaginationItems
          handlePageChange={
            !!customFunction ? customFunction : handlePageChange
          }
          totalPages={totalPages}
          currentPage={page}
        />

        <PaginationItem
          className={cn(
            "group cursor-pointer rounded-md bg-slate-100 hover:bg-primary",
            {
              hidden: page === totalPages,
              "rounded-full": admin,
            },
          )}
        >
          <PaginationNext
            className="duration-0 group-hover:bg-transparent group-hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) {
                if (!!customFunction) {
                  customFunction(page + 1);
                } else {
                  handlePageChange(page + 1);
                }
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MGPagination;

const RenderPaginationItems = ({
  totalPages,
  currentPage,
  handlePageChange,
  admin = false,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  admin?: boolean;
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
        className={cn("cursor-pointer rounded-md bg-slate-100", {
          "bg-primary text-white": currentPage === page,
          "hover:bg-primary-hover hover:text-slate-50": currentPage !== page,
          "rounded-full": admin,
        })}
        onClick={() => handlePageChange(page)}
      >
        <PaginationLink className="duration-0 hover:bg-transparent hover:text-inherit">
          {page}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  if (startPage > 1) {
    items.unshift(
      <PaginationItem
        key="ellipsis-start"
        className={cn("cursor-pointer rounded-md bg-slate-100", {
          "rounded-full": admin,
        })}
      >
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  if (endPage < totalPages) {
    items.push(
      <PaginationItem
        key="ellipsis-end"
        className={cn("cursor-pointer rounded-md bg-slate-100", {
          "rounded-full": admin,
        })}
      >
        <PaginationEllipsis />
      </PaginationItem>,
    );
  }

  return items;
};
