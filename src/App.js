//dependencies
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, {Component} from "react";

//components
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetector from './components/FaceDetector/FaceDetector';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



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
      opacity: 0.08,
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
      speed: 0.8,
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
      boxes: [],
      route: 'sign in',
      user: {}
    };

    //BINDS THIS TO THE CLASS SO CALLBACKS FUNCTION PROPERLY
    this.handleInputChange = this.handleInputChange.bind(this);
    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  //function to set the state of the current image url on input change
  handleInputChange = (e) => {
    this.setState({urlInput: e.target.value})
    this.setBoxes([]);
  }

  //calculate the border locations of the detector Box
  calculateFaceLocation = (data) => {
    const regionData = data.outputs[0].data.regions; //this assigns an array of face location objects with unique bounding boxes
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    //using an array map function to calculate the location for each bounding box
    const locations = regionData.map(data => {
      const loc = (data.region_info.bounding_box)
      return {
        leftCol: loc.left_col * width,
        rightCol: width - (loc.right_col * width),
        topRow: loc.top_row * height,
        bottomRow: height - (loc.bottom_row * height)
      }
    })

    return locations; //RETURNS ALL LOCATION BOX OBJECT AS AN ARRAY
  }

  //set the state of the box location to the calculated result
  setBoxes = (boxes) => {
    this.setState({boxes})
  }

  //function handles the data submitted
  onImageLoad = (e) => {
    e.preventDefault();

      fetch('https://serene-beyond-02376.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.urlInput
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://serene-beyond-02376.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(resp => resp.json())
          .then(data => {
            this.setState({user: data}) //UPDATES THE WHOLE USER OBJECT BUT ONLY AFFECTS THE ENTRIES (ITS HOW REACT WORKS)
          })
        }
        return this.calculateFaceLocation(response)
      }) //this function should return an array of bounding-box locations
      .then(boxLocations => this.setBoxes(boxLocations)) //this function should update the "boxes" state to a new array for each unique image URL
      .catch(err => console.log(err, 'no boxes'))
  }

  onRouteChange = (route) => {
    this.setState({route})
  }

  getUser = (user) => {
    this.setState({
      user: user,
      urlInput: '' //THE IMAGE IS CLEARED EVERYTIME A NEW USER SIGNS IN TO PREVENT SHOWING INITIAL STATES
    })//COULD'VE ALSO CLEARED THE IMAGE WHEN A USER SIGNS OUT, STILL WORKS
  }

  particlesInit = async (main) => {
    await loadFull(main);
    return;
  };

  particlesLoaded = (container) => {
    return;
  };

  render () {
    const {name, email, entries, joined} = this.state.user;
    return (
      <div className="app pb5">
        <Particles
          className="particles"
          id="tsparticles"
          init={this.particlesInit}
          loaded={this.particlesLoaded}
          params={particlesOptions}
        />
        {
          (() => {
            switch (this.state.route) { //RETURNS DIFFERENT COMPONENTS BASED ON CURRENT ROUTE CHANGE
              case 'sign in' :
                return <SignIn onRouteChange={this.onRouteChange} getUser={this.getUser}/>
              case 'home' :
                return (
                  <div>
                    <Navigation onRouteChange={this.onRouteChange}/>

                    <Rank name={name} entries={entries}/>

                    <div className="inputOutput">
                      <ImageLinkForm
                      handleInputChange={this.handleInputChange} 
                      />

                      {this.state.urlInput && <FaceDetector onImageLoad={this.onImageLoad} boxes={this.state.boxes} imageSrc={this.state.urlInput}/>}
                    </div>

                  </div>
                )
              case 'register':
                return (
                  <Register onRouteChange={this.onRouteChange}/>
                )
              
            }
          })()
        }        
      </div>
    )
  }
}

export default App;
