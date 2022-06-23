import { useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";

interface IMedia {
  mediaCategories: string[];
  mediaPosts: {
    id: string;
    type: string;
    title: string;
    imageBuffer: string;
  }[];
  cartQty: number;
}

//Media navigation menu functional component
const MediaNav = (props: IMedia) => {
  //Create a array of the different media types provided
  const mediaTypes: string[] = [];
  for (let i = 0; i < props.mediaCategories.length; i++) {
    if (!mediaTypes.includes(props.mediaPosts[i].type)) {
      mediaTypes.push(props.mediaPosts[i].type);
    }
  }

  //Creates a link for each media type provided
  const mediaPageLinks = mediaTypes.map((media: string) => {
    return (
      <Link passHref key={media} href={`/media/${media}`}>
        <h1 className="main-title pointer">{media}</h1>
      </Link>
    );
  });

  //Media navigation component
  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {/* Display the list of media links */}
      {mediaPageLinks}
    </Grid>
  );
};

export default MediaNav;
