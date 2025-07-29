export interface Image {
    id: string;
    imageUrl: string;
    description?: string;
    position: number;
    createdAt?: Date;
    updatedAt?: Date;
    responsiveMode?: string;
    tag?: string;
    venueId: string;
    group?: string;
}

export interface Question {
    id: string;
    question: string;
    response: string;
    createdAt: Date;
    updatedAt: Date;
    venueId: string;
}

export interface Service {
    id: string;
    name: string;
    price: number;
    venueId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Text {
    id: string;
    area: string;
    title?: string;
    position: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    venueId: string;
}

export interface VenueWithRelations {
    id: string;
    minimumNights: number | null;
    maxGuest: number;
    facebookUrl: string | null;
    instagramUrl: string | null;
    tiktokUrl: string | null;
    email: string | null;
    logoUrl: string | null;
    name: string;
    whatsappNumber: string | null;
    images: Image[];
    texts: Text[];
    questions: Question[];
    services: Service[];
}

export interface VenueResponse {
    success: boolean;
    message: string;
    data: VenueWithRelations;
    count: number;
    type: string;
} 