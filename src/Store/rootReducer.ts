import { combineReducers } from 'redux'
import { AppAction, ActionTypes } from './actions'

type MainState = {
    isLoading: boolean,
    useCases: string[],
    useCaseDataBySlug: any
}

const initialState: MainState = {
    isLoading: true,
    useCases: [],
    useCaseDataBySlug: {}
}

const MainReducer = (state: MainState = initialState, action: AppAction) => {
    switch(action.type) {
        case ActionTypes.SetInitialData:
            return {
                // TODO
                ...state,
                isLoading: false,
                ...action.payload,
            }
        case ActionTypes.SetChosenSlug:
            return {
                ...state,
                ...action.payload,
            }
        case ActionTypes.SetCampaignData:
            // TODO
            // @ts-ignore
            // eslint-disable-next-line no-case-declarations
            const docsBag = [...state.useCaseDataBySlug[action.payload.slug].campaign.docs, ...action.payload.campaign.docs ]
            // @ts-ignore
            state.useCaseDataBySlug[action.payload.slug].campaign = { ...action.payload.campaign }
            // @ts-ignore
            state.useCaseDataBySlug[action.payload.slug].campaign.docs = docsBag

            return {
                ...state,

            }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    main: MainReducer,
})

// eslint-disable-next-line no-undef
export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
