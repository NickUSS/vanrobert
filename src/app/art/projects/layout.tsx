import { Creepster } from 'next/font/google';

const creepster = Creepster({
    weight: '400',
    subsets: ['latin'],
});

export default function ProjectsLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    return (
        <div className={creepster.className}>
            {children}
        </div>
    );
}