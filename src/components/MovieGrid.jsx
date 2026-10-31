import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies }) {
  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}