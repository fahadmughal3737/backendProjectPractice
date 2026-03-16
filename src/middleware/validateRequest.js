export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)               //safeparse is a method provided by zod to validate the data against the schema and it returns an object with success property and error property
        if (!result.success) {
           const formatted = result.error.format()
           const flatErrors = Object.values(formatted)
           .flat()
           .filter(Boolean)
           .map((err)=>err._errors)
           .flat()

           console.log(flatErrors)
           return res.status(400).json({
            error: flatErrors.join(", ")
           })   
        }
        next()
    }
}