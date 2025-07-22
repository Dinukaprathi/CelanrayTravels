import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/Marquee";
import Image from "next/image";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, body }: { img: string; name: string; username: string; body: string }) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-100/20 p-4",
                " bg-gray-950/[.01]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <p className="p-small">{name}</p>
                </div>
            </div>
            <blockquote className="mt-2 p text-gray-200">{body}</blockquote>
        </figure>
    );
};

export default function Testimonials() {
    return (
        <div className="relative flex h-[500px] my-48 p-large max-w-[1560px] mx-auto w-full flex-col items-center justify-center overflow-hidden">
            <div className="text-center">
                <h2>From our community</h2>
                <p className="text-gray-200 max-w-[400px] mt-4">Here&apos;s what fellow travelers had to say about their journeys with us.</p>
            </div>
            <Marquee pauseOnHover className="[--duration:45s] mt-16">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:45s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
        </div>
    );
}
