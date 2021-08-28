import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ActionTypes, AppAction, InitialDataPayload } from './Store/actions'
import request from './request'
import { Sidebar } from './components/Sidebar'
import { Gallery } from './components/Gallery'
import { Campaign, UseCase } from './types'
import { AppState } from './Store/rootReducer'
import { Loader } from './components/Loader'
import { BrowserRouter as Router } from 'react-router-dom'


// TODO - move it
const mintaDevToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg0OGQ2YWU1MWMwNzQ5ODRhYTdlYjEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTU4NTc0NTI1OSwiZXhwIjoxNTg1ODMxNjU5fQ.S61K8RkHJ6qwxRjp9m2Pfvttd6hRBOyWRO3TimRkJA4'
const getCampaignData = (campaignId: string): Promise<Campaign> => {
    const url = `https://dev.withminta.com/generate-video/videos/findByCampaign?campaignId=${campaignId}&offset=6&limit=12&applicationSource=web`
    return request<Campaign>(url, { headers: { Authorization: mintaDevToken } })
}

const init = async (): Promise<InitialDataPayload> => {
    try {
        const useCasesResponse: UseCase[] = await request<UseCase[]>('https://run.mocky.io/v3/3eed5c28-1965-4ba9-ac00-6c8a9ca240ba')
        const campaignPromises: Promise<Campaign>[] = useCasesResponse.map((useCase: UseCase) => getCampaignData(useCase.campaignId))
        const campaignResponses = await Promise.allSettled(campaignPromises)
        console.log(campaignResponses)
        return {
            useCases: useCasesResponse,
            campaigns: campaignResponses
                // TODO
                // eslint-disable-next-line no-undef
                .filter((campaign: PromiseSettledResult<Campaign>) => campaign.status === 'fulfilled')
                // eslint-disable-next-line no-undef
                .map((campaign: PromiseSettledResult<Campaign>) => campaign.value)
        }
    } catch (e) {
        // TODO - handle Error here.
        console.log(e)
        return { useCases:[], campaigns: [], error: e }
    }
}


const AppContainer = styled.div`
  display: flex;
`


function App() {

    const dispatch = useDispatch<Dispatch<AppAction>>()
    const initApp = async (): Promise<void> => {
        const data: InitialDataPayload = await init()
        dispatch({ type: ActionTypes.SetInitialData, payload: data })
    }

    const { isLoading } = useSelector((state: AppState) => state.main)

    useEffect(() => {
        initApp()
    }, [])


  return (
      <Router>
          <AppContainer>
              {isLoading ? <Loader /> : null}
              <Sidebar/>
              <Gallery/>
          </AppContainer>
      </Router>
  )
}

export default App
