import {useState, useEffect, useContext} from "react";
import styled, {ThemeProvider} from "styled-components/native";
import {View, FlatList} from "react-native";
import {ThemeContext} from "../theme/theme";
import {darkTheme} from "../theme/theme";
import Header from "../components/Header";
import GameCard from "../components/GameCard";
import FilterTabs from "../components/FilterTabs";
import GameItem from "../components/GameItem";
import {Button} from "react-native";


const gameList = [
    {
        id: 1,
        title: "Grand Theft Auto V",
        platform: "Windows",
        price: "$20",
        discount: "-50%",
        discountedPrice: "$10",
        image: require("../assets/images/gta.png"),
        icons: [require("../assets/images/microsoft-windows-22.png")]
    },
    {
        id: 2,
        title: "Battlefield 4",
        platform: "Windows",
        price: "$35",
        image: require("../assets/images/battlefield.png"),
        icons: [require("../assets/images/microsoft-windows-22.png")]
    },
    {
        id: 3,
        title: "Factorio",
        platform: "Windows, Mac",
        price: "$7",
        image: require("../assets/images/factorio.png"),
        icons: [require("../assets/images/microsoft-windows-22.png"), require("../assets/images/mac-icon.png")]
    },
    {
        id: 4,
        title: "Horizon Zero Dawn",
        platform: "Windows",
        price: "$38",
        image: require("../assets/images/horizon.png"),
        icons: [require("../assets/images/microsoft-windows-22.png")]
    },
];
const gameCard = {
    title: "Dead by Daylight",
    subtitle: "Recommended by your friend, Player",
    discount: "-70%",
    price: "$18",
    discountedPrice: "$5",
    image: require("../assets/images/dead-by-daylight.png"),
    icons: [require("../assets/images/microsoft-windows-22.png")]
};


const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};;
`;

const GameContainer = styled.View`
    margin-top: 32px;
`;

const LoadingIndicator = styled.View`
    padding: 20px;
    align-items: center;
`;


export default function StoreScreen() {
    const [gameCardData, setGameCardData] = useState([gameCard]);
    const [gameListData, setGameListData] = useState(gameList);
    const [loadingCards, setLoadingCards] = useState(false);
    const [loadingGames, setLoadingGames] = useState(false);

    const fetchMoreGameCards = () => {
        if (loadingCards) return;
        setLoadingCards(true);
        setTimeout(() => {
            setGameCardData((prevData) => [...prevData, gameCard]);
            setLoadingCards(false);
        }, 1500);
    };

    const fetchMoreGameItems = () => {
        if (loadingGames) return;
        setLoadingGames(true);
        setTimeout(() => {
            setGameListData((prevData) => [...prevData, ...gameList]);
            setLoadingGames(false);
        }, 1500);
    };

    return (
        <Container>
            <Header title="Store" showSearch={true}/>

            <FlatList
                data={gameCardData}
                keyExtractor={(item, index) => `gameCard-${index}`}
                renderItem={({item}) => (
                    <View style={{marginRight: 17}}>
                        <GameCard game={item}/>
                    </View>
                )}

                onEndReached={fetchMoreGameCards}
                onEndReachedThreshold={0.5}
                style={{marginLeft: 20, marginTop: 18, minHeight: 230}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />

            <GameContainer>
                <FilterTabs tabs={["Top Sellers", "Free to Play", "Early Access", "Action"]}/>

                <FlatList
                    data={gameListData}
                    keyExtractor={(item, index) => `gameItem-${index}`}
                    renderItem={({item}) => <GameItem game={item}/>}
                    onEndReached={fetchMoreGameItems}
                    onEndReachedThreshold={0.5}
                    style={{marginTop: 15}}
                />
            </GameContainer>
        </Container>
    );
}