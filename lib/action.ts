import { GraphQLClient } from "graphql-request";


const isProduction =process.env.NODE_ENT==='production'

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '':'http://127.0.0.1:4000/graphql'

const client=new GraphQLClient('apiUrl')

const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        // request
    }  catch (error) {
        throw error
    }
}