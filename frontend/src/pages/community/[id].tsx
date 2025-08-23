import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function CommunityThread() {
    const { query } = useRouter();
    const id = String(query.id || "");

    // Example: Replace with real API fetch later
    const story = {
        id,
        title: "Finding Strength in the Journey",
        author: "Nas.io",
        date: "August 23, 2025",
        content:
            "When I was diagnosed, it felt like my world stopped. But with courage, compassion, and community support, I realized healing is more than medicine — it’s human connection.",
    };

    const [comments, setComments] = useState([
        { id: 1, user: "Himanshu", text: "Stay strong 🙏 You’re not alone." },
        { id: 2, user: "Anita (Caregiver)", text: "This story gave me hope, thank you for sharing!" },
    ]);

    const [newComment, setNewComment] = useState("");

    const handleComment = () => {
        if (!newComment.trim()) return;
        setComments([
            ...comments,
            { id: comments.length + 1, user: "You", text: newComment },
        ]);
        setNewComment("");
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            {/* Story Section */}
            <h1 className="text-3xl font-bold text-dark mb-2">{story.title}</h1>
            <p className="text-sm text-gray-500">
                By {story.author} • {story.date}
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">{story.content}</p>

            <hr className="my-6 border-gray-300" />

            {/* Comments Section */}
            <h2 className="text-2xl font-semibold mb-4">💬 Community Discussion</h2>
            <p className="text-gray-600 mb-6">
                Share experiences, ask questions, or leave words of encouragement.
                Every story becomes a <span className="font-semibold text-dark">living conversation</span>.
            </p>

            {/* Existing Comments */}
            <div className="space-y-4">
                {comments.map((c) => (
                    <div key={c.id} className="p-4 border rounded-lg shadow-sm bg-white">
                        <p className="font-semibold text-dark">{c.user}</p>
                        <p className="text-gray-700">{c.text}</p>
                    </div>
                ))}
            </div>

            {/* Add New Comment */}
            <div className="mt-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a supportive message..."
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-golden"
                    rows={3}
                />
                <button
                    onClick={handleComment}
                    className="mt-2 bg-golden text-white px-4 py-2 rounded-lg hover:bg-dark-golden"
                >
                    Post Comment
                </button>
            </div>

            <hr className="my-8 border-gray-300" />

            {/* Extra Sections */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 border rounded-lg shadow bg-white">
                    <h3 className="font-bold text-lg text-dark">🌟 Daily Ray of Hope</h3>
                    <p className="text-gray-600 mt-2">
                        “Every sunrise is an invitation to brighten someone’s day.” 🌅
                    </p>
                </div>
                <div className="p-4 border rounded-lg shadow bg-white">
                    <h3 className="font-bold text-lg text-dark">👥 Group Discussion</h3>
                    <p className="text-gray-600 mt-2">
                        Topic: <span className="italic">How did you cope with diagnosis?</span>
                    </p>
                    <Link href="/community/groups/diagnosis" className="text-golden underline">
                        Join Discussion →
                    </Link>
                </div>
            </div>

            <div className="mt-6 p-4 border rounded-lg shadow bg-white">
                <h3 className="font-bold text-lg text-dark">🤝 Peer-to-Peer Support</h3>
                <p className="text-gray-600 mt-2">
                    Connect in real time with patients & caregivers who understand what
                    you’re going through.
                </p>
                <Link href="/community/support" className="text-golden underline">
                    Start Chat →
                </Link>
            </div>
        </main>
    );
}
