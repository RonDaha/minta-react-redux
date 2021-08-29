import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import React, { Dispatch, useEffect, useState } from 'react'

import { GalleryItem } from './GalleryItem'
import { usePath } from '../hooks'
import { Campaign, Doc } from '../types'
import { ActionTypes, AppAction } from '../Store/actions'
import { Loader } from './Loader'
import { MainState } from '../Store/rootReducer'
import { RequestHandler } from '../utils/requestHandler'

const headerHeight: string = '65px'
const errorMsg: string = 'Seems like we having an issue :( please try later'
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

const ErrorMsg = styled.div`
    text-align: center;
    font-size: 18px;
`

const initialState = { isLoadingMore: false, hasError: false }
export const Gallery = () => {

    const path: string = usePath()
    const [localState, setLocalState] = useState(initialState)
    const dispatch = useDispatch<Dispatch<AppAction>>()
    const mainState: MainState = useSelector<MainState, MainState>((state: MainState) => state)
    let GalleryItemsToRender: any = []
    /* Access the campaign's data by the path (the 'slug' from the url) */
    if (path && mainState.useCaseDataBySlug[path]) {
        GalleryItemsToRender = mainState.useCaseDataBySlug[path].campaign.docs.map((doc: Doc) => {
            return <GalleryItem key={doc._id} videoUrl={doc.videos[0].url} poster={doc.videos[0].previewImage} />
        })
    }

    /* Init the default local state each time the route has been changed */
    useEffect(() => {
        setLocalState(initialState)
    }, [path])

    /* Load more implementation */
    const loadMore = async () => {
        setLocalState({ ...localState, isLoadingMore: true })
        const offset: number = mainState.useCaseDataBySlug[path].campaign.pagingCounter + 5
        const campaignId: string = mainState.useCaseDataBySlug[path].useCase.campaignId
        try {
            const campaignData: Campaign = await RequestHandler.getCampaignDataById(campaignId, offset)
            dispatch({ type: ActionTypes.SetCampaignData, payload: { slug: path, campaign: campaignData } })
            setLocalState({ ...localState, isLoadingMore: false })
        } catch (e) {
            console.error(e)
            setLocalState({ isLoadingMore: false, hasError: true })
        }
    }

    let buttonSection = null
    /* Display the 'Show More' btn in case the campaign hasNextPage */
    if (mainState && mainState.useCaseDataBySlug[path] && mainState.useCaseDataBySlug[path].campaign.hasNextPage) {
        buttonSection =
        <ButtonSectionWrapper className="btn-section">
            <ShowMoreBtn onClick={loadMore}>
                Show More
            </ShowMoreBtn>
        </ButtonSectionWrapper>
    }

    /* On Loading */
    if (localState.isLoadingMore) {
        buttonSection = <ButtonSectionWrapper className="btn-section"><Loader /></ButtonSectionWrapper>
    }

    /* On Error */
    if (localState.hasError) {
        buttonSection = <ButtonSectionWrapper className="btn-section">{errorMsg}</ButtonSectionWrapper>
    }

    return (
        <Container>
            <GalleryHeader>
                #{mainState?.useCaseDataBySlug[path]?.useCase?.name }
            </GalleryHeader>
            <GalleryContainer className="gallery-container">
                {GalleryItemsToRender}
                {buttonSection}
            </GalleryContainer>
            {mainState.error ? <ErrorMsg>{errorMsg}</ErrorMsg> : null}
        </Container>
    )
}
