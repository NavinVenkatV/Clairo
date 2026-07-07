import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:     "878128752315-5i8m8nsfgng7jgh88aro59stas307123.apps.googleusercontent.com",
      clientSecret: "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",
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
