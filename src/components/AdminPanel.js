import React from 'react';

function AdminPanel(props) {
  const participantOptions = props.participants.map(x => <option value={x} key={x}>{x}</option>); 

  return(
      <div className="App text-center container">
        <h1 className="display-4">NCHS Senior Assassin</h1>
        <p className="lead">Welcome back {props.name}</p>
        <p className="lead">your target for this week is {props.target}</p>
          
        <form onSubmit={props.onKillSubmit} id="kill_form" className="form-group text-center">
            <label className="lead" htmlFor="killed_name">Name of the person who was killed</label>
            <select className="form-control mb-2" id="killed_name" value={props.killSelectValue}
            onChange={props.onKillChange} >
                    <option disabled value="default">Name of Person Who Was Killed</option>
                    {participantOptions}
            </select>

            <button className="btn btn-outline-primary" type="submit" value="submit">Submit</button>
        </form>

        <button id="reset-button" className="btn btn-danger" value="reset-targets" onClick={props.resetTargets}>Reset Targets</button>
      </div>
    );
}

export default AdminPanel;