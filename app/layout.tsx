import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import ClientProvider from "@/components/ClientProvider";
import AppLayout from "@/components/AppLayout";

export const metadata: Metadata = {
    title: "Generator",
    description: "Create your own generator",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <head></head>
            <body>
                <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
                    <ClientProvider>
                        <AppLayout>{children}</AppLayout>
                    </ClientProvider>
                </NextAppDirEmotionCacheProvider>
            </body>
        </html>
    );
};

export default RootLayout;
