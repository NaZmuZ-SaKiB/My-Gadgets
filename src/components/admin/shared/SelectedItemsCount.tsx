const SelectedItemsCount = ({ count }: { count: number }) => {
  return (
    <span className="text-sm border shrink-0 inline-block px-3 py-2 border-gray-200 text-gray-700 rounded">
      Selected {count}
    </span>
  );
};

export default SelectedItemsCount;
