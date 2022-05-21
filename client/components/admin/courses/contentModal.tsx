import { ListItemIcon, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faFile } from "@fortawesome/free-solid-svg-icons";
import { Grid, Menu } from "@mui/material";
import { MouseEventHandler } from "react";

interface IContent {
  contentOpen: Element | ((element: Element) => Element) | null | undefined;
  openContent: boolean;
  handleContentClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  handleAddVideoOpen: MouseEventHandler<HTMLLIElement> | undefined;
  handleAddArticleOpen: MouseEventHandler<HTMLLIElement> | undefined;
}

const Content = (props: IContent) => {
  return (
    <Menu
      anchorEl={props.contentOpen}
      open={props.openContent}
      onClose={props.handleContentClose}
      onClick={props.handleContentClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Grid>
        <MenuItem sx={{ color: "black" }} onClick={props.handleAddVideoOpen}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faVideoCamera} />
          </ListItemIcon>
          Video
        </MenuItem>
        <MenuItem sx={{ color: "black" }} onClick={props.handleAddArticleOpen}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faFile} />
          </ListItemIcon>
          Article
        </MenuItem>
      </Grid>
    </Menu>
  );
};

export default Content;
