import React from 'react';

function MainPage(props) {
    return(
        <div className="App text-center container">
          <h1 className="display-4">NCHS Senior Assassin</h1>
          <p className="lead">Welcome back {props.name}</p>
          <p className="lead">your target for this week is {props.target}</p>
        
          <p style={{"position":"fixed", "bottom":"10px", "left": "50%", "transform": "translateX(-50%)", "width": "100%"}}>Website made by <a href="https://kylemumma.github.io">Kyle Mumma</a></p>
        </div>
      );
}

export default MainPage;