export interface UseCase {
    behavior: string;
    campaignId: string;
    createdAt: string;
    description: string;
    isEnabled: boolean;
    name: string;
    order: number;
    slug: string;
    updatedAt: string;
    __v: number;
}

export interface Campaign {
    docs: Doc[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: boolean;
    nextPage: number;
    offset: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
}

export interface Doc {
    _id: string;
    videos: DocVideo[];
}

export interface DocVideo {
    previewImage: string;
    url: string;
}

export interface GalleryItemProps {
    videoUrl: string;
    poster: string;
}
