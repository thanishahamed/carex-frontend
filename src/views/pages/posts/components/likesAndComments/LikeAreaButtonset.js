import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import { CBadge } from "@coreui/react";
import {
  FacebookShareButton,
  TelegramShareButton,
  ViberShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  SentimentSatisfiedOutlined,
  ViewAgenda,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import Authenticate from "src/Authenticate";

export default function LikeAreaButtonset(props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user);
  const [info, setInfo] = useState({ liked: [], likes: [] });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleLike = () => {
    setLiked(!liked);

    axios
      .post(
        process.env.REACT_APP_SERVER + "/like",
        { user_id: user.data.id, post_id: props.id },
        Authenticate.header()
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
      });

    if (liked) {
      setLikeCount((prev) => (prev - 1 < 0 ? 0 : prev - 1));
    } else {
      setLikeCount((prev) => prev + 1);
    }
  };

  const incrementShares = (src) => {
    axios
      .post(
        process.env.REACT_APP_SERVER + "/shared",
        { post_id: props.id, sharedTo: src },
        Authenticate.header()
      )
      .then((response) => {
        loadInfo();
      })
      .catch((error) => console.log(error.response));
  };
  // useEffect(() => {
  //   loadInfo();
  // }, []);

  useEffect(() => {
    loadInfo();
  }, [props.loadComments]);

  const loadInfo = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/post/" + props.id, {
        user_id: user.data.id,
      })
      .then((response) => {
        // console.log("Like area buttons ", response.data);
        setInfo(response.data);
        if (response.data.liked.length > 0) {
          setLiked(true);
          setLikeCount(response.data.likes.length);
        } else {
          setLiked(false);
          setLikeCount(response.data.likes.length);
        }

        setCommentCount(response.data.comments.length);
        setShareCount(response.data.shares.length);
        setViewCount(response.data.views.length);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <div className="button-sets">
        <div>
          <IconButton onClick={toggleLike}>
            <FavoriteIcon style={{ color: liked ? "red" : "" }} />
          </IconButton>
          <CBadge color="danger"> {likeCount} Likes</CBadge>
        </div>

        <div>
          <IconButton onClick={() => ""}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <CBadge color="info"> {commentCount} Comments</CBadge>
        </div>

        <div>
          <IconButton onClick={handleClick}>
            <ShareIcon style={{ color: liked ? "green" : "" }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* <MenuItem onClick={()=>alert(process.env.REACT_APP_FRONT_END)}><FacebookIcon style = {{color: '#0175C5'}}/></MenuItem> */}
            <MenuItem>
              <FacebookShareButton
                url={`http://facebook.com/services/explore/service/${props.id}`}
                // url={`${process.env.REACT_APP_FRONT_END}services/explore/service/${props.id}`}
                quote={props.title + "\n\n" + props.body}
                hashtag={"#" + props.type}
              >
                <FacebookIcon
                  round
                  size={28}
                  onClick={() => incrementShares("facebook")}
                />
              </FacebookShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <EmailShareButton
                subject={props.title}
                url={
                  "\n\n" +
                  process.env.REACT_APP_FRONT_END +
                  "/services/explore/service/" +
                  props.id
                }
                body={props.body}
                separator={"\n\n" + props.body}
              >
                <EmailIcon
                  round
                  size={28}
                  onClick={() => incrementShares("email")}
                />
              </EmailShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TwitterShareButton
                url={
                  process.env.REACT_APP_FRONT_END +
                  "/services/explore/service/" +
                  props.id +
                  "\n"
                }
                title={props.title + "\n" + props.body + "\n"}
                via={"CareX_Social_Service_Community"}
                hashtags={["scholarships"]}
                related={["Social Service", "Donations", "Charity"]}
              >
                <TwitterIcon
                  round
                  size={28}
                  onClick={() => incrementShares("twitter")}
                />
              </TwitterShareButton>
            </MenuItem>
            <MenuItem>
              <WhatsappShareButton
                url={
                  process.env.REACT_APP_FRONT_END +
                  "/services/explore/service/" +
                  props.id
                }
                // url={`${process.env.REACT_APP_FRONT_END}services/explore/service/${props.id}`}
                separator={props.body + "\n\n"}
                title={"*" + props.title + "*\n"}
              >
                <WhatsappIcon
                  round
                  size={28}
                  onClick={() => incrementShares("whatsapp")}
                />
              </WhatsappShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TelegramShareButton
                url={
                  process.env.REACT_APP_FRONT_END +
                  "/services/explore/service/" +
                  props.id
                }
                title={"\n" + props.title + "\n" + props.body}
              >
                <TelegramIcon
                  round
                  size={28}
                  onClick={() => incrementShares("telegram")}
                />
              </TelegramShareButton>
            </MenuItem>
          </Menu>
          <CBadge color="light"> {shareCount} Shares</CBadge>
        </div>
        <div style={{ textAlign: "center", marginRight: 20 }}>
          <Visibility /> {viewCount}
        </div>
      </div>
    </div>
  );
}
