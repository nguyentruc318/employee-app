export default function FilterEmployee({
  onFilter,
}: {
  onFilter: (country: string) => void;
}) {
  return (
    <div className="mb-2 ">
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="">All Countries</option>
        <option value="Vietnam">Vietnam</option>
        <option value="USA">USA</option>
        <option value="Japan">Japan</option>
        <option value="Korea">Korea</option>
      </select>
    </div>
  );
}
