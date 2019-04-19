const participants = [
    "rishabh jain",
    "kyle mumma",
    "cody large",
    "manal khan",
    "drew reiger",
    "alisa kim",
    "monica potts"
  ];
  
  let targets = {};
  
  function remove(arr, value){
    arr.splice(arr.indexOf(value), 1);
  }
  
  function setTargets(){
    participantsArr = participants.slice();
  
    let currentPerson = participantsArr.pop();
    while(participantsArr.length > 0) {
      //selects a random target
      let newTarget = participantsArr[parseInt(Math.random() * participantsArr.length)];
  
      //give currentPerson a random target
      targets[currentPerson] = newTarget;
  
      //removes newTarget from array and sets newTarget equal to currentPerson
      remove(participantsArr, newTarget);
      currentPerson = newTarget;
    }
  }
  
  setTargets();
  
  console.log(targets);