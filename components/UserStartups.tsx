import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./StartupCard";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const UserStartups = async ({ id }: { id: string }) => {
	const startups = (await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {
		id,
	})) as StartupCardType[];

	console.log(startups);

	return (
		<>
			{startups.length > 0 ? (
				startups.map((startup) => (
					<StartupCard key={startup._id} post={startup} />
				))
			) : (
				<p className="no-results">No Posts yet</p>
			)}
		</>
	);
};

export const StartupCardsSkeleton = () => (
	<>
		{[0, 1, 2, 3, 4].map((index) => (
			<li key={cn("skeleton", index)}>
				<Skeleton className="startup-card_skeleton" />
			</li>
		))}
	</>
);

export default UserStartups;
