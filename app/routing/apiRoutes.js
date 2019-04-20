let friendsInfo = require("../data/friends");
let path = require("path");

module.exports = function (app) {

    app.get("/api", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get("/api/friends", function (req, res) {
        res.json(friendsInfo);
        console.log("where my friends at");
    });

    app.post("/api/friends", function (req, res) {

        let tDifference = 0;

        let loveMatch = {
            name: "",
            photo: "",
            loveDif: 50
        };
        let userData = req.body;
        let userName = userData.name;
        let userScores = userData.scores;
        let userScoresNum = userScores.map(function (item) {
            return parseInt(item, 10);
        });

        userData = {
            "name": req.body.name,
            "photo": req.body.photo,
            "scores": userScoresNum
        };
        console.log(userData);


        console.log("Name: " + userName);
        console.log("User Score " + userScores);

        console.log('userScoreNum outside function ' + userScoresNum);

        // Converting the users score to a sum number (Adds up all the numbers in array)
        //
        let userScoresSum = userScoresNum.reduce((tot, amt) => tot + amt, 0);

        console.log("Sum of users score " + userScoresSum);
        console.log("Best match friend diff " + loveMatch.loveDif);


       

        // Loop through all the friend possibilities in the database. 
        for (let i = 0; i < friendsInfo.length; i++) {

            console.log(friendsInfo[i].name);
            tDifference = 0;
            console.log("Total Diff " + tDifference);
            console.log("Best match friend diff " + loveMatch.loveDif);

            let friendScoreSum = friendsInfo[i].scores.reduce((tot, amt) => tot + amt, 0);
            console.log("Total friend score " + friendScoreSum);
            tDifference += Math.abs(userScoresSum - friendScoreSum);
            console.log(" -------------------> " + tDifference);

            // If the sum of differences is less then the differences of the current "best match"
            if (tDifference <= loveMatch.loveDif) {

                // Reset the loveMatch to be the new friend. 
                loveMatch.name = friendsInfo[i].name;
                loveMatch.photo = friendsInfo[i].photo;
                loveMatch.loveDif = tDifference;
                // }

            }
            console.log(tDifference + " Total Difference");

        }
        console.log(loveMatch);
        
        friendsInfo.push(userData);
        console.log("New User added");
        console.log(userData);
        // Return a JSON with the user's loveMatch. This will be used by the HTML in the next page. 
        res.json(loveMatch);

    });






};