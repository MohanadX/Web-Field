import { defineField, defineType } from "sanity";

export const playlist = defineType({
	name: "playlist",
	title: "Playlists",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title", // will be generated from sanity based on title
			},
		}),
		defineField({
			name: "select",
			type: "array",
			of: [{ type: "reference", to: [{ type: "startup" }] }],
		}),
	],
});
