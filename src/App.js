import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, {Component} from "react";
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

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

class App extends Component {
  constructor (props) {
    super(props);
    this.state ={
      urlInput: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({urlInput: e.target.value})
  }

  onButtonSubmit = (url) => {
    
  }

  particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  particlesLoaded = (container) => {
    console.log(container);
  };

  render () {
    return (
      <div>
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
        url={this.state.urlInput} 
        handleInputChange={this.handleInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
        {/* <FaceDetector /> */}
      </div>
        
      </div>
    )
  }
}

export default App;
