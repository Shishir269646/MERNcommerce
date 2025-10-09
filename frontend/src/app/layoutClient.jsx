'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from '@/store/store';
import { loadUserFromStorage } from '@/redux/userSlice';
import { setUser } from '@/redux/authSlice';
import dynamic from 'next/dynamic';



const DynamicTopHeader = dynamic(() => import('@/components/ui/topHeader'), { ssr: false });
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Loader from '@/components/ui/Loader';


function LayoutInitializer({ children }) {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const { user, loading } = useSelector((state) => state.user);
    const [hydrated, setHydrated] = useState(false);
    const [checkingAccess, setCheckingAccess] = useState(true);

    

    useEffect(() => {
        const userData = dispatch(loadUserFromStorage());
        dispatch(setUser(userData.payload));
        setHydrated(true);
    }, [dispatch]);

   
    useEffect(() => {
        if (!hydrated) return;

        const isAdminRoute = pathname.startsWith('/admin');

        if (!loading) {
            const isAdmin = user?.isAdmin === true;
            if (isAdminRoute && (!user || !isAdmin)) {
                router.replace('/');
                return;
            }
            setCheckingAccess(false);
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
            {!hideLayout && <DynamicTopHeader />}
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
