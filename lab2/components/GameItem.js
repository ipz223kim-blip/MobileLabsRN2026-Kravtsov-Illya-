import styled from "styled-components/native";
import {useContext} from "react";
import {ThemeContext} from "../theme/theme";

const GameContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    height: 70px;
`;

const GameImage = styled.Image`
    width: 72px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
`;

const Column = styled.View`
    flex: 1;
`;

const GameTitle = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
`;

const PlatformRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Platform = styled.Text`
    color: gray;
    font-size: 14px;
`;

const PriceRow = styled.View`
    flex-direction: column;
    align-items: flex-end;
`;

const OriginalPrice = styled.Text`
    color: gray;
    font-size: 14px;
    text-decoration: line-through;
    margin-right: 5px;
`;

const Price = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 18px;
`;

const DiscountBadge = styled.View`
    background-color: #35c759;
    padding: 2px 6px;
    border-radius: 5px;
    margin-left: 8px;
    margin-top: 3px;
`;

const DiscountText = styled.Text`
    color: white;
    font-size: 12px;
    font-weight: bold;
`;

const Prices = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

const PlatformIcon = styled.Image`
    height: 12px;
    width: 12px;
    margin-right: 7px;
`;

export default function GameItem({game}) {
    const hasDiscount = game.discount && game.price;
    const { theme } = useContext(ThemeContext);

    return (
        <GameContainer>
            <GameImage source={game.image}/>
            <Column>
                <GameTitle>{game.title}</GameTitle>
                <PlatformRow>
                    {game.icons.map((icon, index) => (
                        <PlatformIcon key={index} source={icon} style={{ tintColor: theme.textSecondary }} />
                    ))}
                    <Platform>{game.platform}</Platform>
                </PlatformRow>
            </Column>

            {hasDiscount ? (
                <PriceRow>
                    <Prices>
                        <OriginalPrice>{game.price}</OriginalPrice>
                        <Price>{game.discountedPrice}</Price>
                    </Prices>
                    <DiscountBadge>
                        <DiscountText>{game.discount}</DiscountText>
                    </DiscountBadge>
                </PriceRow>
            ) : (
                <Price>{game.price}</Price>
            )}
        </GameContainer>
    );
}
