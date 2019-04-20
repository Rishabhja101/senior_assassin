import React from 'react';
import Request from 'superagent';
import GoogleLogin from 'react-google-login';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      error: '',
      name: '',
      email: '',
      target: 'blank',
      participants: [],
      data: null
    }

    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    //make those MF API calls BOIIIIII
    Request.get("http://seniorassassin.us-west-2.elasticbeanstalk.com/participants")
    .then((res) => {
      let participantsArr = [];
      for(let participant of res.body){
        participantsArr.push(participant["name"]);
      }
      this.setState({
        data: res.body,
        participants: participantsArr
      });
    })
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const name = profile.getName().toLowerCase();
    const email = profile.getEmail();
    const emailSubdomain = email.substring(email.indexOf("@"));

    console.log(name);
    console.log(this.state.participants);
    // not signed in with student email
    if(emailSubdomain !== "@apps.nsd.org"){
      this.setState({
        error: 'non_nsd'
      })
    } else if(!this.state.participants.includes(name)){ //not a participant
      this.setState({
        error: 'non_participant'
      });
    } else {
      this.setState({
        loggedIn: true,
        error: '',
        name: name,
        email: email
      });
    }
  }

  render() {
    //if logged in and no errors
    if(this.state.loggedIn && this.state.error === ''){
      return(
        <div className="App text-center container">
          <h1 className="display-4">NCHS Senior Assassin</h1>
          <p className="lead">Welcome back {this.state.name}</p>
          <p className="lead">your target for this week is {this.state.target}</p>
        </div>
      );
    }

    //if not logged in or error
    let errorMessage = null;
    if(this.state.error === 'non_nsd'){
      errorMessage = <p className="alert alert-danger">Error: You must log in with your apps.nsd.org student email</p>
    } else if(this.state.error === 'non_participant'){
      errorMessage = <p className="alert alert-danger">
                        Error: You are not registered for Senior Assassin,
                        if this is an error please contact Monica Potts on instagram
                        <a href="https://www.instagram.com/monicapottts" target="_blank"> @monicapottts</a>
                      </p>
    }

    return (
      <div className="App text-center container">
        <h1 className="display-4">NCHS Senior Assassin</h1>

        {errorMessage}
        <GoogleLogin
          clientId="406456758580-snl7rfngdoidunla1jsanccm1l9odi8i.apps.googleusercontent.com"
          buttonText="Sign In with Google"
          onSuccess={this.onSignIn}
          onFailure={this.onSignIn}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default App;
