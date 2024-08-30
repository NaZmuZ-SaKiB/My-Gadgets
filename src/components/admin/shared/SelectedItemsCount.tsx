const SelectedItemsCount = ({ count }: { count: number }) => {
  return (
    <span className="text-sm border shrink-0 inline-block px-3 py-2 border-slate-200 text-slate-700 rounded">
      Selected {count}
    </span>
  );
};

export default SelectedItemsCount;
