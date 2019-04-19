import React from 'react';
import GoogleLogin from 'react-google-login';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      error: false,
      name: '',
      email: '',
      target: 'blank',
    }

    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    //make those MF API calls BOIIIIII
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const name = profile.getName();
    const email = profile.getEmail();
    const emailSubdomain = email.substring(email.indexOf("@"));

    // not signed in with student email
    if(emailSubdomain !== "@apps.nsd.org"){
      this.setState({
        error: true
      })
    } else {
      this.setState({
        loggedIn: true,
        error: false,
        name: name,
        email: email
      });
    }
  }

  render() {
    //if logged in
    if(this.state.loggedIn && !this.state.error){
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
    if(this.state.error){
      errorMessage = <p className="alert alert-danger">Error: You must log in with your app.nsd.org student email</p>
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
