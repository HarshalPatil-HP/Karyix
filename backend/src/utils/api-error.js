class ApiError extends Error{
    constructor(
        statusCode,
        data,
        message,
        errors=[],
        stack=""
    ){
        this.statusCode=statusCode,
        this.data=null,
        this.message="something went wrong",
        this.errors=errors
        if(stack){
            this.stack=stack;
        }
    }
}
export {ApiError};