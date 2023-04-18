const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require("@octokit/rest");

const BASE_URL = 'https://api.github.com/repos'
const token = process.env.token;
const octokit = new Octokit({ auth: token });

async function updateCodeOfConduct(repo, path) {
    const codeOfConductSource = await octokit.rest.repos.getContent({
        owner: 'bootcamp-brian',
        repo: 'github-actions-testing-2',
        path: 'README.md',
    });

    const { content } = codeOfConductSource.data;

    const currentCodeOfConduct = await octokit.rest.repos.getContent({
        owner: 'bootcamp-brian',
        repo,
        path,
    });

    console.log(token)
    console.log (currentCodeOfConduct)

    const { sha } = currentCodeOfConduct;

    if (sha) {
        const response = await octokit.rest.repos.createOrUpdateFileContents({
            owner: 'bootcamp-brian',
            repo,
            path,
            message: 'Updating code of conduct',
            content,
            sha,
            committer: {
              name: "tester",
              email: "test@test.com"
            }
        });
        console.log(response)
    } else {
        const response = await octokit.rest.repos.createOrUpdateFileContents({
            owner: 'bootcamp-brian',
            repo,
            path,
            message: 'Updating code of conduct',
            content,
            committer: {
              name: "tester",
              email: "test@test.com"
            }
        });
        console.log(response)
    }
    
}

updateCodeOfConduct('github-actions-testing1', 'README.md');