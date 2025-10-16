import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
	PLAYLIST_BY_SLUG_QUERY,
	STARTUP_BY_iD_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { PLAYLIST_BY_SLUG_QUERYResult } from "@/sanity/types";

export const experimental_ppr = true;

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const [post, { select: editorPosts }] = await Promise.all([
		client.fetch<StartupCardType>(STARTUP_BY_iD_QUERY, { id: id }),
		client.fetch<PLAYLIST_BY_SLUG_QUERYResult>(PLAYLIST_BY_SLUG_QUERY, {
			slug: "editor-picks",
		}),
	]);

	// const post = await client.fetch(STARTUP_BY_iD_QUERY, { id: id });

	// const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
	// 	slug: "editor-picks",
	// });
	// two sequential fetch data = sum of two fetch data time (much slower): used if the other fetch depends on the first
	// two parallel fetch data = the slowest fetch data time (much faster): used if the 2 are unrelated to each other

	if (!post) return notFound();

	const parsedContent = md.render(post.pitch || "");
	// to convert Markdown to HTML
	return (
		<>
			<section className="pink-container bg-primary !min-h-[230px]">
				<p className="tag tag-ari">{formatDate(post._createdAt)}</p>
				<h1 className="heading mt-4">{post.title}</h1>
				<p className="sub-heading !max-w-5xl mt-5">{post.description}</p>
			</section>

			<section className="section-container">
				<Image
					src={post.image!}
					alt="thumbnail"
					height={200}
					width={200}
					className="w-fit aspect-[4/3] rounded-xl mx-auto"
				/>
				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${post.author?._id}`}
							className="flex gap-2 items-center mb-3"
						>
							<Image
								src={post.author?.image || ""}
								alt="avatar"
								width={64}
								height={64}
								className="rounded-full drop-shadow-lg"
							/>
							<div>
								<p className="text-[20] font-medium">{post.author?.name}</p>
								<p className="text-[16] font-[300]">@{post.author?.username}</p>
							</div>
						</Link>
						<p className="category-tag">{post.category}</p>
					</div>
					<h2 className="text-[30] font-bold">Pitch Details</h2>
					{parsedContent ? (
						<article dangerouslySetInnerHTML={{ __html: parsedContent }} />
					) : (
						<p className="no-result">No details provided</p>
					)}
				</div>
				<hr className="divider" />

				{editorPosts?.length > 0 && (
					<div className="max-w-4xl mx-auto">
						<p className="text-[30px] font-semibold">Mohanad Picks</p>

						<ul className="mt-7 cards-grid">
							{editorPosts.map((post: StartupCardType, index: number) => (
								<StartupCard key={index} post={post} />
							))}
						</ul>
					</div>
				)}

				<Suspense fallback={<Skeleton className="view-skeleton" />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
};

export default Page;
