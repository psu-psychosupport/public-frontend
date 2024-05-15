import React from "react";
import { Typography } from "@mui/material";
import { IPost } from "~/api/types/content";
import getPostName from "~/utils/getPostName";
import { Link } from "@remix-run/react";

export default function PopularQuestions({ posts }: { posts: IPost[] }) {
  return (
    <React.Fragment>
      <Typography variant="h4" color={"#303044"} mt={4}>
        Популярные вопросы
      </Typography>
      <div className="containerQuestion">
        {posts &&
          posts.map((post) => (
            <Link
              className="itemQuestion"
              to={`/post/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={post.id}
            >
              <p style={{ color: "#496CC6", fontSize: 18 }}>
                {getPostName(post)}
              </p>
            </Link>
          ))}
      </div>
    </React.Fragment>
  );
}
