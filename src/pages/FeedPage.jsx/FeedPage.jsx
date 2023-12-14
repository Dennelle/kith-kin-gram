import { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";

import { Grid } from "semantic-ui-react";

import tokenService from "../../utils/tokenService";

export default function FeedPage({ loggedUser, handleLogout }) {
  const [posts, setPosts] = useState([]);

  // Every Http Request to CRUD the posts resource,
  // will be defined here, because when we get the response
  // from the server we can easily update the posts state,
  // to reflect change in our database, in our view

  // When the user is on the feedpage they should be able to see all the posts from the db
  useEffect(() => {
    // This useEffect is called when the page loads

    // Don't forget to call the function
    getPosts();
  }, []);

  // C(R)UD
  async function getPosts() {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
      // CHECK THE DATA then update state!
      console.log(data);
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  }

  // CRU(D) (like) likes are embedded in a post
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
      getPosts(); // < call getPOsts to get the updated posts from the server, this updates states
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
      getPosts(); // < call getPOsts to get the updated posts from the server, this updates states
      // so we can see our like
    } catch (err) {
      console.log(err);
    }
  }

  // (C)RUD Http request to the server
  async function addPost(formData) {
    try {
      // HTTP REQUEST IS GOING TO THE SERVER
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        },
      });

      const data = await response.json();
      // ====================================================
      // The HTTP cycle has been completed
      // and we have a parsed response from the server (data)
      console.log(data, " <- response data from the server");

      // Now we can update the state!
      setPosts([data.post, ...posts]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPostForm addPost={addPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostFeed
            posts={posts}
            itemsPerRow={1}
            isProfile={false}
            loggedUser={loggedUser}
            removeLike={removeLike}
            addLike={addLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

// On the FeedPage the user can fill out a form in order to create
// a Post (puppy)

// What is my http request?

// - Post Request to the server

// . Client? making the request
// Where and when do I want to make the request	// --
//   1. making the request
//      a. Where do I define the Fetch call? (what component)
// b. When do I call the fetch call? What does the user do? (what component)
//   2. // AFTER THE RESPONSE FROM SERVER! then doing somehting with the response from the server
//a. probably update state, to change ui to reflect the action you performed.
// b.  What props need to passed or what props are changing when you update state

// Server (processing the request ) and handling response
// What is the full address of the route the request is looking for
// addPuppy request -> /api/users/ POST router.post('/' , postCtrl.create) //< full path /api/posts/
// make a response

// What logic does my controller need to do?
// do I need to talk to aws to store a photo?
// yes?
// I need multer setup, and s3 code setup in my ctrl function
// Perform some crud operation on the database using the Model
// respond to the client with json
// NO
// Perform some crud operation on the database using the Model
// respond to the client with json

// User story - On the feedpage I want to see all of the posts!
// What http request must be made?
// 1. GET request?  TO where on the server?
// Where do we want to  define the fetch call that will make the http request? What componet?
// 1.  In the FeedPage
//    When do went to fetch call called?
// 1. (User thinking)When the user goes to feed page ( React thinking - When the component loads!)
//  How do a call function the when page loads? useEffect hook must be used!
// YOU HAVE TO DO ALL THE SERVER STUFF TO TEST THIS NOW ^

//   2. // AFTER THE RESPONSE FROM SERVER! then doing somehting with the response from the server
//a. probably update state, to change ui to reflect the action you performed.
// 1. update the posts state, maybe implement the loading idea we talked about before

// IF YOU WANT YOU CAN TEST THIS PART RIGHT NOW, BECAUSE after you create a post, yoou have one post
// in your posts array
// b.  What props need to passed or what props are changing when you update state (What component)
// must pass the posts state as a prop
// it will go to the PostFeed componet then each post will go to the PostCardComponent
