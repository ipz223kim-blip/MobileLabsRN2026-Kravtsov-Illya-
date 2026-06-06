import {useState} from "react";
import styled from "styled-components/native";

const TabContainer = styled.View`
    flex-direction: row;
    background-color: ${({theme}) => theme.secondary};
    padding: 2px;
    border-radius: 8px;
    margin: 0 20px;
`;

const TabButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    padding: 4px 0;
    border-radius: 7px;
    background-color: ${({isActive, theme}) => (isActive ? theme.background : "transparent")};
`;

const TabText = styled.Text`
    color: ${({isActive, theme}) => (isActive ? theme.text : theme.textSecondary)};
    font-size: 14px;
`;

export default function TabSwitch({ tabs, onTabChange }) {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabPress = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <TabContainer>
            {tabs.map((tab) => (
                <TabButton key={tab} isActive={activeTab === tab} onPress={() => handleTabPress(tab)}>
                    <TabText isActive={activeTab === tab}>{tab}</TabText>
                </TabButton>
            ))}
        </TabContainer>
    );
}
