import React, { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "./Firebase";
import { login, logout } from "./features/userSlice";
import styled from "styled-components";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(({ user }) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            userID: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  };
  const boolean = false;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            userID: user.uid,
          })
        );
      }
    });
  }, [boolean]);

  //Sign up & In activity

  const [signUpOrIn, setSign] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = auth.currentUser;
      return user.updateProfile({
        displayName: userName,
        photoURL:
          "https://th.bing.com/th/id/R96ae0c688d999220fbf950000c776cee?rik=t%2fZbLsYAuNKeyQ&riu=http%3a%2f%2fimage.superstreetonline.com%2ff%2f248898692%2bw660%2bh440%2bq80%2bre0%2bcr1%2bar0%2f2019-mercedes-amg-g63-front-three-quarter-homepage.jpg&ehk=uPVre4z1yM7u8F3ubwG0%2bHdvnSqfYUQYQEAc3rQQYPg%3d&risl=&pid=ImgRaw",
      });
    });
  };
  const signInE = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
    });
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Apps>
            {user ? (
              <HomeScreen />
            ) : signUpOrIn ? (
              <div className="loginPage">
                <h1>Sign Up</h1>
                <form>
                  <label>Name</label>
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Name"
                  />
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                  <label>password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <button onClick={signUp}>Sign up</button>
                </form>
                <button onClick={() => setSign(!signUpOrIn)}>
                  {signUpOrIn
                    ? "Already have an account?, Sign in here."
                    : "Don't have an account, Sign Up here"}
                </button>
                <button className="signInWithGoogle" onClick={signInWithGoogle}>
                  Or Sign In with google
                </button>
              </div>
            ) : (
              <div className="loginPage">
                <h1>Sign In</h1>
                <form>
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                  <label>password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  <button onClick={signInE}>Sign In</button>
                </form>
                <button onClick={() => setSign(!signUpOrIn)}>
                  {signUpOrIn
                    ? "Already have an account?, Sign in here."
                    : "Don't have an account, Sign Up here"}
                </button>
                <button className="signInWithGoogle" onClick={signInWithGoogle}>
                  Or Sign In with google
                </button>
              </div>
            )}
          </Apps>
        </Route>
        <Route />
      </Switch>
    </Router>
  );
};
export default App;

const Apps = styled.div`
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20rem;
    form {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      button {
        margin-top: 1rem;
      }
    }
    .signInWithGoogle {
      margin-top: 1rem;
    }
  }
`;
