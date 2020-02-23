import React from 'react';
import GoogleLogin from 'react-google-login';

function LoginScreen(props) {
    let errorComponent = null;
    if(props.errorMessage != null) {
        errorComponent = <p className="alert alert-danger">{props.errorMessage}</p>;
    }

    return (
        <div className="App text-center container">
          <h1 className="display-4">NCHS Senior Assassin</h1>
  
          {errorComponent}
          <GoogleLogin
            // TODO: add client id to .env
            clientId={props.clientId}
            buttonText="Sign In with Google"
            onSuccess={props.onSignIn}
            onFailure={props.onSignIn}
            cookiePolicy={'single_host_origin'}
          />
  
          <p style={{"position":"fixed", "bottom":"10px", "left": "50%", "transform": "translateX(-50%)", "width": "100%"}}>Website made by <a href="https://kylemumma.github.io">Kyle Mumma</a></p>
        </div>
      );
}

export default LoginScreen;