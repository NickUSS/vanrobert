// data.ts
export interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    image: string;
    status?: string;
    description?: string;
    content?: string;
}

export const upcomingEvents: Event[] = [
    {
        id: 1,
        title: "Art Basel Miami",
        date: "Dec 15-20, 2024",
        location: "Miami Beach, FL",
        image: "/images/courses/1.jpg",
        status: "Coming Soon"
    },
    {
        id: 2,
        title: "Venice Biennale",
        date: "Apr 20 - Nov 24, 2024",
        location: "Venice, Italy",
        image: "/images/courses/2.jpg",
        status: "Registration Open"
    },
    {
        id: 3,
        title: "Paris Art Fair",
        date: "Mar 15-17, 2024",
        location: "Paris, France",
        image: "/images/courses/3.jpg",
        status: "Limited Spots"
    }
];

export const pastEvents: Event[] = [
    {
        id: 1,
        title: "Modern Art Showcase",
        date: "November 2023",
        location: "New York City",
        description: "A groundbreaking exhibition featuring contemporary pieces that challenged traditional perspectives.",
        image: "/images/courses/4.jpg",
        content: "The exhibition was a tremendous success, attracting over 5,000 visitors and receiving acclaim from art critics worldwide..."
    },
    {
        id: 2,
        title: "Colors of Freedom",
        date: "September 2023",
        location: "London",
        description: "An exploration of abstract expressionism and its influence on modern freedom movements.",
        image: "/images/courses/5.jpg",
        content: "The exhibition showcased how art can be a powerful medium for social change..."
    },
    {
        id: 3,
        title: "Urban Perspectives",
        date: "August 2023",
        location: "Berlin",
        description: "A unique view into the intersection of street art and classical techniques.",
        image: "/images/courses/6.jpg",
        content: "This exhibition brought together artists from different backgrounds to create..."
    }
];