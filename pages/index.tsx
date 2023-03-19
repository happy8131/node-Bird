import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AppLayout from "../components/AppLayout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading, retweetError } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        if (hasMorePosts && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {me ? <PostForm /> : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch({
        type: LOAD_POSTS_REQUEST,
      });

      // REQUEST 가 saga 에서 SUCCESS 될 때까지 기다려준다
      store.dispatch(END);
      await store.sagaTask?.toPromise();
    }
);

export default Home;
