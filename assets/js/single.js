var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

// Get repo name from query string
var getRepoName = function() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    if(repoName) {
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
    } else {
        // redirect back to index.html
        document.location.replace("./index.html");
    }
}


// Limit repo warning
var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append link to the limit warning message;
    limitWarningEl.appendChild(linkEl);

}


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

                    // Check if api has paginated issues
                    if (response.headers.get("Link")) {
                        displayWarning(repo);
                    }
                });
            } else {
                document.location.replace("./index.html");
            }
        })
        .catch(function(error) {

        });
};

getRepoName();