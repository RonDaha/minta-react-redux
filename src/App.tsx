import React, { Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ActionTypes, AppAction, InitialDataPayload } from './Store/actions'
import request from './request'
import { Sidebar } from './components/Sidebar'
import { Gallery } from './components/Gallery'
import { Campaign, UseCase } from './types'
import { AppState } from './Store/rootReducer'
import { AppLoader } from './components/Loader'
import { BrowserRouter as Router } from 'react-router-dom'


// TODO - move it
const mintaDevToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg0OGQ2YWU1MWMwNzQ5ODRhYTdlYjEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTU4NTc0NTI1OSwiZXhwIjoxNTg1ODMxNjU5fQ.S61K8RkHJ6qwxRjp9m2Pfvttd6hRBOyWRO3TimRkJA4'
const getCampaignData = (campaignId: string): Promise<Campaign> => {
    const url = `https://dev.withminta.com/generate-video/videos/findByCampaign?campaignId=${campaignId}&offset=0&limit=6&applicationSource=web`
    return request<Campaign>(url, { headers: { Authorization: mintaDevToken } })
}

const init = async (): Promise<InitialDataPayload> => {
    try {
        const useCasesResponse: UseCase[] = await request<UseCase[]>('https://run.mocky.io/v3/3eed5c28-1965-4ba9-ac00-6c8a9ca240ba')
        // TODO - add type
        const useCaseDataBySlug: any = {}
        const campaignPromises: Promise<void>[] = useCasesResponse.map((useCase: UseCase) => {
            return getCampaignData(useCase.campaignId)
                .then((campaign: Campaign) => {
                    if (!useCaseDataBySlug[useCase.slug]) {
                        useCaseDataBySlug[useCase.slug] = { useCase, campaign: {} }
                    }
                    useCaseDataBySlug[useCase.slug].campaign = campaign
                })
                .catch(e => {
                    // todo handle error here
                })
        })
        await Promise.allSettled(campaignPromises)
        return {
            useCases: useCasesResponse,
            useCaseDataBySlug
        }
    } catch (e) {
        // TODO - handle Error here.
        console.log(e)
        return { useCases:[], useCaseDataBySlug: {}, error: e }
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
              {isLoading ? <AppLoader /> : null}
              <Sidebar/>
              <Gallery/>
          </AppContainer>
      </Router>
  )
}

export default App
