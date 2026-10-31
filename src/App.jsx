import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import MovieGrid from "./components/MovieGrid.jsx";
import Pagination from "./components/Pagination.jsx";
import Footer from "./components/Footer.jsx";
import { buildEndpoint, requestMovies, sortMovies } from "./api.js";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Debounce the search box: typing resets back to page 1. */
  useEffect(() => {
    const id = setTimeout(() => {
      setQuery(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [searchInput]);

  /* Fetch a page of movies whenever the query or page changes. */
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError("");

    requestMovies(buildEndpoint({ query, page }), controller.signal)
      .then((data) => {
        if (cancelled) return;
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch((err) => {
        if (cancelled || err.name === "AbortError") return;
        setMovies([]);
        setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [query, page]);

  /* Sorting is applied to the movies already on screen. */
  const visibleMovies = useMemo(() => sortMovies(movies, sort), [movies, sort]);

  const status = loading
    ? "Loading movies..."
    : error
    ? error
    : visibleMovies.length === 0
    ? "No movies found."
    : "";

  const handlePrevious = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <>
      <Header />
      <Toolbar
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        sortValue={sort}
        onSortChange={setSort}
      />

      <main>
        <p className="status">{status}</p>
        <MovieGrid movies={visibleMovies} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
          disabled={loading}
        />
      </main>

      <Footer />
    </>
  );
}