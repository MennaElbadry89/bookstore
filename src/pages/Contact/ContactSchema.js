import * as z from "zod";

const ContactSchema = z.object({
    name : z.string().min(3 , {message : 'Name is req'}),
    email : z.string().min(5 , {message :'email is req'}).email({message: "This email is invalid"}),
    phone : z.string().min(11 , {message : 'phone is req'}).regex(/^01[0-25][0-9]{8}$/ , {message : 'This number is invalid'}),
    message : z.string().min(10 , {message : 'message is req'}),

})

export default ContactSchema