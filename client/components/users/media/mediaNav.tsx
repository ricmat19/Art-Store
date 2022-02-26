import { useState } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";

const MediaNav = (props: any) => {
  const [media] = useState(props.medias);

  const mediaTypes: any[] = [];
  for (let i = 0; i < media.length; i++) {
    if (!mediaTypes.includes(media[i].type)) {
      mediaTypes.push(media[i].type);
    }
  }

  const mediaPageLinks = mediaTypes.map((media: any) => {
    return (
      <Link passHref key={media} href={`/products/${media}`}>
        <h1 className="main-title pointer">{media}s</h1>
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
