import { useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";

interface IMedia {
  type: string;
}

interface IMediaNav {
  medias: IMedia[];
}

const MediaNav = (props: IMediaNav) => {
  const [media] = useState(props.medias);

  const mediaTypes: any[] = [];
  for (let i = 0; i < media.length; i++) {
    if (!mediaTypes.includes(media[i].type)) {
      mediaTypes.push(media[i].type);
    }
  }

  const mediaPageLinks = mediaTypes.map((media: string) => {
    return (
      <Link passHref key={media} href={`/media/${media}`}>
        <h1 className="main-title pointer">{media}</h1>
      </Link>
    );
  });

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {mediaPageLinks}
    </Grid>
  );
};

export default MediaNav;
