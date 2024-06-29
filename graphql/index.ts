export cont getUserQuery = `
query GetUser($email:String!){
user(by:{email:$email}){

}

}
`