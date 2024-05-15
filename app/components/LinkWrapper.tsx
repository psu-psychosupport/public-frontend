import { ICategory, ISubCategory } from "~/api/types/content";
import React from "react";
import { Link } from "@remix-run/react";

export const LinkWrapper = ({
  category,
  subcategory,
  children,
}: {
  category?: ICategory;
  subcategory?: ISubCategory;
  children: React.ReactNode;
}) => {
  let postId: number;

  if (category) {
    if (category.subcategories && category.subcategories.length)
      return children;
    postId = category!.post!.id;
  }

  if (subcategory) {
    postId = subcategory.post.id;
  }

  return (
    <Link
      style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      to={`/posts/${postId}`}
    >
      {children}
    </Link>
  );
};
