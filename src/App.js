import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Image from "./components/Image/Image";
import Rank from "./components/Rank/Rank";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';


const param = {
  particles: {
    number:{
      value:70,
      density:{
        enable:'true',
        value_area:600
      }
    }                  
  }
}

const intialState = {
  input:'',
  imageURL:'',
  box:{},
  route: 'signin',
  isSignIn: false,
  user: {
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
}

class App extends React.Component {
  constructor(){
    super()
    this.state = intialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name:data.name,
      email: data.email,
      entries:data.entries,
      joined: data.joined
    }})
  }

  calculateLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box

    const image = document.getElementById("inputi");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({box: box})
  }

  onInpChange = (event) => {
   this.setState({input: event.target.value})
  }

  onSubmit = () => {
    
    this.setState({
      imageURL: this.state.input
    })
    fetch("https://face-detector-api-shubh.herokuapp.com/imageurl", {
      method:"post",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    }).then(response => response.json())
 
    .then(response => {
        if(response){
          fetch("https://face-detector-api-shubh.herokuapp.com/image", {
            method:"put",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        }).then(response => response.json())
        .then(entries => {
          this.setState(Object.assign(this.state.user, {entries: entries}))
        })
        .catch(console.log)
        }
        this.displayBox(this.calculateLocation(response))
    })
    .catch(err => console.log(err)); 
      
  }

  onRouteChange = (route) => {

    if(route === 'signout'){
      this.setState(intialState)
    }
    else if (route === 'home'){
      this.setState({isSignIn: true})
    }

    this.setState({route : route})
  }

  render(){
    return (
      <div className="App">
        <Particles className="particle" params={param} />
        <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange}/>
        
        {   this.state.route === 'home' ? 
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <Image onInpChange={this.onInpChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
          </div> 
          : (
            this.state.route === 'signin' ? <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

          )

        }


      </div>
    );

  }

}

export default App;
