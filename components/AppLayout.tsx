import { Menu, Input, Row, Col } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

interface Props {
  children: string;
}

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
.ant-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ant-col:first-child{
  padding-left:0 !important;
}

.ant-col:last-child{
  padding-rightt:0 !important;
}

`;

const AppLayout = ({ children }: Props) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="item">
          <Link href="/">노드버드</Link>
        </Menu.Item>
        <Menu.Item key="item2">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="item3">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="item4">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by eroCho
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
