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

/* The 'CampaignData' that has been fetched from the backend */
export interface CampaignData {
    // docs: (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
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

/* The enriched 'Campaign' which will be used in the app */
export interface Campaign extends CampaignData {
    useCaseSlug: string
}

export interface Doc {

}
