import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Card, Popover, Button, Avatar, List } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post";
import CommentForm from "./CommentForm";
import FollowButton from "./FollowButton";
import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading, retweetError } = useSelector(
    (state) => state.post
  );
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me?.id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  // console.log(post.Comments);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }

    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);
  const liked = post?.Likers.find((v) => v.id === id);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post?.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User?.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post?.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다` : null
        }
        extra={id && <FollowButton post={post} />}
      >
        {post?.RetweetId && post.Retweet ? (
          <Card
            cover={
              post?.Retweet?.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              avatar={<Avatar>{post.Retweet.User?.nickname[0]}</Avatar>}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={<Avatar>{post.User?.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            style={{ margin: 0 }}
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<div>{item.User.nickname}</div>}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
