import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ActionTypes, AppAction, InitialDataPayload } from './Store/actions'
import { Sidebar } from './components/Sidebar'
import { Gallery } from './components/Gallery'
import { AppLoader } from './components/Loader'
import { usePath } from './hooks'
import { RequestHandler } from './utils/requestHandler'
import { MainState } from './Store/rootReducer'

const App = () => {

    const dispatch: Dispatch<AppAction> = useDispatch<Dispatch<AppAction>>()
    const path: string = usePath()
    const history = useHistory()
    const { isLoading, useCaseDataBySlug }: MainState = useSelector((state: MainState) => state)

    const initApp = async (): Promise<void> => {
        const data: InitialDataPayload = await RequestHandler.init()
        dispatch({ type: ActionTypes.SetInitialData, payload: data })
    }

    /* Fetch the essential data to init the app */
    useEffect(() => {
        initApp()
    }, [])

    /*
    Default to the first available slug
    in case the user manually typed
    none-existing slug on the URL
    */
    useEffect(() => {
        const slugKeys = Object.keys(useCaseDataBySlug)
        const slug: string = slugKeys.includes(path) ? path : slugKeys[0]
        if (slug) {
            dispatch({ type: ActionTypes.SetChosenSlug, payload: { chosenSlug: slug } })
            history.push('/' + slug)
        }
    }, [isLoading])


  return (
      <div className="App">
          {isLoading ? <AppLoader /> : null}
          <Sidebar/>
          <Gallery/>
      </div>
  )
}

export default App
