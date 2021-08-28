import { Campaign, UseCase } from '../types'

export enum ActionTypes {
    SetInitialData = 'SET_INITIAL_DATA',
    SetChosenSlug = 'SET_CHOSEN_SLUG'
}

export interface InitialDataPayload {
    useCases: UseCase[],
    useCaseDataBySlug: any,
    error?: Error
}

export interface ChosenSlugPayload {
    chosenSlug: string
}

export interface AppAction {
    type: ActionTypes,
    payload: InitialDataPayload | ChosenSlugPayload
}
