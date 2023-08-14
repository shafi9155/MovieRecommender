import {Content} from "antd/es/layout/layout";
import {Col, Row} from "antd";
import SearchPage from "./SearchPage";
import PostPage from "./PostPage";
import {useState} from "react";
import MoviePage from "./MoviePage";
import Navbar from "./Navbar";

const App = () => {
    const [movieId, setMovieId] = useState(null);

    return (
        <div> 
        <Navbar/>
        <Content  className="home">
            {movieId === null ?
                <div className="flex ">
                    <div className="w-1/2"> 
                        <PostPage handleMovie={setMovieId}/>
                    </div>
                    <div className="w-1/2">
                    <SearchPage handleMovie={setMovieId}/>
                    </div>

                </div>
                
                :
                <div className="Home">
                    <MoviePage movie={movieId} handleMovie={setMovieId}/>
                </div>
            }
        </Content>
        </div>
    );
}

export default App;
