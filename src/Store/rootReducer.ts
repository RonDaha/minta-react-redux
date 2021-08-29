import { AppAction, ActionTypes, UseCaseDataBySlug, CampaignDataPayload } from './actions'
import { UseCase } from '../types'

export type MainState = {
    isLoading: boolean,
    chosenSlug: string,
    useCases: UseCase[],
    useCaseDataBySlug: UseCaseDataBySlug,
    error: Error | null
}

const initialState: MainState = {
    isLoading: true,
    chosenSlug: '',
    useCases: [],
    /* The 'slug' will be use as the key for easy access to the relevant data */
    useCaseDataBySlug: {},
    error: null
}

const rootReducer = (state: MainState = initialState, action: AppAction) => {
    switch(action.type) {
        case ActionTypes.SetInitialData:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        case ActionTypes.SetChosenSlug:
            return {
                ...state,
                ...action.payload
            }
        case ActionTypes.SetCampaignData:
            if ('slug' in action.payload) {
                const payload: CampaignDataPayload = action.payload
                const docsBag = [...state.useCaseDataBySlug[payload.slug].campaign.docs, ...payload.campaign.docs]
                state.useCaseDataBySlug[payload.slug].campaign = { ...payload.campaign }
                state.useCaseDataBySlug[payload.slug].campaign.docs = docsBag
            }
            return {
                ...state
            }
        default:
            return state
    }
}

export default rootReducer
