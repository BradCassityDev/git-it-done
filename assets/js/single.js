var issueContainerEl = document.querySelector("#issues-container");

// Display the parsed resutls from the getReposIssues call
var displayIssues = function(issues) {

    // Check if no issues exist
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no issues!";
        return;
    }


    // loop through json and create DOM objects
    for (var i = 0; i < issues.length; i++) {
        // Create Issue Container as Link
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // Create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);
        
        // create a type element 
        var typeEl = document.createElement("span");

        // check if issue is actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        // append to page
        issueContainerEl.appendChild(issueEl);
    }
};


var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl)
        .then(function(response) {
            // The request was successful
            if(response.ok) {
                response.json().then(function(data) {
                    displayIssues(data);
                });
            } else {
                alert("There was a problem with your request!");
            }
        })
        .catch(function(error) {

        });
};

getRepoIssues("BradCassityDev/run-buddy");
