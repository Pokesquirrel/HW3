export default function Toolbar({
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange
}) {
  return (
    <section className="toolbar">
      <input
        type="search"
        placeholder="Search for a movie..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search for a movie"
      />

      <select
        value={sortValue}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort movies"
      >
        <option value="">Sort By</option>
        <option value="release-asc">Release Date (Asc)</option>
        <option value="release-desc">Release Date (Desc)</option>
        <option value="rating-asc">Rating (Asc)</option>
        <option value="rating-desc">Rating (Desc)</option>
      </select>
    </section>
  );
}