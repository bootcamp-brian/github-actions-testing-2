const BASE_URL = 'https://api.github.com/repos'
const repo = process.env.INPUT_REPO;
const path = process.env.INPUT_PATH;

async function updateCodeOfConduct(repo, path) {
    const codeOfConductSource = await fetch(`${BASE_URL}/bootcamp-brian/github-actions-testing-2/contents/README.md`, {
      method: "GET",
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const { content } = codeOfConductSource.data;

    const currentCodeOfConduct = await fetch(`${BASE_URL}/bootcamp-brian/${ repo }/contents/${ path }`, {
      method: "GET",
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const { sha } = currentCodeOfConduct;

    await fetch(`${BASE_URL}/bootcamp-brian/${ repo }/contents/${ path }`, {
      method: "PUT",
      message: 'updating code of conduct',
      committer: {
        name: 'Test Case',
        email: 'test@test.com'
      },
      content: `${ content }`,
      sha: `${ sha }`,
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization': `Bearer ${ process.env.token }`
      }
    });
}

updateCodeOfConduct(repo, path);