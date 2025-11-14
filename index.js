import {GoogleGenAI} from "@google/genai";
import readlineSync from 'readline-sync';
import dotenv from 'dotenv';

dotenv.config();

const History = []
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})

function sum({num1, num2}){
    return num1 + num2;
}


function prime({num}){
    if(num < 2)
        return false;

    for(let i = 2; i <= Math.sqrt(num); i++)
        if(num % i == 0) return false;
    return true;
}


async function getCryptoPrice({coin}){
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin}`)
    const data = await response.json();

    return data[0];
}


const sumDeclaration = {
    name: "sum",
    description: "Returns the sum of two numbers",
    parameters: {
        type: 'OBJECT',
        properties: {
            num1: {
                type: 'NUMBER',
                description: 'The first number to add'
            },
            num2: {
                type: 'NUMBER',
                description: 'The second number to add'
            }
        },
        required: ['num1', 'num2']
    }
}


const primeDeclaration = {
    name: "prime",
    description: "Checks if a number is prime",
    parameters: {
        type: 'OBJECT',
        properties: {
            num: {
                type: 'NUMBER',
                description: 'The number to be checked for primality'
            }
        },
        required: ['num']
    }
}


const cryptoDeclaration = {
    name: "getCryptoPrice",
    description: "Get the current price of any cryptocurrency like bitcoin, ethereum etc.",
    parameters: {
        type: 'OBJECT',
        properties: {
            coin: {
                type: 'STRING',
                description: 'It will be the name of the cryptocurrency whose price is needed'
            }
        },
        required: ['coin']
    }
}


const availableTools = {
    sum: sum,
    prime: prime,
    getCryptoPrice: getCryptoPrice,
}


async function runAgent(userProblem){

    History.push({
        role: "user",
        parts: [{text:userProblem}]
    })

    while(true){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: History,
        config: {
            systemInstruction: `You are Agent Kuttan, an AI agent that helps users by using tools to solve their problems.
            You have access to the following tools: sum, prime, getCryptoPrice. Use these tools when necessary to answer user queries.
            If the user query can be answered directly without using any tool, then do so.
            You are a really friendly and cheerful guy. If the user asks general questions, you can answer them directly without using any tools.`,
            tools:[{
                functionDeclarations: [sumDeclaration, primeDeclaration, cryptoDeclaration],
            }],
        },
    });


    if(response.functionCalls && response.functionCalls.length > 0){

        console.log("Function call from model: ", response.functionCalls[0]);
        const {name, args} = response.functionCalls[0];

        const funCall = availableTools[name];
        const result = await funCall(args);

        const functionResponsePart = {
            name: name,
            response: {
                result: result,
            }
        }

        // model
        History.push({
            role: "model",
            parts: [{
                functionCall: response.functionCalls[0],
            }]
        })

        // push result to history
        History.push({
            role: "model",
            parts: [{
                functionResponse: functionResponsePart,
            }]
        })

    }

    else{

        History.push({
            role: "model",
            parts: [{text: response.text}]
        })
        console.log("Agent Kuttan: ", response.text);
        break;
    }
    }

}


async function main(){
    const userProblem = readlineSync.question('Ask me anything --> ');
    await runAgent(userProblem);
    main();
}

main();