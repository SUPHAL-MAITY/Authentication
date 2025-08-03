import  * as z  from  "zod"

export const userInputSchema=z.object({
    name:z.string().min(1,"Name is required"),
    email:z.email("invalid email"),
    password:z.string().min(4,"password length must be greater than 4")
})




