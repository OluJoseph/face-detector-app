//dependencies
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, {Component} from "react";
import Clarifai from 'clarifai';
//components
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetector from './components/FaceDetector/FaceDetector';


//create API Object
const app = new Clarifai.App({
  apiKey: '1332d555d77c412fa68876989de7ea02'
})

//options to configure the particles.js behaviour
const particlesOptions = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 140,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1000,
      },
      value: 80,
    },
    opacity: {
      value: 0.1,
    },
    shape: {
      type: "square",
    },
    size: {
      value: { min: 1, max: 2 },
    },
  },
  detectRetina: true,
}

//App class that contains all the components
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      urlInput: '',
      box: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  //function to set the state of the current image url on input change
  handleInputChange = (e) => {
    this.setState({urlInput: e.target.value})
  }

  //calculate the border locations of the detector Box
  calculateFaceLocation = (data) => {
    const loc = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: loc.left_col * width,
      rightCol: width - (loc.right_col * width),
      topRow: loc.top_row * height,
      bottomRow: height - (loc.bottom_row * height)
    }
  }

  //set the state of the box location to the calculated result
  setBox = (box) => {
    this.setState({box})
  }

  //function handles the data submitted
  onButtonSubmit = (e) => {
    e.preventDefault();

    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.urlInput)
      .then(response => this.calculateFaceLocation(response))
      .then(boxLocation => this.setBox(boxLocation))
      .catch(err => console.log(err))
  }

  particlesInit = async (main) => {
    await loadFull(main);
    return;
  };

  particlesLoaded = (container) => {
    return;
  };

  render () {
    return (
      <div className="app pb5">
        <Particles
          className="particles"
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          params={particlesOptions}
        />

        <Navigation />

        <Rank />

        <div className="inputOutput">
          <ImageLinkForm
          handleInputChange={this.handleInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>

          {this.state.urlInput && <FaceDetector box={this.state.box} imageSrc={this.state.urlInput}/>}
        </div>
        
      </div>
    )
  }
}

export default App;
