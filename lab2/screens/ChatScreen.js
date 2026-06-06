import {useState} from "react";
import {Text, View, FlatList, StyleSheet, Image } from "react-native";
import Header from "../components/Header";
import TabSwitch from "../components/TabSwitch";
import styled from "styled-components/native";
import ChatItem from "../components/ChatItem";
import GameItem from "../components/GameItem";

const chatList = [
    {
        id: "1",
        username: "Mark Dyson",
        lastMessage: "I'm already starting to play",
        date: "14 Jun",
        avatar: require("../assets/images/avatar-1.png"),
        isOnline: true,
        isSeenRecently: false,
        isLastMessageYours: false,
        unreadMessagesCount: 1,
    },
    {
        id: "2",
        username: "Mark Dyson",
        lastMessage: "Ok",
        date: "14 Jun",
        avatar: require("../assets/images/avatar-1.png"),
        isOnline: true,
        isSeenRecently: false,
        isLastMessageYours: true,
        unreadMessagesCount: 0,
    },
    {
        id: "3",
        username: "Player123",
        lastMessage: "Ok",
        date: "14 Jun",
        avatar: require("../assets/images/avatar-main.png"),
        isOnline: false,
        isSeenRecently: true,
        isLastMessageYours: true,
        unreadMessagesCount: 0,
    },{
        id: "4",
        username: "Player123",
        lastMessage: "Ok",
        date: "14 Jun",
        avatar: require("../assets/images/avatar-main.png"),
        isOnline: false,
        isSeenRecently: true,
        isLastMessageYours: true,
        unreadMessagesCount: 0,
    },
    {
        id: "5",
        username: "Player",
        lastMessage: "Hello!",
        date: "12 Jun",
        avatar: require("../assets/images/avatar-2.png"),
        isOnline: false,
        isSeenRecently: false,
        isLastMessageYours: false,
        unreadMessagesCount: 0,
    },
    {
        id: "6",
        username: "Player",
        lastMessage: "Hello!",
        date: "12 Jun",
        avatar: require("../assets/images/avatar-2.png"),
        isOnline: false,
        isSeenRecently: false,
        isLastMessageYours: false,
        unreadMessagesCount: 0,
    },
    {
        id: "7",
        username: "Σxpresso",
        lastMessage: "Ok",
        date: "11 Jun",
        avatar: require("../assets/images/avatar-3.png"),
        isOnline: true,
        isSeenRecently: false,
        isLastMessageYours: false,
        unreadMessagesCount: 0,
    },
    {
        id: "8",
        username: "Σxpresso",
        lastMessage: "Ok",
        date: "11 Jun",
        avatar: require("../assets/images/avatar-3.png"),
        isOnline: true,
        isSeenRecently: false,
        isLastMessageYours: false,
        unreadMessagesCount: 0,
    },
];


const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;

const tabsList = ["Open chats", "My friends"];

export default function ChatScreen() {
    const [selectedTab, setSelectedTab] = useState(tabsList[0]);
    const [chatListData, setChatListData] = useState(chatList);
    const [loadingChats, setLoadingChats] = useState(false);

    const fetchMoreChatItems = () => {
        if (loadingChats) return;
        setLoadingChats(true);
        setTimeout(() => {
            setChatListData((prevData) => [...prevData, ...chatList]);
            setLoadingChats(false);
        }, 1500);
    };

    return (
        <Container>
            <Header title="Chat" showSearch={true}/>
            <TabSwitch tabs={tabsList} onTabChange={setSelectedTab}/>
            <FlatList
                data={chatListData}
                keyExtractor={(item, index) => `chatItem-${index}`}
                renderItem={({item}) => <ChatItem chat={item}/>}
                onEndReached={fetchMoreChatItems}
                onEndReachedThreshold={0.5}
                style={{marginTop: 12}}
            />
        </Container>
    );
}