import styled from "styled-components/native";
import {Text, TouchableOpacity} from "react-native";

const ChatContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
`;

const AvatarWrapper = styled.View`
    position: relative;
    margin-right: 12px;
`;

const Avatar = styled.Image`
    width: 52px;
    height: 52px;
    border-radius: 26px;
`;

const OnlineIndicator = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({isOnline}) => (isOnline ? "#00D44B" : "#31BCFC")};
    border: 2px solid ${({theme}) => theme.background};
`;

const ChatDetails = styled.View`
    flex: 1;
`;

const Username = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
`;

const MessagePreview = styled.Text`
    color: ${({theme}) => theme.textSecondary};
    font-size: 14px;
`;

const IndicatorContainer = styled.View`
    align-items: flex-end;
`;

const DateText = styled.Text`
    color: ${({theme}) => theme.textSecondary};
    font-size: 14px;
`;

const UnreadIndicator = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({theme}) => theme.primary};
    align-items: center;
    justify-content: center;
`;

const UnreadIndicatorNumber = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 12px;
`;

const LastMessageYoursIndicator = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: ${({theme}) => theme.text};
`;

const DetailsLine = styled.View`
    color: ${({theme}) => theme.textSecondary};
    flex-direction: row;
`;

const LastMessageYou = styled.Text`
    font-weight: bold;
    color: ${({theme}) => theme.text};
`;

const TextSeparator = styled.Text`
    color: ${({theme}) => theme.textSecondary};
`

export default function ChatItem({chat, onPress}) {
    return (
        <ChatContainer onPress={onPress}>
            <AvatarWrapper>
                <Avatar source={chat.avatar}/>
                {(chat.isOnline || chat.isSeenRecently) && (
                    <OnlineIndicator isOnline={chat.isOnline}/>
                )}

            </AvatarWrapper>
            <ChatDetails>
                <Username>{chat.username}</Username>
                <DetailsLine>
                    {chat.isLastMessageYours && <LastMessageYou>You: </LastMessageYou>}
                    <MessagePreview>{chat.lastMessage}</MessagePreview>
                    <TextSeparator> • </TextSeparator>
                    <DateText>{chat.date}</DateText>
                </DetailsLine>
            </ChatDetails>
            <IndicatorContainer>
                {(chat.unreadMessagesCount !== 0)
                    ?
                    <UnreadIndicator>
                        <UnreadIndicatorNumber>{chat.unreadMessagesCount}</UnreadIndicatorNumber>
                    </UnreadIndicator>
                    :
                    chat.isLastMessageYours && <LastMessageYoursIndicator/>
                }
            </IndicatorContainer>
        </ChatContainer>
    );
}
