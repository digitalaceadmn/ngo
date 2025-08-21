import Link from "next/link";
import Image from "next/image";

export type ContentItem = {
    id: string;
    title: string;
    excerpt?: string;
    image?: string;        // /public images like /images/p1.jpg
    type: "story" | "quote" | "group" | "p2p";
};

export default function StoryCard({ item }: { item: ContentItem }) {
    return (
        <Link href={`/community/${item.id}`} className="block group">
            <div className="rounded-2xl overflow-hidden shadow-sm border bg-white hover:shadow-md transition">
                <div className="relative h-44 w-full bg-gray-100">
                    {item.image ? (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 grid place-items-center text-sm text-gray-500">
                            No image
                        </div>
                    )}
                    <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-black/70 text-white capitalize">
                        {item.type === "p2p" ? "peer-to-peer" : item.type}
                    </span>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold line-clamp-1 group-hover:underline">{item.title}</h3>
                    {item.excerpt && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.excerpt}</p>
                    )}
                    <p className="text-xs mt-3 text-indigo-600">Open thread →</p>
                </div>
            </div>
        </Link>
    );
}
