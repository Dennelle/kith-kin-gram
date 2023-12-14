import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PageHeader from "../../components/Header/Header";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";

import { Grid } from "semantic-ui-react";

import tokenService from "../../utils/tokenService";

export default function ProfilePage({ loggedUser, handleLogout }) {
  const [profileUser, setProfileUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // username comes from the route in app.js
  //   <Route path='/:username' element={<ProfilePage />} />
  const { username } = useParams(); // useParams is from react-router-dom

  async function getProfile() {
    try {
      //What is my http request? /api/users/someUserName
      // username comes from the params, What is in the url on browser!

      // Before you make the request, setLoading to True!
      setLoading(true);

      const responseFromTheServer = await fetch(`/api/users/${username}`, {
        method: "GET",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      // This checks to see if the status is not in the 200's
      // ok comes from fetch(log out response to look at the object)
      if (!responseFromTheServer.ok) setErrorMessage("Profile does not exist");
      console.log(responseFromTheServer);
      const data = await responseFromTheServer.json();
      // THE API CALL TO SERVER IS FINISHED!
      console.log(data);

      // after teh request setLoading to false
      setLoading(false);
      setProfileUser(data.user);
      setPosts(data.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrorMessage("Profile does not exist");
    }
  }

  async function removeLike(likeId) {
    try {
      const responseFromTheServer = await fetch(`/api/likes/${likeId}`, {
        method: "DELETE",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await responseFromTheServer.json(); // <- taking the json from server
      // and turning into a regular object
      getProfile(); // < call getProfile to get the updated posts from the server, this updates states
      // so we can see our like
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  // (C)RUD (like) likes are emebedded in a post
  async function addLike(postId) {
    try {
      const responseFromTheServer = await fetch(`/api/posts/${postId}/likes`, {
        method: "POST",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await responseFromTheServer.json(); // <- taking the json from server
      // and turning into a regular object
      console.log(data);
      getProfile(); // < call getProfile to get the updated posts from the server, this updates states
      // so we can see our like
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(username);

    getProfile();
  }, [username]); // anytime the params changes run the useEffect

  if (errorMessage) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <h1>{errorMessage}</h1>
      </>
    );
  }

  // Only render the loading, on Component  load
  if (!posts.length && loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostFeed
            itemsPerRow={3}
            posts={posts}
            isProfile={true}
            loggedUser={loggedUser}
            addLike={addLike}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
