const { Octokit } = require("@octokit/rest");

const token = process.env.token;
const octokit = new Octokit({ auth: token });

// Copies contents of code of conduct source file and copies them over to a target repo
// Needs arguments repo: 'name of target repo', path: 'path of file to copy contents into'
async function updateCodeOfConduct(repo, path) {
    const owner = 'bootcamp-brian';
    const codeOfConductSource = await octokit.request(`GET /repos/${owner}/github-actions-testing-2/contents/README.md`);

    const { content } = codeOfConductSource.data;

    let currentCodeOfConduct = false;
    
    try {
        currentCodeOfConduct = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`);
    } catch {
        console.log('there was an error')
    }

    console.log(currentCodeOfConduct);

    if (currentCodeOfConduct) {
        const { sha } = currentCodeOfConduct.data;
        const response = await octokit.request(`PUT /repos/${owner}/${repo}/contents/${path}`, {
            sha,
            message: 'Updating code of conduct',
            content
        });
    } else {
        const response = await octokit.request(`PUT /repos/${owner}/${repo}/contents/${path}`, {
            message: 'Updating code of conduct',
            content
        });
    }
}

// Run updateCodeofConduct() for all repos that need a copy of the code of conduct
updateCodeOfConduct('github-actions-testing1', '_includes/code-of-conduct-page/CODEOFCONDUCT.md');
