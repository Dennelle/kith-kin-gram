// ==== hooks =====
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ===== components ======
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";

export default function SignUpPage() {
  const [state, setState] = useState({
    username: "",
    password: "",
    passwordConf: "",
    familybio: "",
  });

  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  //navigate the user to a different route
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    for (let key in state) {
      formData.append(key, state[key]);
    }

    try {
      await userService.signup(formData);
      handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError("Try signing up again");
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    console.log(e.target.files);
    setPhoto(e.target.files[0]);
  }

  return (
    <>
      <Header>
        <Image src="https://i.imgur.com/lL3fL1C.png" /> Sign Up
      </Header>
      <form autocomplete="off" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="username"
          value={state.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <input
          name="passwordConf"
          type="password"
          placeholder="confirm password"
          value={state.passwordConf}
          onChange={handleChange}
          required
        />
        <textarea
          name="familybio"
          type="familybio"
          placeholder="Tell us about your family"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          placeholder="upload a family photo"
          onChange={handleFileInput}
        />
        <Button type="submit" className="button">
          Signup
        </Button>
        {error ? <ErrorMessage error={error} /> : null}
      </form>
    </>
  );
}
