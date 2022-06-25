import { Grid } from "@mui/material";
import Link from "next/link";

interface IMediaNav {
  mediaCategories: string;
}

//Media navigation menu functional component
const MediaNav = (props: IMediaNav) => {
  //Create a array of the different media types provided
  const mediaTypes: string[] = [];
  for (let i = 0; i < props.mediaCategories.length; i++) {
    if (!mediaTypes.includes(props.mediaCategories)) {
      mediaTypes.push(props.mediaCategories);
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
