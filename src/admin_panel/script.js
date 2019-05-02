let participants = [];
let targets = {};

//----------reset targets---------------------

//reset targets button
function resetTargetsButton(){
    if(confirm("Are you sure you want to reset targets?")){
        //reset targets
        setTargets();
        console.log(targets);
    }
}

//code for randomizing targets

function remove(arr, value){
  arr.splice(arr.indexOf(value), 1);
}

function setTargets(){
  
  Korynne_Leon.setTargets("Jacob Kim");

  participantsArr = participants.slice();

  const startingPerson = participantsArr.pop();
  let currentPerson = startingPerson;
  console.log("first person " + currentPerson);
  while(participantsArr.length > 0) {
    //selects a random person
    let newTarget = participantsArr[parseInt(Math.random() * participantsArr.length)];

    //give currentPerson a random target
    targets[currentPerson] = newTarget;

    console.log(currentPerson + ": " + targets[currentPerson]);

    //removes newTarget from array and sets newTarget equal to currentPerson
    remove(participantsArr, newTarget);
    currentPerson = newTarget;
  }
  targets[currentPerson] = startingPerson;
  console.log(currentPerson + ": " + targets[currentPerson]);
}

//push new targets to database
function pushTargetsToDatabase(){
    if(confirm("Are you sure you want to push targets to database?")){
        $.ajax({
            url: 'https://nchsassassin.com/participants/update',
            type: 'PUT',
            data: "name=" + "kyle mumma" + "&target=" + "manal khan",
            success: function(data) {
              alert('targets successfully pushed');
            }
          });

        /*
        for(let person in targets){
            $.ajax({
                url: 'https://nchsassassin.com/participants/update',
                type: 'PUT',
                data: "name=" + person + "&target=" + targets[person],
                success: function(data) {
                  alert('targets successfully pushed');
                }
              });
        }
        */
    }
}

//------------ end reset targets -----------

function onKillSubmit(event){
    event.preventDefault();

    if(confirm("Are you sure you want to submit this kill?")){
        console.log("Kill Confirmed");
    }
}

function viewTargets(event){
    event.preventDefault();

    for(let i = 0; i < participants.length; i++){
        console.log(participants[i] + " is hunting " + targets[i]);
    }
}


$(document).ready(() => {
    //populate dropdowns
    const killer_name_dropdown = document.getElementById("killer_name");
    for(let i = 0; i < participants.length; i++){
        var newOption = document.createElement("option");
        newOption.textContent = participants[i];
        newOption.value = participants[i];
        
        killer_name_dropdown.appendChild(newOption);
    }

    const killed_name_dropdown = document.getElementById("killed_name");
    for(let i = 0; i < participants.length; i++){
        var newOption = document.createElement("option");
        newOption.textContent = participants[i];
        newOption.value = participants[i];
        
        killed_name_dropdown.appendChild(newOption);
    }

    //get participants
    $.get("https://nchsassassin.com/participants", (res) => {
        let participantsArr = [];
        console.log(res);
        for(let participant of res){
            participantsArr.push(participant["name"]);
        }
        participants = participantsArr;
        console.log(participants)
    });
});
