import {Input, List, message, Radio, Space, Typography} from 'antd';
import Search from "antd/es/input/Search";
import {searchDescription} from "../utils/PyUtils";
import React, {useState} from "react";
import {imagePrefix, searchExactName, searchName} from "../utils/NodeUtils";

const {Text} = Typography;

const SearchPage = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('Recommendation');
    const {handleMovie} = props;


    const handleRecommendationSearch = async (value) => {
        setIsLoading(true);
        try {
            const recommendation = await searchDescription(value);
            const results = await searchName(recommendation);
            setSearchResults(results);
        } catch (e) {
            message.error('Error: ' + e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExactSearch = async (value) => {
        setIsLoading(true);
        try {
            const results = await searchExactName(value);
            setSearchResults(results);
        } catch (e) {
            message.error('Error: ' + e);
        } finally {
            setIsLoading(false);
        }
    }

    const handleClick = (item) => {
        handleMovie(item.id);
    };

    const fontStyle = {
        color: '#FFFFFF',
        fontSize: "100px",
        display: "block",
        fontFamily: "Gill Sans, sans-serif"
    };

    return (
        <div className='flex flex-col search' > 
            {searchType === 'Recommendation' &&
                <>
                    <Text className="he"style={fontStyle} strong>DISCOVER</Text>
                    <Text className="he"style={fontStyle} strong>MORE.</Text>
                </>
            }
            {searchType === 'Search' &&
                <>
                    <Text className="he" style={fontStyle} strong>SEARCH</Text>
                    <Text className="he" style={fontStyle} strong>WATCH.</Text>
                </>
            }
            {/* style={{backgroundColor: "rgba(147,147,155,0.3)", borderRadius: "10px"}}  */}
            <div  className='mt-10 w-full'>
                <Radio.Group onChange={(e) => {
                    setSearchType(e.target.value);
                    setSearchResults([]);
                }}
                             value={searchType}
                             options={[
                                 {label: "Recommendation", value: "Recommendation"},
                                 {label: "Exact Search", value: "Search"},
                             ]}
                             buttonStyle="solid"
                             optionType="button"
                             disabled={isLoading}
                             size="large"
                             className="custom-radio-group w-full text-black"
                             style={{ height: '40px' }}
                             
                />
                {searchType === 'Recommendation' &&
                  <Search placeholder="Describe what you want to watch." onSearch={handleRecommendationSearch}
                disabled={isLoading} style={{width:"80%"}} size="large" />}
                   
                {searchType === 'Search' &&
                    <Search placeholder="Input the movie name." onSearch={handleExactSearch} disabled={isLoading}
                    className='w-4/6' style={{width:"80%"}} size="large" /> }
            </div>
            {searchResults.length > 0 &&
                <List style={{
                    overflow: "scroll",
                    overflowX:"hidden",
                    maxHeight: "500px",
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: "10px"
                }}
                    className='result'
                      dataSource={searchResults}
                      renderItem={(item) => (
                          <List.Item extra={<img src={`${imagePrefix}${item.poster_path}`} alt={item.title}
                                                 style={{height: "15%", width: "15%"}}/>}>
                              <Space direction="vertical">
                                  <Text style={{
                                      color: '#FFFFFF',
                                      fontSize: "20px",
                                      display: "block",
                                      fontFamily: "monospace"
                                  }} onClick={(e) => handleClick(item)}>{item.title}</Text>
                                  <Text style={{
                                      color: '#FFFFFF',
                                      fontSize: "13px",
                                      display: "block",
                                      fontFamily: "monospace"
                                  }}>{item.release_date}</Text>
                              </Space>
                          </List.Item>
                      )}/>
            }
        </div>
    );
};

export default SearchPage;