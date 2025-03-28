import { useParams } from "react-router-dom";
import "./Movie.css";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const getMovie = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovie(data);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };
  const formatCurrency = (number) => {
    return number.toLocaleString("es-US", {
      style: "currency",
      currency: "USD",
    });
  };
  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`;
    getMovie(movieUrl);
  }, []);
  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>

          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime}</p>
          </div>
          <div className="info description">
            <h3>
              <BsWallet2 /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
