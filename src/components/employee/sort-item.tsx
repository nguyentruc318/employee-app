export default function SortItem({
  onSort,
}: {
  onSort: (sortItem: string) => void;
}) {
  return (
    <div className="mb-2 ">
      <select
        onChange={(e) => onSort(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">Sort by</option>
        <option value="name">Name (A-Z)</option>
        <option value="-name">Name (Z-A)</option>
        <option value="age">Age (A-Z)</option>
        <option value="-age">Age (Z-A)</option>
      </select>
    </div>
  );
}
