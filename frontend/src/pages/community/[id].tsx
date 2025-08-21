import { useRouter } from "next/router";
import Link from "next/link";

export default function CommunityThread() {
    const { query } = useRouter();
    const id = String(query.id || "");

    // TODO: fetch thread by id from your API
    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <Link href="/" className="text-indigo-600">← Back</Link>
            <h1 className="text-2xl font-bold mt-4">Community Thread: {id}</h1>
            <p className="mt-2 text-gray-600">
                This is a placeholder. Replace with real thread content, posts, and replies.
            </p>
            {/* Example: render posts list here */}
        </main>
    );
}
