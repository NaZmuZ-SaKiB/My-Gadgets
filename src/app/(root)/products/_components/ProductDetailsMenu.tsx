import MGButton from "@/components/global/shared/MGButton";
import Link from "next/link";

const ProductDetailsMenu = () => {
  return (
    <div className="space-x-3">
      <Link href="#specification">
        <MGButton variant="outline" className="rounded-3xl">
          Specification
        </MGButton>
      </Link>

      <Link href="#description">
        <MGButton variant="outline" className="rounded-3xl">
          Description
        </MGButton>
      </Link>

      <Link href="#reviews">
        <MGButton variant="outline" className="rounded-3xl">
          Reviews
        </MGButton>
      </Link>
    </div>
  );
};

export default ProductDetailsMenu;
