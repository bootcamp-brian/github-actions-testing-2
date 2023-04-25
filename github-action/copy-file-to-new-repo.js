const { Octokit } = require("@octokit/rest");

const token = process.env.token;
const octokit = new Octokit({ auth: token });

// Copies contents of code of conduct source file and copies them over to a target repo
// Needs arguments repo: 'name of target repo', path: 'path of file to copy contents into'
async function updateCodeOfConduct(repo, path) {
    try {
        const codeOfConductSource = await octokit.rest.repos.getContent({
            owner: 'bootcamp-brian',
            repo: 'github-actions-testing-2',
            path: 'README.md',
        });

        const { content } = codeOfConductSource.data;

        console.log('this line of code runs');

        const currentCodeOfConduct = await octokit.rest.repos.getContent({
            owner: 'bootcamp-brian',
            repo,
            path,
        });

        console.log(currentCodeOfConduct);

        if (currentCodeOfConduct.data.sha) {
            const { sha } = currentCodeOfConduct.data;
            const response = await octokit.rest.repos.createOrUpdateFileContents({
                owner: 'bootcamp-brian',
                repo,
                path,
                message: 'Updating code of conduct',
                content,
                sha,
            });
        } else {
            const response = await octokit.rest.repos.createOrUpdateFileContents({
                owner: 'bootcamp-brian',
                repo,
                path,
                message: 'Updating code of conduct',
                content,
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// Run updateCodeofConduct() for all repos that need a copy of the code of conduct
updateCodeOfConduct('github-actions-testing1', '_includes/code-of-conduct-page/CODEOFCONDUCT.md');
