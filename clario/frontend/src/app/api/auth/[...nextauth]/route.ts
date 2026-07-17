import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:     "xxx",
      clientSecret: "xxxx",
    }),
    TwitterProvider({
      clientId:     process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0", // use OAuth 2.0 (X API v2)
    }),
  ],

  pages: {
    signIn: "/", // stay on homepage, we use a modal
  },

  callbacks: {
    async session({ session, token }) {
      // attach user id to session so frontend can use it
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
