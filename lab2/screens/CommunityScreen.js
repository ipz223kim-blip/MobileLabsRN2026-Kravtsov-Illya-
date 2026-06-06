import {useState, useEffect} from "react";
import styled, {ThemeProvider} from "styled-components/native";
import {ActivityIndicator, FlatList} from "react-native";
import Header from "../components/Header";
import FilterTabs from "../components/FilterTabs";
import PostItem from "../components/PostItem";

const postList = [
    {
        id: 1,
        username: "Eurogamer",
        avatar: require("../assets/images/avatar-post.png"),
        timestamp: "Yesterday • 2:20 pm",
        isNews: true,
        image: require("../assets/images/kingdom-come.png"),
        title: "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
        description: "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
        likes: 324,
        comments: 12,
    },
    {
        id: 2,
        username: "Eurogamer",
        avatar: require("../assets/images/avatar-post.png"),
        timestamp: "Yesterday • 2:20 pm",
        isNews: false,
        image: require("../assets/images/fortnite.png"),
        title: "Florida tourist attraction sues Fortnite, seeks removal of in-game castle",
        description: "Coral Castle Museum, a tourist attraction near Miami, is suing Fortnite maker Epic Games for trademark infringement and unfair competition.",
        likes: 934,
        comments: 78,
    },
];

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;

const LoadingIndicator = styled.View`
    padding: 20px;
    align-items: center;
`;

const Description = styled.Text`
    font-size: 14px;
    color: ${({theme}) => theme.textSecondary};
    top: -10px;
    padding: 0 20px;
    margin-bottom: 21px;
`;

export default function CommunityScreen() {
    const [postListData, setPostListData] = useState(postList);
    const [loadingPosts, setLoadingPosts] = useState(false);

    const fetchMorePostItems = () => {
        if (loadingPosts) return;
        setLoadingPosts(true);
        setTimeout(() => {
            setPostListData((prevData) => [...prevData, ...postList]);
            setLoadingPosts(false);
        }, 1500);
    };

    return (
        <Container>
            <Header title="Community" showSearch={false}/>
            <Description>Community and official content for all games and software</Description>
            <FilterTabs tabs={["All", "Screenshots", "Artwork", "Workshop"]} showSearch={true}/>
            <FlatList
                data={postListData}
                keyExtractor={(item, index) => `postItem-${index}`}
                renderItem={({item}) => <PostItem post={item}/>}
                onEndReached={fetchMorePostItems}
                onEndReachedThreshold={0.5}
                style={{marginTop: 16}}
            />
        </Container>
    );
}
