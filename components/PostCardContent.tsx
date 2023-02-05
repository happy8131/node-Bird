import Link from "next/link";

const PostCardContent = ({ postData }) => {
  console.log(postData);
  return (
    <div>
      {postData
        .toString()
        .split(/(#[^\s#]+)/g)
        .map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link key={i} href={`/hashtag/${v.slice(1)}`}>
                {v}
              </Link>
            );
          }
          return v;
        })}
    </div>
  );
};

export default PostCardContent;
