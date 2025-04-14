import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  pages:{
    signIn: "/login",
    signOut: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lógica de autenticação
        if (
          !credentials ||
          credentials.email !== "ghast@admin.com" ||
          credentials.password !== "ghast"
        ) {
          throw new Error("Invalid credentials.");
        }
        // Retorne o usuário autenticado
        return { id: "1", name: "Ghast", email: "ghast@admin.com" };
      },
    }),
  ],
};

const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

export { auth, handlers, signIn, signOut };
