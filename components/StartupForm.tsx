"use client";
import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
	const [error, setError] = useState<Record<string, string>>({});
	const [pitch, setPitch] = useState<string>("");

	const router = useRouter();

	const handleFormSubmit = async (prevState: object, formData: FormData) => {
		try {
			const formValues = {
				title: formData.get("title") as string,
				description: formData.get("description") as string,
				category: formData.get("category") as string,
				link: formData.get("link") as string,
				pitch,
			};
			await formSchema.parseAsync(formValues);

			const result = await createPitch(prevState, formData, pitch);

			if (result.status === "SUCCESS") {
				toast.success("Your startup pitch has been created successfully");

				// Wait for Sanity to propagate reference fields
				await new Promise((res) => setTimeout(res, 1000));

				router.push(`/startup/${result._id}?refresh=${Date.now()}`);
				/*
				This creates a unique URL, forcing Next.js (and your browser) to fetch fresh data from Sanity
				. Analogy
				Think of caching like this:
				“If you visit the same URL, I’ll reuse what I already have.”
				By appending a new query every time:
				“This is not the same URL anymore, please fetch it again.”
				*/
			}

			return result;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const fieldErrors = error.flatten().fieldErrors;
				setError(fieldErrors as unknown as Record<string, string>);

				toast.error("Please check your inputs and try again");
				return { ...prevState, error: "Validation Failed", status: "ERROR" };
			}

			toast.error("Please check your inputs and try again");
			return {
				...prevState,
				error: "Unexpected Error has occurred",
				status: "ERROR",
			};
		}
	};
	const [, formAction, isPending] = useActionState(handleFormSubmit, {
		error: "",
		status: "INITIAL",
	});

	return (
		<form action={formAction} className="startup-form">
			<div>
				<label htmlFor="title" className="startup-form-label">
					Title
				</label>
				<Input
					id="title"
					name="title"
					className="startup-form-input"
					required
					placeholder="Startup Title"
				/>
				{error.title && <p className="startup-form-error">{error.title}</p>}
			</div>

			<div>
				<label htmlFor="description" className="startup-form-label">
					Description
				</label>
				<Textarea
					id="description"
					name="description"
					className="startup-form-textarea"
					required
					placeholder="Startup Description"
				/>

				{error.description && (
					<p className="startup-form-error">{error.description}</p>
				)}
			</div>
			<div>
				<label htmlFor="category" className="startup-form-label">
					Category
				</label>
				<Input
					id="category"
					name="category"
					className="startup-form-input"
					required
					placeholder="Startup Category (Tech, Food, Health)"
				/>
				{error.category && (
					<p className="startup-form-error">{error.category}</p>
				)}
			</div>

			<div>
				<label htmlFor="link" className="startup-form-label">
					Image Url
				</label>
				<Input
					id="link"
					name="link"
					className="startup-form-input"
					required
					placeholder="Startup Image URL"
				/>
				{error.link && <p className="startup-form-error">{error.link}</p>}
			</div>

			<div data-color-mode="light">
				<label htmlFor="pitch" className="startup-form-label">
					Pitch
				</label>
				<MDEditor
					value={pitch}
					onChange={(value) => setPitch(value as string)}
					id="pitch"
					preview="edit"
					height={300}
					style={{ borderRadius: 20, overflow: "hidden" }}
					textareaProps={{
						placeholder:
							"Briefly describe your idea and what problem it solves",
					}}
					previewOptions={{
						disallowedElements: ["style"],
					}}
				/>
				{error.pitch && <p className="startup-form-error">{error.pitch}</p>}
			</div>

			<Button
				type="submit"
				className="startup-form-btn text-white"
				disabled={isPending}
			>
				{isPending ? "Submitting..." : "Submit Your Pitch"}
				<Send className="size-6 ml-2" />
			</Button>
		</form>
	);
};

export default StartupForm;
