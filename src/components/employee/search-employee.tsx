import { useEffect, useState } from "react";
import useDebounce from "../../hooks/use-debounce";
type Props = {
  onSearch: (search: string) => void;
};
export default function SearchEmployee({ onSearch }: Props) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce({ value: search, delay: 500 });
  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <div className="mb-2 w-2xl">
      <input
        type="text"
        placeholder="Search Employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
