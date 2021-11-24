// The module 'vscode' contains the VSCodium extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
const fs = require("fs");
const path = require("path");

interface User {
    name: string
    age: string
}

function getUsers(): Promise<User[]> {
    return fetch('/Users/dvdemon/SRC/vscosol_test/users.json')
        // the JSON body is taken from the response
        .then(res => res.json())
        .then(res => {
            // The response has an `any` type, so we need to cast
            // it to the `User` type, and return it from the promise
            return res as User[]
        })
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "initdockerapp" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('initdockerapp.initialize', () => {
        // The code you place here will be executed every time your command is executed

        console.log('Congratulations, your extension "initdockerapp" start!');
        let fileContent = ``;

        const query = {
            asset: "BTC",
            exchange: "Kraken",
            denominator: "USD",
        };
        const url = new URL('https://my-json-server.typicode.com/typicode/demo/posts');
        //url.search = new URLSearchParams(query).toString();

        const headers = {
            "pragme": "no-cache",
            /* "x-api-key": "[insert-your-api-key]",
             "x-api-secret": "[insert-your-api-secret]",
             "x-rapidapi-host": "crypto-asset-market-data-unified-apis-for-professionals.p.rapidapi.com",
             "x-rapidapi-key": "REPLACE_THIS_WITH_YOUR_KEY",*/
        };

        interface Post{
            id:string
            title:string
        }
        (async function () {
            vscode.window.showInformationMessage("Start request:" + url.toString())
            const response = await fetch(url.toString());//, {headers} );
            const data: Post[] = await response.json();

            data.forEach((item: Post) => {
                fileContent += item.title +"\n"
                vscode.window.showInformationMessage("Response request:" + item.title)
                })
            //fileContent = data
            // return response
            fs.writeFile(path.join(vscode.workspace.rootPath, "Dockerfile"), fileContent, (err: any) => {
                if (err) {
                    return vscode.window.showErrorMessage("Failed to initialize docker file!");
                }
                vscode.window.showInformationMessage("Dockerfile has been created!");
            });
        })()


    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }