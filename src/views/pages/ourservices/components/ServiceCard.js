import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { Fade } from "react-reveal";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
    maxHeight: 400,
    minHeight: 400,
    overflowY: "scroll",
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
});

export default function ServiceCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Fade>
        <Card className={classes.root}>
          <CardActionArea
            onClick={() =>
              history.push("/services/explore/service/" + props.id)
            }
          >
            <CardMedia
              className={classes.media}
              //   image={"https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"}
              image={props.image}
              title={`Social service ${props.id}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() =>
                history.push("/services/explore/service/" + props.id)
              }
            >
              View in details...
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </div>
  );
}
