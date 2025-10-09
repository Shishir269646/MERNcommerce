"use client";
import React from 'react';


export default function Reviews({ reviews }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
            <div className="space-y-3">
                {reviews.map((rev, i) => (
                    <div key={i} className="border p-3 rounded bg-gray-50">
                        <div className="flex justify-between">
                            <span className="font-semibold">{rev.name}</span>
                            <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
                        </div>
                        <p className="text-gray-700">{rev.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
