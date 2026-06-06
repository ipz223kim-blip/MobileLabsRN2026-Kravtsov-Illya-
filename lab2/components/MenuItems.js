import styled from "styled-components/native";
import {FontAwesome} from "@expo/vector-icons";
import {FlatList, View} from "react-native";

const MenuItemContainer = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.menuItem};
    padding: 20px 20px 20px 14px;
    margin: 0 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1px;
    border-top-left-radius: ${({isFirst}) => (isFirst ? "10px" : "0px")};
    border-top-right-radius: ${({isFirst}) => (isFirst ? "10px" : "0px")};
    border-bottom-left-radius: ${({isLast}) => (isLast ? "10px" : "0px")};
    border-bottom-right-radius: ${({isLast}) => (isLast ? "10px" : "0px")};
`;

const MenuText = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
`;

export default function MenuItems({menuItems}) {
    return (
        <View>
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                    <MenuItemContainer onPress={item.onPress} isFirst={index === 0}
                                       isLast={index === menuItems.length - 1}>
                        <MenuText>{item.title}</MenuText>
                        <FontAwesome name="angle-right" size={18} color="gray"/>
                    </MenuItemContainer>
                )}
            />
        </View>
    );
}
