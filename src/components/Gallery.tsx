import styled from 'styled-components'
import { GalleryItem } from './GalleryItem'
import { useSelector } from 'react-redux'
import { AppState } from '../Store/rootReducer'
import { usePath } from '../hooks'

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
    row-gap: 30px;
    column-gap: 30px;
    max-height: calc(100vh - ${headerHeight});
    overflow-y: scroll;
    align-items: center;
    justify-items: center;
    padding: 40px;
`

const ShowMoreBtnWrapper = styled.div`
    width: 100%;
    text-align: center;
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


    const path = usePath()
    // TODO - add type
    const appState: any = useSelector<AppState>((state: AppState) => state.main)
    // TODO - add type
    let GalleryItemsToRender: any = []
    if (path && appState.useCaseDataBySlug[path]) {
        // TODO - add type
        GalleryItemsToRender = appState.useCaseDataBySlug[path].campaign.docs.map((doc: any) => {
            return <GalleryItem key={doc._id} videoUrl={doc.videos[0].url} poster={doc.videos[0].previewImage} />
        })
    }
    return (
        <Container>
            <GalleryHeader>
                #{appState?.useCaseDataBySlug[path]?.useCase?.name }
            </GalleryHeader>
            <GalleryContainer>
                {GalleryItemsToRender}
                <GalleryItem />
            </GalleryContainer>
            <ShowMoreBtnWrapper>
                <ShowMoreBtn>
                    Show More
                </ShowMoreBtn>
            </ShowMoreBtnWrapper>
        </Container>
    )
}
