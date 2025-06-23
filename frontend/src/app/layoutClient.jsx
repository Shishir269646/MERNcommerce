'use client';

import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import TopHeader from '@/components/ux/topHeader';
import Navbar from '@/components/ux/Navbar';
import Footer from '@/components/ux/Footer';

export default function LayoutClient({ children }) {
    const pathname = usePathname();


    const hideLayout =
        pathname === '/login' ||
        pathname === '/register' ||
        pathname.startsWith('/admin');
        

    return (
        <Provider store={store}>
            {!hideLayout && <TopHeader />}
            {!hideLayout && <Navbar />}
            <main>{children}</main>
            {!hideLayout && <Footer />}
        </Provider>
    );
}
