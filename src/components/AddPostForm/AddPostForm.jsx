import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function AddPostForm({ addPost }) {
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState("");

  function handleInput(e) {
    setCaption(e.target.value);
  }

  function handleFileInput(e) {
    setPhoto(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Are we sending over a file? Yes, so what format should the data be in? formData
    // Preparing the data to be send to the server by a fetch request (POST)
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("photo", photo);
    // ======================================
    // Make the Api call, addPost is a prop from the feedPage
    // that makes the fetch request
    addPost(formData);
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInput}
          placeholder="What's on your pups mind?"
          value={caption}
        />
        <Form.Input onChange={handleFileInput} type="file" />
        <Button type="submit">Add Puppy</Button>
      </Form>
    </Segment>
  );
}
