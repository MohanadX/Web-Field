import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_iD_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const post = await client.fetch(STARTUP_BY_iD_QUERY, { id: id });

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
					className="w-full h-auto aspect-[1.91/1] rounded-xl"
				/>
				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${post.author?._id}`}
							className="flex gap-2 items-center mb-3"
						>
							<Image
								src={post.author!.image!}
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
				{/* TODO: Recommended Startups */}

				<Suspense fallback={<Skeleton className="view-skeleton" />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
};

export default Page;
