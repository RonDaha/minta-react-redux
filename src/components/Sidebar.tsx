import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../Store/rootReducer'
import { useHistory } from 'react-router-dom'
import { UseCase } from '../types'
import { Dispatch } from 'react'
import { ActionTypes, AppAction } from '../Store/actions'

const Container = styled.div`
  width: 300px;
  background-color: #282828;
  color: #fff;
  height: 100vh;
`

const Title = styled.h1`
    font-size: 20px;
    padding: 15px 20px;
`

const UseCaseStyle = styled.h2`
    font-size: 14px;
    line-height: 22px;
    padding: 6px 20px;
    cursor: pointer;
    font-weight: 300;
    transition: background-color .2s;
    &.active {
        background-color: #09bba6;
    }
    &:hover {
        background-color: #09bba6;
    }
`

export const Sidebar = () => {

    let history = useHistory()
    const dispatch = useDispatch<Dispatch<AppAction>>()
    // TODO
    const appState: any = useSelector<AppState>((state: AppState) => state.main)
    const setChosenSlug = (slug: string) => {
        dispatch({ type: ActionTypes.SetChosenSlug, payload: { chosenSlug: slug } })
        history.push('/' + slug)
    }
    const useCasesToDisplay = appState.useCases.map((useCase: UseCase) => {
        return <UseCaseStyle className={appState.chosenSlug === useCase.slug ? 'active' : ''} key={useCase.slug} onClick={() => setChosenSlug(useCase.slug)}>
            # {useCase.name}
        </UseCaseStyle>
    })


    return (
        <Container>
            <Title>
                Mints
            </Title>
            <div className="categories-container">
                {useCasesToDisplay}
            </div>
        </Container>
    )
}
