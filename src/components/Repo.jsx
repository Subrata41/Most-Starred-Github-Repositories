// Importing React and other necessary dependencies
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  withStyles,
  Typography,
  ButtonBase,
  Paper,
  Grid,
  Chip,
  Link,
} from "@material-ui/core";

// Define the styles used in the component
const styles = (theme) => ({
  root: {
    maxWidth: "800px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    padding: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  chip: {
    margin: theme.spacing.unit,
  },
  link: {
    margin: theme.spacing.unit,
    textDecoration: "none",
  },
  submittedText: {
    color: theme.palette.text.primary,
  },

  // Responsive styles using breakpoints
  "@media (max-width: 600px)": {
    image: {
      width: 64,
      height: 64,
    },
  },

  "@media (max-width: 960px)": {
    image: {
      width: 96,
      height: 96,
    },
  },
});

// Define the functional component 'Repo'
const Repo = ({
  classes,
  avatar_url,
  name,
  html_url,
  owner,
  description,
  stargazers_count,
  open_issues_count,
  created_at,
}) => {
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {/* Avatar Image */}
          <Grid item xs={12} sm={4} md={2}>
            <ButtonBase className={classes.image} style={{ padding: "8px" }}>
              {/* Link to the owner's GitHub profile */}
              <a
                href={`https://github.com/${owner}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Image tag for the owner's avatar */}
                <img
                  className={classes.img}
                  alt="Owner Avatar"
                  src={avatar_url}
                />
              </a>
            </ButtonBase>
          </Grid>

          {/* Repo Information */}
          <Grid
            item
            xs={12}
            sm={8}
            md={10}
            style={{ paddingLeft: "30px" }}
            container
            direction="column"
          >
            <Grid item xs>
              {/* Repository name with a link to the GitHub repository */}
              <Typography gutterBottom variant="h5">
                <Link
                  href={html_url}
                  color="inherit"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  className={classes.link}
                >
                  {name}
                </Link>
              </Typography>
              {/* Description of the repository */}
              <Typography variant="body1">{description}</Typography>
              {/* Chip displaying the number of stars */}
              <Chip
                label={`Stars: ${stargazers_count}`}
                className={classes.chip}
                href="#chip"
                clickable
                variant="outlined"
              />
              {/* Chip displaying the number of open issues */}
              <Chip
                label={`Issues: ${open_issues_count}`}
                className={classes.chip}
                clickable
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              {/* Text indicating when the repository was submitted and by whom */}
              <Typography
                className={classes.submittedText}
                style={{ color: "blue" }}
              >
                Submitted {moment(created_at).fromNow()} by {owner}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

// Define the expected prop types for the component
Repo.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Apply the specified styles to the component using the 'withStyles' higher-order component
export default withStyles(styles)(Repo);
