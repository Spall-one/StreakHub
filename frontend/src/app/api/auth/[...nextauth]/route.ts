import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import TwitchProvider from 'next-auth/providers/twitch';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
