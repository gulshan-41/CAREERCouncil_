import { z } from 'zod';


const strengthsSchema = z.object({
    mathematics: z.boolean({ required_error: "mathematics is required!" }),
    management: z.boolean({ required_error: "management is required!" }),
    sports: z.array(z.string({ required_error: "sports is required!" })).min(1, "At least one sport is required"),
});

const interestsSchema = z.object({
    science: z.boolean({ required_error: "science is required!" }),
    history: z.boolean({ required_error: "history is required!" }),
    fields: z.array(z.string({ required_error: "fields is required!" })).min(1, "At least one fields is required"),
});

//zod signup schema
export const signupSchema = z.object({

    name: z
        .string({ required_error: "Name is required!" })
        .trim()
        .min(3, { message: "Name must be atleast 3 characters." }).
        max(255, { message: "Name must not be of 255 characters." }),

    email: z
        .string({ required_error: "Email is required!" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(13, "Email must be atleast 13 characters")
        .max(255, { message: "Email must not be of atleast 255 created!" }),

    password: z
        .string({ required_error: "password is required!" })
        .min(6, { message: "Password must be of 6 characters!" })
        .max(1024, { message: "Password must not be 1024 characters!" }),

    age: z
        .string({ required_error: "age is required!" })
        .min(1, { message: "age must be of 1 characters!" })
        .max(100, { message: "age must not be 100 characters!" }),

    occupation: z
        .string({ required_error: "occupation is required!" }),

    strengths: strengthsSchema,
    interests: interestsSchema

})


//zod login schema
export const loginSchema = z.object({

    email: z
        .string({ required_error: "Email is required!" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(13, "Email must be atleast 13 characters")
        .max(255, { message: "Email must not be of 255 characters!" }),

    password: z
        .string({ required_error: "password is required!" })
        .min(6, { message: "Password must be of 6 characters!" })
        .max(1024, { message: "Password must not be 1024 characters!" }),

});