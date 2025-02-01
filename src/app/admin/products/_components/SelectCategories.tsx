"use client";

import { Loader2 } from "lucide-react";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

import { TCategory } from "@/types/category.type";
import { useCategoryGetAllWithSubCatQuery } from "@/lib/queries/category.query";

type TProps = {
  selectedCategories: string[];
  setSelectedCategories: (prev: any) => void;
};

const SelectCategories = ({
  selectedCategories,
  setSelectedCategories,
}: TProps) => {
  const { data: categoryData, isLoading: loadingCategories } =
    useCategoryGetAllWithSubCatQuery();
  const categories = categoryData?.data || [];

  // Handle Category Change
  const handleCategoryChange = (cat: TCategory) => {
    if (!selectedCategories.includes(cat._id)) {
      setSelectedCategories((prev: string[]) => [...prev, cat._id]);
    } else {
      setSelectedCategories((prevState: string[]) => {
        // Function to recursively remove subcategory IDs
        const removeSubCategories = (
          subCategories: TCategory[],
          state: string[],
        ): string[] => {
          subCategories.forEach((subCategory) => {
            state = state.filter((id) => id !== subCategory._id);
          });
          return state;
        };

        let updatedState = prevState.filter((id) => id !== cat._id);
        if (cat.subCategories && cat.subCategories.length > 0) {
          updatedState = removeSubCategories(
            cat.subCategories as TCategory[],
            updatedState,
          );
        }

        return updatedState;
      });
    }
  };

  if (loadingCategories) {
    return (
      <AFloatingBox className="grid place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-blue-500" />
      </AFloatingBox>
    );
  }
  return (
    <AFloatingBox>
      <h2 className="font-medium text-slate-700">Select Categories*</h2>
      <p className="mb-5 text-sm text-slate-500">
        This Product will be available in the selected categories pages.
      </p>

      <div className="flex flex-col items-start gap-1">
        {categories.map((category: TCategory) => (
          <div key={category._id}>
            <div
              className="flex cursor-pointer items-center gap-2 capitalize text-slate-600 hover:text-primary"
              onClick={() => handleCategoryChange(category)}
            >
              <input
                type="checkbox"
                readOnly
                checked={selectedCategories.includes(category._id)}
              />
              <span
                className={
                  selectedCategories.includes(category._id)
                    ? "text-primary-hover"
                    : ""
                }
              >
                {category.name}
              </span>
            </div>

            {category.subCategories.length > 0 &&
              selectedCategories.includes(category._id) && (
                <RenderSubCategories
                  selectedCategories={selectedCategories}
                  subCategories={category.subCategories as TCategory[]}
                  handleCategoryChange={handleCategoryChange}
                />
              )}
          </div>
        ))}
      </div>
    </AFloatingBox>
  );
};

type TRenderProps = {
  subCategories: TCategory[];
  handleCategoryChange: any;
  selectedCategories: string[];
};

const RenderSubCategories = ({
  selectedCategories,
  subCategories,
  handleCategoryChange,
}: TRenderProps) => {
  return (
    <div className="ml-1.5 flex flex-col gap-1 border-l border-slate-300 pl-8 pt-2">
      {subCategories.map((subCategory: TCategory) => (
        <div key={subCategory._id}>
          <div
            className="flex cursor-pointer items-center gap-2 capitalize text-slate-600 hover:text-primary"
            onClick={() => handleCategoryChange(subCategory)}
          >
            <input
              type="checkbox"
              readOnly
              checked={selectedCategories.includes(subCategory._id)}
            />
            <span
              className={
                selectedCategories.includes(subCategory._id)
                  ? "text-primary-hover"
                  : ""
              }
            >
              {subCategory.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectCategories;
