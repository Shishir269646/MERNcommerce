"use client";
import {  useState } from "react";

export default function Comments({ comments }) {
    const [commentList, setCommentList] = useState(comments);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setCommentList([...commentList, { name: 'Guest', text: newComment }]);
        setNewComment('');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Comments</h2>
            <div className="space-y-2">
                {commentList.map((c, i) => (
                    <div key={i} className="border p-2 rounded">
                        <p className="text-sm font-semibold">{c.name}</p>
                        <p>{c.text}</p>
                    </div>
                ))}
                <div className="mt-4 space-y-2">
                    <textarea
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Add a comment..."
                    />
                    <button onClick={handleAddComment} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Post Comment
                    </button>
                </div>
            </div>
        </div>
    );
}
