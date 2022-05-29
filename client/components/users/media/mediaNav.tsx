import { useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";

//Media navidcation props interface
interface IMedia {
  type: string;
}
interface IMediaNav {
  medias: IMedia[];
}

//Media navigation menu functional component
const MediaNav = (props: IMediaNav) => {
  // Media navication state
  const [media] = useState(props.medias);

  //Create a array of the different media types provided
  const mediaTypes: any[] = [];
  for (let i = 0; i < media.length; i++) {
    if (!mediaTypes.includes(media[i].type)) {
      mediaTypes.push(media[i].type);
    }
  }

  //Create a link for each media type provided
  const mediaPageLinks = mediaTypes.map((media: string) => {
    return (
      <Link passHref key={media} href={`/media/${media}`}>
        <h1 className="main-title pointer">{media}</h1>
      </Link>
    );
  });

  //Media Navigation component
  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {/* Display the list of media links */}
      {mediaPageLinks}
    </Grid>
  );
};

export default MediaNav;
