import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="xl:search-box-pc search-box max-xl:search-box-mobile bg-white">
      <input
        className="flex-1 focus:outline-none"
        type="text"
        autoComplete="off"
      />
      <button className="flex shrink-0 items-center justify-center">
        <Search className="h-6 text-primary" />
      </button>
    </div>
  );
};

export default SearchBox;
