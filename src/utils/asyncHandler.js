// function for handling functions 


// This is the function with Promise to handle the flow
const asyncHandler = (requestHandler)=> { (res,req,next)=>{
    Promise.resolve(requestHandler())
    .catch((err)=> next(err))
}}

export { asyncHandler }

/* This is just the example of another way to handle the flow with try and catch
    const asyncHandler = (requestHandler) => { async (req,res, next )=>
        {
            try{
                await requestHandler()
            }
            catch (err){
                res.status(err.status || 500)
                .json({
                    success : false,
                    message : "err.message"
                })
            }
        }
    }
*/