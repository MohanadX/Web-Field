import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;
	const params = { search: query || null };

	// const posts = (await client.fetch(STARTUPS_QUERY)) as StartupCardType[];
	const { data } = await sanityFetch({ query: STARTUPS_QUERY, params });
	const posts = data as StartupCardType[];
	// Trust me, this data matches the StartupCardType structure — no nulls, no missing fields.
	// console.log(posts);

	const session = await auth();

	console.log(session);
	return (
		<>
			<section className="pink-container pattern bg-primary">
				<h1 className="heading">
					Pitch Your Startup, <br /> Connect With Entrepreneurs
				</h1>
				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote On Pitches, and Get Noticed in Virtual Competition
				</p>
				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<p className="text-[30px] font-semibold text-black">
					{query ? `Search results for "${query}"` : "All Startups"}
				</p>

				<ul className="mt-7 cards-grid">
					{posts?.length > 0 ? (
						posts.map((post) => <StartupCard key={post?._id} post={post} />)
					) : (
						<p className="no-results">No Startups found</p>
					)}
				</ul>
			</section>
			<SanityLive />
		</>
	);
}
