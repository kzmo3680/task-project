export interface Login 
{
    email : string,
    password : string,
    role : string
}

export interface LgoinResponse 
{
    token : string,
    userId : string,
}