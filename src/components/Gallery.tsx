import styled from 'styled-components'
import { GalleryItem } from './GalleryItem'

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
    return (
        <Container>
            <GalleryHeader>
                #New In
            </GalleryHeader>
            <GalleryContainer>
                <GalleryItem/>
                <GalleryItem/>
                <GalleryItem/>
                <GalleryItem/>
                <GalleryItem/>
                <GalleryItem/>
            </GalleryContainer>
            <ShowMoreBtnWrapper>
                <ShowMoreBtn>
                    Show More
                </ShowMoreBtn>
            </ShowMoreBtnWrapper>
        </Container>
    )
}
