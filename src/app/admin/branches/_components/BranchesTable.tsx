"use client";

import Link from "next/link";
import { ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import BranchDeleteDialog from "./BranchDeleteDialog";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import MGPagination from "@/components/global/shared/MGPagination";

import { TBranch } from "@/types/branch.type";
import { useBranchGetAllQuery } from "@/lib/queries/branch.query";

type TProps = {
  selectedBranches: string[];
  setSelectedBranches: (value: string[]) => void;
};

const BranchesTable = ({ selectedBranches, setSelectedBranches }: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useBranchGetAllQuery(searchParams.toString());

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedBranches(data?.data?.map((item: any) => item._id) || []);
    } else {
      setSelectedBranches([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedBranches([...selectedBranches, id]);
    } else {
      setSelectedBranches(selectedBranches.filter((item) => item !== id));
    }
  };
  // End Handle Select

  if (isLoading) {
    return (
      <AFloatingBox className="grid flex-1 place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="admin-table min-w-[600px] table-auto">
        <thead className="text-left">
          <tr>
            <th>
              <span className="inline-flex rounded bg-white p-[2px]">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  className="no-focus size-3.5"
                />
              </span>
            </th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TBranch) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedBranches.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="no-focus size-4"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>

              <td>
                <div className="flex justify-end gap-1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="no-focus group h-8 border-slate-300 bg-transparent hover:border-slate-600 hover:bg-slate-600"
                  >
                    <Eye className="size-4 text-slate-700 group-hover:text-white" />
                  </Button>

                  <Link
                    href={`/admin/branches/${item._id}`}
                    className="no-focus"
                  >
                    <Button
                      size="icon"
                      className="no-focus group h-8 border border-green-300 bg-transparent text-green-500 hover:border-green-500 hover:bg-green-500"
                    >
                      <Edit className="size-4 group-hover:text-white" />
                    </Button>
                  </Link>

                  <BranchDeleteDialog branches={[`${item._id}`]}>
                    <Button
                      size="icon"
                      className="no-focus group h-8 border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500"
                    >
                      <Trash2 className="size-4 group-hover:text-white" />
                    </Button>
                  </BranchDeleteDialog>
                </div>
              </td>
            </tr>
          ))}

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-xl">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-5 flex items-center justify-center gap-3 sm:justify-between">
        <div className="max-sm:hidden">
          <DataLimitSelect />
        </div>
        <MGPagination
          admin
          limit={data?.meta?.limit as number}
          page={data?.meta?.page as number}
          total={data?.meta?.total as number}
        />
      </div>
    </AFloatingBox>
  );
};

export default BranchesTable;
