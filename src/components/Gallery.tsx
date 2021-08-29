import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GalleryItem } from './GalleryItem'
import { AppState } from '../Store/rootReducer'
import { usePath } from '../hooks'
import request from '../request'
import { Campaign } from '../types'
import { ActionTypes, AppAction } from '../Store/actions'
import { Dispatch, useState } from 'react'
import { Loader } from './Loader'

const headerHeight = '65px'

const Container = styled.div`
    flex-grow: 2;
`

const GalleryHeader = styled.div`
  display: flex;
  font-size: 20px;
  height: ${headerHeight};
  line-height: ${headerHeight};
  padding: 0 20px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
`

const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
    column-gap: 30px;
    max-height: calc(100vh - ${headerHeight});
    overflow-y: scroll;
    align-items: center;
    justify-items: center;
    padding: 40px;
`

const ButtonSectionWrapper = styled.div`
    width: 100%;
    text-align: center;
    grid-column: 1 / 4
`

const ShowMoreBtn = styled.button`
    width: 140px;
    height: 40px;
    margin: 20px auto;
    border-radius: 5px;
    text-align: center;
    font-size: 16px;
    line-height: 16px;
    border: 1px solid #000;
    cursor: pointer;
    background-color: #fff;
    transition: .2s;
    &:hover {
        background-color: #000;
        color: #fff;
    }
`

export const Gallery = () => {


    const path: string = usePath()
    let history = useHistory()
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const dispatch = useDispatch<Dispatch<AppAction>>()

    const appState: any = useSelector<AppState>((state: AppState) => state.main)
    // TODO - add type
    let GalleryItemsToRender: any = []

    if (path) {
        // TODO - add type
        if (appState.useCaseDataBySlug[path]) {
            GalleryItemsToRender = appState.useCaseDataBySlug[path].campaign.docs.map((doc: any) => {
                return <GalleryItem key={doc._id} videoUrl={doc.videos[0].url} poster={doc.videos[0].previewImage} />
            })
        }
    }



    const loadMore = async () => {
        setIsLoadingMore(true)
        const offset = appState.useCaseDataBySlug[path].campaign.pagingCounter + 5
        const campaignId: string = appState.useCaseDataBySlug[path].useCase.campaignId
        const mintaDevToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg0OGQ2YWU1MWMwNzQ5ODRhYTdlYjEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTU4NTc0NTI1OSwiZXhwIjoxNTg1ODMxNjU5fQ.S61K8RkHJ6qwxRjp9m2Pfvttd6hRBOyWRO3TimRkJA4'
        const url = `https://dev.withminta.com/generate-video/videos/findByCampaign?campaignId=${campaignId}&offset=${offset}&limit=6&applicationSource=web`
        // TODO
        const res: any = await request<Campaign>(url, { headers: { Authorization: mintaDevToken } })
        dispatch({ type: ActionTypes.SetCampaignData, payload: { slug: path, campaign: res } })
        setIsLoadingMore(false)
    }

    let buttonSection = null
    if (appState && appState.useCaseDataBySlug[path] && appState.useCaseDataBySlug[path].campaign.hasNextPage) {
        buttonSection = <ButtonSectionWrapper>
            <ShowMoreBtn onClick={loadMore}>
                Show More
            </ShowMoreBtn>
        </ButtonSectionWrapper>
    }

    if (isLoadingMore) {
        buttonSection = <ButtonSectionWrapper><Loader /></ButtonSectionWrapper>
    }

    return (
        <Container>
            <GalleryHeader>
                #{appState?.useCaseDataBySlug[path]?.useCase?.name }
            </GalleryHeader>
            <GalleryContainer>
                {GalleryItemsToRender}
                {buttonSection}
            </GalleryContainer>
        </Container>
    )
}
