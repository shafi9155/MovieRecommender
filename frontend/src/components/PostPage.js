import {useEffect, useState} from "react";
import {imagePrefix, searchTrending} from "../utils/NodeUtils";
import {Carousel} from "antd";

const PostPage = (props) => {
    const [trending, setTrending] = useState([]);
    const {handleMovie} = props;

    useEffect(() => {
        const fetchTrending = async () => {
            const data = await searchTrending();
            await setTrending(data.results);
        };
        fetchTrending();
    }, []);

    const handleClick = (item) => {
        handleMovie(item.id);
    };

    const renderTrending = () => {
        return trending.map((item) => {
            return (
                <div key={item.id}>
                    <img src={`${imagePrefix}${item.poster_path}`} className="homeimg" alt={item.title} onClick={(e) => {handleClick(item)}}/>
                </div>
            );
        });
    }; 

    return (
        <div>
        <Carousel autoplay effect="fade" dots={false}>
            {renderTrending()}
        </Carousel>
        </div>
    );
};

export default PostPage;