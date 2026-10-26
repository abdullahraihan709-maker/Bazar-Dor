import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";



const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);
const db = client.db();


export const auth = betterAuth({
// ১. আপনার সঠিক প্রোডাকশন ডোমেইন এখানে baseURL হিসেবে দিন
    baseURL: process.env.BETTER_AUTH_URL || "https://bazar-dor-two-bay.vercel.app",

    trustedOrigins: [
        "https://bazar-dor-two-bay.vercel.app",
    ],

    emailAndPassword: { 
        enabled: true,
    },  

    // অ্যাকাউন্ট লিংকিং এনাবল করার জন্য এই অংশটি যোগ করুন
    account: {
        accountLinking: {
            enabled: true,
        },
    },


    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET!,
        },

        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID!,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET!,
        },
    },

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
});
