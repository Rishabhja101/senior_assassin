let participants = [];
let kills = {};
let leaderboard = [];

//display the leaderboard
function getLeaderboard(){
    participantsArr = participants.slice();
    let values = [];
    let i;
    for (i = 0; i < participantsArr.length; i++)
    {
        values[i] = kills[participantsArr[i]];
    }
    values.sort();
    values.reverse();

    let sorted = [];
    while(participantsArr.length > 0){
        i = 0;
        for (i = 0; i < participantsArr.length; i++){      
            if (kills[participantsArr[i]] == values[0]){
                sorted[sorted.length] = participantsArr[i];
                participantsArr.splice(i, 1);
                i--;
            }
        }
        values.shift();
    }
    leaderboard = [];
    let place = 1;
    for (i = 0; i < participants.length; i++){
        if (i > 0 && kills[sorted[i]] != kills[sorted[i - 1]]){
            place = i + 1;
        }
        let temp = {};
        temp["place"] = place;
        temp["name"] = sorted[i];
        temp["kills"] = kills[sorted[i]];
        leaderboard[leaderboard.length] = temp;
        // console.log(place + " | " + sorted[i] + " : " + kills[sorted[i]])
    }
    console.log(leaderboard);
    console.log(parseInt(74, 10));
}


$(document).ready(() => {
    //get participants
    $.get("https://nchsassassin.com/participants", (res) => {
        let participantsArr = [];
        console.log(res);
        for(let participant of res){
            participantsArr.push(participant["name"]);
            kills[participant["name"]] = parseInt(participant["kills"], 10);
        //    kills[participant["name"]] = participant["kills"];
         //   console.log(participant["kills"]);
        }
        participants = participantsArr;
    });
});