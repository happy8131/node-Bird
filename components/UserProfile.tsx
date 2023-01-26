import { Avatar, Button, Card } from "antd";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <div>
      <Card
        actions={[
          <div key="1">
            짹짹
            <br />0
          </div>,
          <div key="2">
            팔로잉
            <br />0
          </div>,
          <div key="3">
            팔로우
            <br />0
          </div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogOut} loading={isLoggingOut}>
          로그아웃
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
