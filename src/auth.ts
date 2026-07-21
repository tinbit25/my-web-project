// src/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * Demo users — hardcoded for the portal demonstration.
 * These match exactly the credentials pre-filled in the LoginForm.
 */
const DEMO_USERS: Record<string, { id: string; name: string; email: string; role: string; church: string }> = {
  'student@eotc.edu:student123':     { id: 'u1', name: 'Tinbit Elias',             email: 'student@eotc.edu',    role: 'student',    church: 'Tsbase Debre Selam Medhanealem' },
  'teacher@eotc.edu:teacher123':     { id: 'u2', name: 'Mergia Hailu',              email: 'teacher@eotc.edu',    role: 'teacher',    church: 'Tsbase Debre Selam Medhanealem' },
  'admin@eotc.edu:admin123':         { id: 'u3', name: 'Keis Kesis Weldeyesus',     email: 'admin@eotc.edu',      role: 'admin',      church: 'Tsbase Debre Selam Medhanealem' },
  'superadmin@eotc.edu:super123':    { id: 'u4', name: 'Liqe Kahnat Hailemariam',   email: 'superadmin@eotc.edu', role: 'superadmin', church: 'All Parishes' },
  'parent@eotc.edu:parent123':       { id: 'u5', name: 'Elias Tekle',               email: 'parent@eotc.edu',     role: 'parent',     church: 'Tsbase Debre Selam Medhanealem' },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email    = (credentials?.email    as string | undefined)?.toLowerCase().trim() ?? '';
        const password = (credentials?.password as string | undefined) ?? '';

        if (!email || !password) return null;

        const key  = `${email}:${password}`;
        const user = DEMO_USERS[key];

        if (!user) return null;

        return {
          id:     user.id,
          email:  user.email,
          name:   user.name,
          role:   user.role,
          church: user.church,
        } as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? 'gbi-gubae-sunday-school-secret',
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id     = user.id;
        token.role   = (user as any).role;
        token.church = (user as any).church;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id     = token.id     as string;
        (session.user as any).role   = token.role   as string;
        (session.user as any).church = token.church as string;
      }
      return session;
    },
  },
  pages: { signIn: '/signin' },
});
