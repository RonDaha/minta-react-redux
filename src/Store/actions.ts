import { Campaign, UseCase } from '../types'

export enum ActionTypes {
    SetCampaignData = 'SET_CAMPAIGN_DATA',
    SetInitialData = 'SET_INITIAL_DATA',
    SetChosenSlug = 'SET_CHOSEN_SLUG'
}

export interface UseCaseData {
    useCase: UseCase,
    campaign: Campaign
}

export interface UseCaseDataBySlug {
    [key: string]: UseCaseData
}

export interface InitialDataPayload {
    useCases: UseCase[],
    useCaseDataBySlug: UseCaseDataBySlug,
    error?: Error
}

export interface ChosenSlugPayload {
    chosenSlug: string
}

export interface CampaignDataPayload {
    slug: string,
    campaign: Campaign
}

type Payload = InitialDataPayload | ChosenSlugPayload | CampaignDataPayload

export interface AppAction {
    type: ActionTypes,
    payload: Payload
}
