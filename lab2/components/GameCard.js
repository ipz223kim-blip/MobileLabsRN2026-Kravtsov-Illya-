import styled from "styled-components/native";

const Card = styled.View`
    background-color: ${({theme}) => theme.cardBackground};
    border-radius: 10px;
    overflow: hidden;
    height: 230px;
    width: 350px;
`;

const GameImage = styled.Image`
    width: 100%;
    height: 230px;
`;

const Overlay = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
`;

const GameTitle = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
`;

const Subtitle = styled.Text`
    color: #C1BCB5;
    font-size: 13px;
`;

const BottomRow = styled.View`
    flex-direction: row;
    margin-top: 5px;
    justify-content: space-between;
`;

const PriceRow = styled.View`
    flex-direction: row;
    align-items: center;

    background: rgba(0, 0, 0, 0.6);
    width: 95px;
    border-radius: 0 3px 3px 0;
`;

const DiscountTag = styled.Text`
    background-color: ${({theme}) => theme.discountColor};
    color: #ffffff;
    padding: 3px 5px;
    border-radius: 3px 0 0 3px;
    margin-right: 8px;
    font-size: 12px;
`;

const OldPrice = styled.Text`
    color: #C1BCB5;
    text-decoration: line-through;
    margin-right: 5px;
    font-weight: bold;
    font-size: 12px;
`;

const NewPrice = styled.Text`
    color: white;
    font-size: 12px;
`;

const PlatformIcon = styled.Image`
    height: 16px;
    width: 16px;
    margin-left: 8px;
`;

export default function GameCard({game}) {
    return (
        <Card>
            <GameImage source={game.image}/>
            <Overlay>
                <GameTitle>{game.title}</GameTitle>
                <Subtitle>{game.subtitle}</Subtitle>
                <BottomRow>
                    <PriceRow>
                        <DiscountTag>{game.discount}</DiscountTag>
                        <OldPrice>{game.price}</OldPrice>
                        <NewPrice>{game.discountedPrice}</NewPrice>
                    </PriceRow>
                    {game.icons.map((icon, index) => (
                        <PlatformIcon key={index} source={icon} />
                    ))}
                </BottomRow>
            </Overlay>
        </Card>
    );
}
