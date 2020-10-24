import React, { Component } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./Components/Rank/Rank.js";
import SignIn from "./Components/SignIn/SignIn.js";
import Register from "./Components/Register/Register.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js";
import Background from "./Components/Background/Background.js";

import AOS from "aos";
import "aos/dist/aos.css";
import swal from "sweetalert";

const initialState = {
  showFace: false,
  background: "rgb(211, 211, 211)",
  input: "",
  imageUrl: "",
  boxes: [],
  route: "SignIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor(color) {
    super();
    this.state = initialState;
  }

  listenScrollEvent = (event) => {
    if (window.scrollY > 750) {
      this.setState({ background: "rgb(75, 134, 180)" });
    } else {
      this.setState({ background: "lightgrey" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      once: true,
    });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFaces.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    let format = ["jpeg", "png", "jpg"];
    let extension = format.some((array) => this.state.input.includes(array));
    if (this.state.input.length !== 0 && extension) {
      this.setState({ imageUrl: this.state.input });
      fetch("https://calm-mountain-29448.herokuapp.com/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            fetch("https://calm-mountain-29448.herokuapp.com/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              })
              .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        }) /* once we get a response, we calculate the inner f(x), and then dispalyFaceBox */
        .catch((err) => {
          console.log(err);
        });
    } else {
      swal("Ooops!", "Accepting (jpeg, png, jpg) formats");
    }
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  handleFace = () => {
    this.setState({ showFace: false });
  };

  onClickChange = () => {
    this.setState({ showFace: true });
  };

  handleClick = (event) => {
    this.onClickChange();
    this.onButtonSubmit();
  };

  render() {
    return (
      <div className="App">
        <Navigation
          className="nav"
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div className="content">
            <div className="Background">
              <Background />
            </div>
            <div className="user">
              <div
                className="backgroundsquare"
                style={{ background: this.state.background }}
              ></div>
              <div className="f5">
                <p className="description" data-aos="fade-right">
                  Detect the presence and location of human faces. Upload the
                  image url below
                </p>
              </div>
            </div>
            <div class="option-row">
              <input
                className="option-input"
                checked
                id="option-1"
                type="radio"
                name="options"
                onClick={this.handleFace}
              />
              <label className="option" for="option-1">
                <span className="option__label">
                  <Rank
                    className="rank"
                    name={this.state.user.name}
                    entries={this.state.user.entries}
                  />
                  <sub>
                    <ImageLinkForm
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}
                    />
                  </sub>
                  <div className="button">
                    <button
                      id="btn"
                      className="w-40 f4 link pv2 dib black center"
                      onClick={this.handleClick}
                    >
                      locate
                    </button>
                  </div>
                </span>
              </label>
              {this.state.showFace ? (
                <input
                  className="option-input"
                  checked
                  id="option-2"
                  type="radio"
                  name="options"
                />
              ) : null}
              <label className="option" for="option-2">
                <span className="option__label">
                  <FaceRecognition
                    boxes={this.state.boxes}
                    imageUrl={this.state.imageUrl}
                  />
                </span>
              </label>
            </div>
          </div>
        ) : this.state.route === "SignIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
