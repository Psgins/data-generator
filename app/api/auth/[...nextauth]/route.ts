import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            authorization: "https://www.facebook.com/v17.0/dialog/oauth?scope=email",
        }),
    ],
    callbacks: {
        async signIn({ account, profile, ...other }) {
            console.log("sign in");
            return true;
        },
        async jwt({ token, account, ...other }) {
            console.log("jwt");
            if (account) {
                if (account.provider === "google") {
                    const { id_token: accessToken, refresh_token: refreshToken } = account;
                    return { ...token, accessToken, refreshToken };
                }
            }
            return token;
        },
        async session({ session, token }) {
            console.log("session");
            const { accessToken, refreshToken } = token;
            return { ...session, accessToken, refreshToken };
        },
    },
});

export { handler as GET, handler as POST };
