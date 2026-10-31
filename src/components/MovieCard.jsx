import { IMAGE_BASE, PLACEHOLDER_POSTER } from "../api.js";

export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : PLACEHOLDER_POSTER;

  return (
    <article className="movie-card">
      <img src={poster} alt={movie.title || "Movie poster"} />
      <h2>{movie.title || "Untitled"}</h2>
      <p>Release Date: {movie.release_date || "Unknown"}</p>
      <p>Rating: {Number(movie.vote_average || 0).toFixed(1)}</p>
    </article>
  );
}