const TMDB_TOKEN =
  import.meta.env.VITE_TMDB_TOKEN ||
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmY5N2U1MmE2M2VkNzcyZTBiYWI2YWU0M2U5MzlhZiIsIm5iZiI6MTc5MTc3OTQxNi44NjgsInN1YiI6IjZhY2M2MjU4M2IzNDUxNTM4ZDhmYWJlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l5VOLEYnYbm7OF9OYisNQZskhYiPs0dNfsKwEXnEd8E";

const API_BASE = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const PLACEHOLDER_POSTER =
  "https://via.placeholder.com/500x750?text=No+Poster";

export async function requestMovies(path, signal) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_TOKEN}`
    },
    signal
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}

export function buildEndpoint({ query, page }) {
  return query
    ? `/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=${page}`
    : `/movie/popular?language=en-US&page=${page}`;
}

function dateValue(movie) {
  return movie.release_date ? new Date(movie.release_date).getTime() : 0;
}

export function sortMovies(list, sort) {
  const copy = [...list];

  if (sort === "release-asc") copy.sort((a, b) => dateValue(a) - dateValue(b));
  if (sort === "release-desc") copy.sort((a, b) => dateValue(b) - dateValue(a));
  if (sort === "rating-asc")
    copy.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
  if (sort === "rating-desc")
    copy.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

  return copy;
}