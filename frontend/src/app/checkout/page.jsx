"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CheckoutForm from "@/components/ux/CheckoutForm";
import Loader from "@/components/Loader";



function CheckoutContent() {
    const searchParams = useSearchParams();
    const total = searchParams.get("total");

    return <CheckoutForm total={total} />;
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className=""><Loader /></div>}>

            <CheckoutContent />
        </Suspense>
    );
}
