import { GraphQLClient } from "graphql-request";


const isProduction =process.env.NODE_ENT==='production'

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '':'http://127.0.0.1:4000/graphql'

const apiKey=isProduction?process.env.NEXT_PUBLIC_GRAFBASE_API_KEY||'':'putmein'

const serverUrl=isProduction?process.env.NEXT_PUBLIC_SERVER_URL:'http://localhost:3000'

const client=new GraphQLClient(apiUrl)

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        // request
        return await client.request(query,variables)
    }  catch (error) {
        throw error
    }
}

