import {useState} from "react";
import styled from "styled-components/native";
import {View, FlatList} from "react-native";
import {Ionicons} from "@expo/vector-icons";

const Container = styled.View`
    flex-direction: row;
    margin-left: 20px;
`;

const Tab = styled.TouchableOpacity`
    background-color: ${({active, theme}) => (active ? theme.primary : theme.secondary)};
    padding: 8px 15px;
    border-radius: 8px;
    margin-right: 8px;
`;

const TabText = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 14px;
`;

const SearchIcon = styled(Ionicons)`
    color: ${({theme}) => theme.textSecondary};
    font-size: 14px;
    top: 2px;
`;

export default function FilterTabs({tabs, onTabChange, showSearch}) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        if (onTabChange) onTabChange(tab);
    };

    return (
        <Container>
            {showSearch && <Tab><SearchIcon name="search-outline"/></Tab>}
            <FlatList
                data={tabs}
                horizontal
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <Tab key={item} active={activeTab === item} onPress={() => handleTabPress(item)}>
                        <TabText>{item}</TabText>
                    </Tab>
                )}
            />
        </Container>
    );

}
