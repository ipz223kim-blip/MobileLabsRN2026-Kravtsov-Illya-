import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import {TouchableOpacity, View} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PostContainer = styled.View`
    background-color: ${({theme}) => theme.background};
    padding: 16px 20px;
`;

const UserRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Avatar = styled.Image`
    width: 34px;
    height: 34px;
    border-radius: 17px;
    margin-right: 9px;
`;

const Username = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
`;

const NewsBadge = styled.View`
    background-color: ${({theme}) => theme.newsTag};
    border-radius: 3px;
    margin-left: 10px;
`;

const NewsText = styled.Text`
    color: #ffffff;
    font-size: 8px;
    padding: 2px 5px;
`;

const Timestamp = styled.Text`
    color: ${({theme}) => theme.textSecondary};
    font-size: 12px;
`;

const PostImage = styled.Image`
    width: 100%;
    height: 186px;
    border-radius: 8px;
    margin-bottom: 15px;
`;

const PostTitle = styled.Text`
    color: ${({theme}) => theme.text};
    font-size: 16px;
    margin-bottom: 8px;
`;

const PostDescription = styled.Text`
    color: ${({theme}) => theme.textSecondary};
    font-size: 14px;
    margin-bottom: 12px;
`;

const InteractionRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    border-top-width: 1px;
    border-top-color: ${({theme}) => theme.secondary};
    padding-top: 15px;
`;

const Interaction = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: end;
`;

const LikeIcon = styled(Feather)`
    color: ${({theme}) => theme.greenHightlight};
    font-size: 18px;
    margin-right: 5px;
`;

const CommentIcon = styled(Feather)`
    color: ${({theme}) => theme.textMuted};
    font-size: 18px;
    margin-right: 5px;
    margin-left: 36px;
`;

const ShareIcon = styled(FontAwesome)`
    color: ${({theme}) => theme.textMuted};
    font-size: 18px;
`;

const InteractionText = styled.Text`
    color: ${({theme}) => theme.textMuted};
`;

const InteractionTextHighlight = styled.Text`
    color: ${({theme}) => theme.greenHightlight};
`;

const Separator = styled.View`
    background-color: ${({theme}) => theme.backgroundSeparator};
    height: 8px;
`;

const UsernameContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const UserTimeContainer = styled.View`
    flex-direction: column;
    align-items: flex-start;
`;

const OptionsIcon = styled(Ionicons)`
    color: ${({theme}) => theme.textSecondary};
    font-size: 20px;
`;

const LikeCommentContainer = styled.View`
    flex-direction: row;
`;

export default function PostItem({post}) {
    return (
        <View>
            <Separator/>
            <PostContainer>
                <UserRow>
                    <UserInfo>
                        <Avatar source={post.avatar}/>
                        <UserTimeContainer>
                            <UsernameContainer>
                                <Username>{post.username}</Username>
                                {post.isNews && <NewsBadge><NewsText>NEWS</NewsText></NewsBadge>}
                            </UsernameContainer>
                            <Timestamp>{post.timestamp}</Timestamp>
                        </UserTimeContainer>
                    </UserInfo>
                    <TouchableOpacity><OptionsIcon name="ellipsis-horizontal"/></TouchableOpacity>
                </UserRow>
                <PostImage source={post.image}/>
                <PostTitle>{post.title}</PostTitle>
                <PostDescription>{post.description}</PostDescription>
                <InteractionRow>
                    <LikeCommentContainer>
                        <Interaction>
                            <LikeIcon name="thumbs-up"/>
                            <InteractionTextHighlight>324</InteractionTextHighlight>
                        </Interaction>
                        <Interaction>
                            <CommentIcon name="message-square"/>
                            <InteractionText>12</InteractionText>
                        </Interaction>
                    </LikeCommentContainer>
                    <Interaction><ShareIcon name="share"/></Interaction>
                </InteractionRow>
            </PostContainer>
        </View>
    );
}
