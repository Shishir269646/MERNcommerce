'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store/store';
import { loadUserFromStorage } from '@/redux/userSlice';

import TopHeader from '@/components/ux/topHeader';
import Navbar from '@/components/ux/Navbar';
import Footer from '@/components/ux/Footer';
import Loader from '@/components/Loader';

function LayoutInitializer({ children }) {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const { user, loading } = useSelector((state) => state.user);
    const [hydrated, setHydrated] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(true);

    // ✅ First: Load user from localStorage
    useEffect(() => {
        dispatch(loadUserFromStorage());
        setHydrated(true); // hydration complete
    }, [dispatch]);

    // ✅ Wait until hydration is done before checking access
    useEffect(() => {
        if (!hydrated) return;

        const isAdminRoute = pathname.startsWith('/admin');

        if (!loading) {
            const isAdmin = user?.isAdmin === true;
            if (isAdminRoute && (!user || !isAdmin)) {
                router.replace('/');
                return;
            }
            setCheckingAccess(false); // allow render
        }
    }, [pathname, user, loading, hydrated, router]);

    const hideLayout =
        pathname === '/login' ||
        pathname === '/register' ||
        pathname.startsWith('/admin');

    if (checkingAccess && pathname.startsWith('/admin')) {
        return <Loader />;
    }

    return (
        <>
            {!hideLayout && <TopHeader />}
            {!hideLayout && <Navbar />}
            <main>{children}</main>
            {!hideLayout && <Footer />}
        </>
    );
}

export default function LayoutClient({ children }) {
    return (
        <Provider store={store}>
            <LayoutInitializer>{children}</LayoutInitializer>
        </Provider>
    );
}
