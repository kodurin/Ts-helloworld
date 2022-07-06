import { getInput } from "@actions/core"

const inputName = getInput("name")

welcome(inputName)

function welcome(name:string) {
    console.log(`'Hello ${name}'`)
}


