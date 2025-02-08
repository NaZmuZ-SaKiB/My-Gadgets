import { brandGetAllAction } from "@/lib/actions/brand.action";
import { TBrand } from "@/types/brand.type";
import BrandsFilterItems from "./BrandsFilterItems";

const BrandsFilter = async () => {
  const brandsData = await brandGetAllAction(
    "limit=100&sortBy=name&sortOrder=asc",
  );
  const brands: TBrand[] = brandsData?.data || [];

  return <BrandsFilterItems brands={brands} />;
};

export default BrandsFilter;
