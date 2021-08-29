import request from './request'
import { InitialDataPayload, UseCaseDataBySlug } from '../Store/actions'
import { Campaign, UseCase } from '../types'


/*
This 3 variables should be move to ENV
I left it here to simplify the review
*/
const mintaDevToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg0OGQ2YWU1MWMwNzQ5ODRhYTdlYjEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTU4NTc0NTI1OSwiZXhwIjoxNTg1ODMxNjU5fQ.S61K8RkHJ6qwxRjp9m2Pfvttd6hRBOyWRO3TimRkJA4'
const useCasesUrl = 'https://run.mocky.io/v3/3eed5c28-1965-4ba9-ac00-6c8a9ca240ba'
const baseCampaignUrl = 'https://dev.withminta.com/generate-video/videos/findByCampaign'

/*
Responsible for handling and manipulating data
received from the 'request' function
*/
export const RequestHandler = {
    async init (): Promise<InitialDataPayload> {
        try {
            const useCasesResponse: UseCase[] = await request<UseCase[]>(useCasesUrl)
            const useCaseDataBySlug: UseCaseDataBySlug = {}
            const campaignPromises: Promise<void>[] = useCasesResponse.map((useCase: UseCase) => {
                return RequestHandler.getCampaignDataById(useCase.campaignId)
                    .then((campaign: Campaign) => {
                        useCaseDataBySlug[useCase.slug] = { useCase, campaign: campaign }
                    })
                    .catch(console.error)
            })
            await Promise.allSettled(campaignPromises)
            return { useCases: useCasesResponse, useCaseDataBySlug }
        } catch (e) {
            console.error(e)
            return { useCases:[], useCaseDataBySlug: {}, error: e }
        }
    },
    async getCampaignDataById (campaignId: string, offset = 0): Promise<Campaign> {
        const url = `${baseCampaignUrl}?campaignId=${campaignId}&offset=${offset}&limit=6&applicationSource=web`
        return request<Campaign>(url, { headers: { Authorization: mintaDevToken } })
    }

}
