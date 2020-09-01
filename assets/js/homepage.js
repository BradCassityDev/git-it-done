var getUserRepos = function(user) {

    //Format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(data) {
                console.log(data);
            });
        });
    
    console.log("outside");
};

getUserRepos("BradCassityDev");
