import { CForm, CInput } from "@coreui/react";
import { CircularProgress, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import VoiceAssitant from "../../voiceRecognition/VoiceAssitant";

export default function SLNews() {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState("sri lanka");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setLoading(true);
    axios
      .get(
        "https://newsapi.org/v2/everything?q=" +
          searchField +
          "&apiKey=" +
          process.env.REACT_APP_NEWS_API
      )
      .then((response) => {
        const ordered = response.data.articles
          .sort((a, b) => {
            let now = moment(b.publishedAt);
            let posted = moment(a.publishedAt);
            return now.diff(posted);
          })
          .map((article) => article);
        setData(ordered);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    loadNews();
  };

  return (
    <div>
      <Fade>
        <h3 align="center"> Search News</h3>

        <CForm onSubmit={onClickSearch}>
          <div style={{ display: "flex" }}>
            <CInput onChange={(e) => setSearchField(e.target.value)} />
            <IconButton onClick={onClickSearch} size="small">
              {" "}
              <Search />{" "}
            </IconButton>
          </div>
        </CForm>
        <br />
        {loading ? (
          <center>
            <CircularProgress color="inherit" variant="indeterminate" />
          </center>
        ) : (
          data.map((article, id) => {
            return (
              <div
                key={id}
                style={{
                  background: "#F9F9F9",
                  padding: 4,
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <br />
                  <img
                    src={
                      article.urlToImage ||
                      "https://www.planstreetinc.com/wp-content/uploads/2021/01/social-work-case-management-guide.png"
                    }
                    alt="banner"
                    width={"100%"}
                  />{" "}
                  <br /> <br />
                  {article.title}
                  <br />{" "}
                  <small>
                    {" "}
                    {moment(article.publishedAt).format("LLL")} <br />
                    <a href={article.url} target="_blank">
                      Read more...
                    </a>
                  </small>
                </div>
              </div>
            );
          })
        )}
        <center> {data.length === 0 ? "No records" : ""} </center>
      </Fade>
    </div>
  );
}
