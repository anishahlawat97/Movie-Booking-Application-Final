export const getMovies = (status) => {
    return fetch(`http://localhost:8085/api/movies?status=${status}`)
}

export const getGenres = () =>{
    return fetch('http://localhost:8085/api/genres')
}

export const getArtists = () => {
    return fetch('http://localhost:8085/api/artists')
}

export const getFilteredMovies = (filterState) => {
    return fetch(`http://localhost:8085/api/movies?status=RELEASED&title=${filterState.movieName}&genres=${filterState.genreName}&artists=${filterState.personName}&start_date=${filterState.startDate}&end_date=${filterState.endDate}`)
}

export const getMovieByID = (id) => {
    return fetch(`http://localhost:8085/api/movies/${id}`)
}

export const signUp = (body)=>{
    return fetch('http://localhost:8085/api/auth/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
}

export const login = (body)=>{
    return fetch('http://localhost:8085/api/auth/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
}