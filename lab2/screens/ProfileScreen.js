import {Text, View, FlatList, StyleSheet, Image, Button} from "react-native";
import styled from "styled-components/native";
import {useContext} from "react";
import {ThemeContext} from "../theme/theme";
import MenuItems from "../components/MenuItems";

const menuItems = [
    {id: 1, title: "Settings", onPress: () => console.log("Settings clicked")},
    {id: 2, title: "Logout", onPress: () => console.log("Logout clicked")}
];

const AvatarContainer = styled.View`
    align-items: center;
    margin-top: 25px;
    margin-bottom: 27px;
`;

const ProfileImageWrapper = styled.View`
    position: relative;
`;

const ProfileImage = styled.Image`
    width: 98px;
    height: 98px;
    border-radius: 50px;
`;

const OnlineIndicator = styled.View`
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: #35c759;
    border: 2px solid ${({theme}) => theme.background};
`;

const Username = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
    margin-top: 10px;
`;

const UserGroup = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
`;

const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.background};
`;

const MenuContainer = styled.View`
    margin-bottom: 20px;
`;


const Avatar = ({imageSource, username, group}) => (
    <AvatarContainer>
        <ProfileImageWrapper>
            <ProfileImage source={imageSource}/>
            <OnlineIndicator/>
        </ProfileImageWrapper>
        <Username>{username}</Username>
        <UserGroup>{group}</UserGroup>
    </AvatarContainer>
);

const StyledButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.primary}; 
  padding: 9px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.buttonText}; 
  font-size: 14px;
  font-weight: bold;
`;




export default function ProfileScreen() {
    const {toggleTheme} = useContext(ThemeContext);

    return (
        <Container>
            <Avatar
                imageSource={require("../assets/images/avatar-main.png")}
                username="Firstname Lastname"
                group="Group"
            />
            <MenuContainer>
                <MenuItems menuItems={menuItems}/>
            </MenuContainer>
            <StyledButton onPress={toggleTheme}>
                <ButtonText>Change Theme</ButtonText>
            </StyledButton>
        </Container>
    );
}

