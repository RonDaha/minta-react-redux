import { Campaign, UseCase } from '../types'

export enum ActionTypes {
    SetCampaignData = 'SET_CAMPAIGN_DATA',
    SetInitialData = 'SET_INITIAL_DATA',
    SetChosenSlug = 'SET_CHOSEN_SLUG'
}

export interface InitialDataPayload {
    useCases: UseCase[],
    useCaseDataBySlug: any, // TODO - add type
    error?: Error
}

export interface ChosenSlugPayload {
    chosenSlug: string
}

export interface CampaignData {
    slug: string,
    campaign: Campaign
}

type Payload = InitialDataPayload | ChosenSlugPayload | CampaignData
export interface AppAction {
    type: ActionTypes,
    payload: Payload
}
