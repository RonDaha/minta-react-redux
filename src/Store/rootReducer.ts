import { combineReducers } from 'redux'
import { AppAction, ActionTypes } from './actions'

type MainState = {
    isLoading: boolean,
    useCases: string[],
    campaignDataBySlug: {}
}

const initialState: MainState = {
    isLoading: true,
    useCases: [],
    campaignDataBySlug: {}
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
