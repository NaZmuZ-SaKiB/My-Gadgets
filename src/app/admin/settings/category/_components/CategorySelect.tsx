"use client";

import { useCategoryGetAllWithSubCatQuery } from "@/lib/queries/category.query";
import { TCategory } from "@/types/category.type";
import { toast } from "sonner";

type TProps = {
  selectedCategories: string[];
  setSelectedCategories: (prev: any) => void;
  imageRequired?: boolean;
  maxCategories?: number;
};

const CategorySelect = ({
  selectedCategories,
  setSelectedCategories,
  imageRequired = false,
  maxCategories,
}: TProps) => {
  const { data: categoryData, isLoading: loadingCategories } =
    useCategoryGetAllWithSubCatQuery();
  const categories: TCategory[] = categoryData?.data || [];

  const handleCategoryChange = (cat: TCategory) => {
    if (selectedCategories.includes(cat._id)) {
      setSelectedCategories((prev: string[]) =>
        prev.filter((id) => id !== cat._id),
      );
    } else {
      if (maxCategories && selectedCategories.length >= maxCategories) {
        toast.warning(`You can only select ${maxCategories} categories`);
        return;
      }

      if (imageRequired && !cat.image) {
        toast.warning("Please add an image to this category");
        return;
      }

      setSelectedCategories((prev: string[]) => [...prev, cat._id]);
    }
  };
  return (
    <div className="flex flex-col items-start gap-1 text-sm">
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
                  ? "font-medium text-primary-hover"
                  : ""
              }
            >
              {category.name}
            </span>
          </div>

          {category.subCategories.length > 0 && (
            <RenderSubCategories
              selectedCategories={selectedCategories}
              subCategories={category.subCategories as TCategory[]}
              handleCategoryChange={handleCategoryChange}
              imageRequired={imageRequired}
            />
          )}
        </div>
      ))}
    </div>
  );
};

type TRenderProps = {
  subCategories: TCategory[];
  handleCategoryChange: any;
  selectedCategories: string[];
  imageRequired?: boolean;
};

const RenderSubCategories = ({
  selectedCategories,
  subCategories,
  handleCategoryChange,
  imageRequired = false,
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
                  ? "font-medium text-primary-hover"
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

export default CategorySelect;
