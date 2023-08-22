import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useCookies } from 'react-cookie';
import { BASE_URL } from "../../helper";
import "./UpdateForm.css"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ClassicForm() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const[cookies,_]=useCookies("[access_token]");
  const handleChange = (event) => {
    setData((pastApp) => {
      return {
        ...pastApp,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    //const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const owner=window.localStorage.getItem("userid");
    
    const response = await axios.post(`${BASE_URL}/posts/`, {
      title: data.title,
      post: data.post,
      author: owner,
      owner:owner,
    },{
      headers: { authorization: cookies.access_token },
    });
    alert(response.data.author+" Successfully Posted");
    //if response status is 200 then navigate
    if (response.status == 201) {
      navigate("/home");
    }
  };
  const handleCancel=()=>{
    window.localStorage.removeItem("postId");
    navigate("/home");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="container">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Create a Post
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  value={data.username}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="Title"
                  autoFocus
                  
                />
              </Grid>

              <Grid item xs={12}>
                <TextareaAutosize
                  required
                  id="post"
                  name="post"
                  label="Description"
                  autoFocus
                  minLength={101}
                  minRows={8}
                  onChange={handleChange}
                  value={data.post}
                  className="post-box"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
            <Button variant="contained" fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
