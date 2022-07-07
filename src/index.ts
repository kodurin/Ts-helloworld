import { getInput } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import dedent from 'dedent';

type GitHubContext = typeof context

const inputName = getInput("name");
const ghToken = getInput("ghToken");

welcome(inputName, repoUrl(context));

Diff().then(files => {
    console.log(dedent(`
    Your PR diff:
    ${JSON.stringify(files, undefined, 2)}
    `))
})


function welcome(name:string, repoUrl: string) {
    console.log(`'Hello ${name} You are running github actions in ${repoUrl}'`);
}
 function repoUrl({repo, serverUrl}: GitHubContext): string {
    return `${serverUrl}/${repo.owner}/${repo.repo}`
  
 }

 async function Diff() {
    if (ghToken && context.payload.pull_request) {
        const octokit = getOctokit(ghToken)
        const result = await octokit.rest.repos.compareCommits({
            repo: context.repo.repo,
            owner: context.repo.owner,
            head: context.payload.pull_request.head.sha,
            base: context.payload.pull_request.base.sha,
            per_page: 100
        })
        return result.data.files || []

    }
    
    return []
 }

