import React from 'react';
import LoginScreen from './components/LoginScreen.js';
import AdminPanel from './components/AdminPanel.js';
import MainPage from './components/MainPage.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      error: '',
      name: '',
      email: '',
      target: '',
      master: false,
      participants: null,
      killSelectValue: "default",
      admins: [/*"kyle mumma", */"hussain aladwan"]
    }

    this.onSignIn = this.onSignIn.bind(this);
    this.onKillChange = this.onKillChange.bind(this);
    this.onKillSubmit = this.onKillSubmit.bind(this);
    this.resetTargets = this.resetTargets.bind(this);

    this.backendurl = "https://assassin-backend.glitch.me"
    this.apiKey = process.env.REACT_APP_API_KEY;
    this.clientId = process.env.REACT_APP_CLIENT_ID;
  }

  componentDidMount() {
    fetch(this.backendurl + `/participants?key=${this.apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          participants: myJson.participants
        });
      });
  } 

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const name = profile.getName().toLowerCase();
    const email = profile.getEmail();
    const emailSubdomain = email.substring(email.indexOf("@"));

    if(emailSubdomain !== "@apps.nsd.org"){ // not signed in with student email
      this.setState({
        error: 'non_nsd'
      })
    } else if(this.state.admins.includes(name)){ // master login
      fetch(this.backendurl + `/participants?name=${name}&key=${this.apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          loggedIn: true,
          error: '',
          name: name,
          target: myJson.target,
          email: email,
          master: true
        });
      });
    } else if(!this.isParticipant(name)){ //not a participant
      this.setState({
        error: 'non_participant'
      });
    } else { // normal logged in
      fetch(this.backendurl + `/participants?name=${name}&key=${this.apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          loggedIn: true,
          error: '',
          name: name,
          target: myJson.target,
          email: email,
          master: false
        });
      });
    }
  }

  onKillChange(event) {
    this.setState({
      killSelectValue: event.target.value
    });
  }

  onKillSubmit(event) {
    // kill POST request
    if(window.confirm("Are you sure you want to kill " + this.state.killSelectValue + "?")){
      const data = {
        name: this.state.killSelectValue,
        key: this.apiKey
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(this.backendurl + "/kill", options);
      alert(this.state.killSelectValue + " was successfully killed");
    }

    event.preventDefault();
  }

  isParticipant(name) {
    return this.state.participants.includes(name);
  }

  resetTargets() {
    if(window.confirm("Are you sure you want to reset the targets?")) {
      const data = {key: this.apiKey};
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(this.backendurl + "/reset", options);
      alert("targets were successfully reset");
    }
  }

  render() {
    //if logged in and no errors
    if(this.state.loggedIn && this.state.error === '' && !this.state.master){
      return <MainPage name={this.state.name} target={this.state.target} />;
    }

    //if master login
    if(this.state.master){
      return <AdminPanel onKillSubmit={this.onKillSubmit} onKillChange={this.onKillChange} 
      killSelectValue={this.state.killSelectValue} resetTargets={this.resetTargets}
      participants={this.state.participants} name={this.state.name} target={this.state.target} />;
    }

    //if not logged in or error
    let errorMessage = null;
    if(this.state.error === 'non_nsd'){
      errorMessage = "Error: You must log in with your apps.nsd.org student email"
    } else if(this.state.error === 'non_participant'){
      errorMessage = <div>Error: You are not registered for Senior Assassin,
        if this is an error please contact Jaguar Senior Assassin on instagram 
        <a href='https://www.instagram.com/jaguarseniorassassin/'>@jaguarseniorassassin</a></div>;
    }

    // login screen
    return <LoginScreen errorMessage={errorMessage} onSignIn={this.onSignIn} clientId={this.clientId}/>
  }
}

export default App;
