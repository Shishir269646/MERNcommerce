'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import TopHeader from "@/components/ux/topHeader";
import Navbar from "@/components/ux/Navbar";
import Footer from "@/components/ux/Footer";

export default function LayoutClient({ children }) {
    return (
        <Provider store={store}>
            <TopHeader />
            <Navbar />
            {children}
            <Footer />
        </Provider>
    );
}
