import { getInput } from "@actions/core"

import { context } from "@actions/github"

type GitHubContext = typeof context

const inputName = getInput("name");

welcome(inputName, repoUrl(context));

function welcome(name:string, repoUrl: string) {
    console.log(`'Hello ${name} You are running github actions in ${repoUrl}'`);
}
 function repoUrl({repo, serverUrl}: GitHubContext): string {
    return `${serverUrl}/${repo.owner}/${repo.repo}`
  
 }

