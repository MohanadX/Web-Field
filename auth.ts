import NextAuth, {
	Session as NextAuthSession,
	JWT as NextAuthJWT,
} from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import type { AdapterUser } from "next-auth/adapters"; // for User type from adapter
import { Account } from "next-auth";
import { Profile } from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub],
	callbacks: {
		// will be called after authentication process
		async signIn({ user, profile }: { user: AdapterUser; profile: Profile }) {
			const existingUser = await client
				.withConfig({ useCdn: false })
				.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
					id: profile?.id,
				});

			if (!existingUser) {
				await writeClient.create({
					_type: "author",
					id: profile?.id,
					name: user?.name,
					username: profile?.login,
					email: user?.email,
					image: user?.image,
					bio: profile?.bio || "",
				});
			}
			return true;
		},
		async jwt({
			token,
			account,
			profile,
		}: {
			token: NextAuthJWT;
			account: Account;
			profile: Profile;
		}) {
			if (account && profile) {
				const user = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
						id: profile?.id,
					});

				token.id = user!._id;
			}
			return token;
		},
		async session({
			session,
			token,
		}: {
			session: NextAuthSession;
			token: NextAuthJWT;
		}) {
			Object.assign(session, { id: token.id });
			return session;
		},
	},
});

// GitHub login → Find user in Sanity → Attach Sanity ID to token →
// Now token/session knows “this user corresponds to Sanity _id X”.
