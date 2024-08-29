import { categoryGetAllAction } from "@/lib/actions/category.action";
import { TCategory } from "@/types/category.type";
import Image from "next/image";

const FeaturedCategories = async () => {
  const params = new URLSearchParams();
  params.append("featured", "true");
  params.append("limit", "12");

  const categoryData = await categoryGetAllAction(params.toString());
  const categories: TCategory[] = categoryData.data || [];

  const colors: string[] = [
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#fff3ff",
    "#fff3eb",
    "#f2fce4",
    "#feefea",
    "#fffceb",
    "#ecffec",
    "#feefea",
    "#f2fce4",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#fffceb",
    "#feefea",
    "#ecffec",
  ];

  return (
    <section className="pt-4 md:pt-6 pb-4">
      <h2 className="font-bold text-2xl md:text-3xl text-gray-700">
        Featured Categories
      </h2>

      <div className="flex flex-wrap gap-3 md:gap-4 mt-5 md:mt-8">
        {categories.map((category, i) => (
          <div
            key={`featured-category-${category._id}`}
            className={`rounded-xl flex flex-col justify-center items-center p-4 gap-4 flex-1 basis-32 sm:basis-48 hover:shadow-lg transition-shadow duration-500 cursor-pointer`}
            style={{ backgroundColor: colors[i] }}
          >
            <Image
              src={category.image!.secureUrl}
              alt={category.name}
              height={64}
              width={64}
              className="object-contain"
            />
            <span className="font-bold text-gray-700 text-center max-sm:text-sm">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
