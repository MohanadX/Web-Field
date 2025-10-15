import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// components using server action won't be cached no matter what

const Navbar = async () => {
	const session = await auth();
	// will give us the user information if he logged in so we appear the div of the user below
	return (
		<header className="px-2  bg-white shadow-sm font-work-sans h-17">
			<nav className="flex justify-between items-center">
				<Link href="/">
					<Image src={"/headerLogo.png"} alt="Logo" width={100} height={50} />
				</Link>

				<div className="flex items-center gap-2 md:gap-4 text-black">
					{session && session?.user ? (
						<>
							<Link href={"/startup/create"}>
								<span className="max-sm:hidden">Create</span>
								<BadgePlus className="size-6 sm:hidden"></BadgePlus>
							</Link>

							<form
								action={async () => {
									"use server";
									await signOut({ redirectTo: "/" });
								}}
								className="flex items-center"
							>
								<button type="submit">
									<span className="max-sm:hidden">Logout</span>
									<LogOut className="size-6 sm:hidden text-red-500" />
								</button>
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar>
									<AvatarImage
										src={session?.user?.image || ""}
										alt={session?.user?.name || ""}
										className="size-10 rounded-full"
									/>
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<form
							onClick={async () => {
								"use server";
								await signIn("github");
							}}
						>
							<button type="submit" className="cursor-pointer">
								Login
							</button>
						</form>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
