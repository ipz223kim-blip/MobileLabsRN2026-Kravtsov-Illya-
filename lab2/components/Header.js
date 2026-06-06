import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import ThemedLogo from "./ThemedLogo"; // Ensure you have this component

const HeaderContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Title = styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 28px;
    font-weight: 400;
    padding-left: 6px;
`;

const SearchIcon = styled(Ionicons)`
    color: ${({ theme }) => theme.text};
    font-size: 24px;
`;

export default function Header({ title, showSearch }) {
    return (
        <HeaderContainer>
            <Row>
                <ThemedLogo />
                <Title>{title}</Title>
            </Row>
            {showSearch && <SearchIcon name="search-outline" />}
        </HeaderContainer>
    );
}
