import { TCategory } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  featuredCategories: TCategory[];
};

const FeaturedCategories = ({ featuredCategories }: TProps) => {
  const params = new URLSearchParams();
  params.append("featured", "true");
  params.append("limit", "12");

  // const categoryData = await categoryGetAllAction(params.toString());
  // const categories: TCategory[] = categoryData.data || [];

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
    <section className="pb-4 pt-4 md:pt-6">
      <h2 className="text-2xl font-bold text-slate-700 md:text-3xl">
        Featured Categories
      </h2>

      <div className="mt-5 flex flex-wrap gap-3 md:mt-8 md:gap-4">
        {featuredCategories.map((category, i) => (
          <Link
            href={`/shop/${category.name}`}
            key={`featured-category-${category._id}`}
            className={`flex flex-1 basis-32 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl p-4 transition-shadow duration-500 hover:shadow-lg sm:basis-48`}
            style={{ backgroundColor: colors[i] }}
          >
            <Image
              src={category.image!.secureUrl}
              alt={category.name}
              height={64}
              width={64}
              className="object-contain"
            />
            <span className="text-center font-bold text-slate-700 max-sm:text-sm">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
