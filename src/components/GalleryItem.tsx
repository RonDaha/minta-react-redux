import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react'
import PlayIcon from '../assets/icons/play.png'
import PauseIcon from '../assets/icons/pause.png'
import { GalleryItemProps } from '../types'

const ControlIcon = styled.img`
    width: 65px;
    height: 65px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    transition: .2s;
    &.hide-on-play { 
        opacity: 0;
    }
`

const Item = styled.div`
    width: 226px;
    height: 282px;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    position: relative;
    cursor: pointer;
    &:hover {
        ${ControlIcon} {
        opacity: 1;
        &.hide-on-play { 
            opacity: 1;
        }
    }
`

export const GalleryItem = ({ videoUrl, poster }: GalleryItemProps) => {

    const videoRef: any = useRef(null)
    const [state, setState] = useState({ isPlay: false })

    useEffect(() => {
        if (videoRef) {
            videoRef.current.addEventListener('pause', () => {
                setState({ ...state, isPlay: false })
            })
            videoRef.current.addEventListener('play', () => {
                setState({ ...state, isPlay: true })
            })
        }
    }, [])

    const controlVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    return (
        <Item onClick={controlVideo}>
            {state.isPlay ? <ControlIcon className='hide-on-play' src={PauseIcon} alt="play-icon"/> : <ControlIcon src={PlayIcon} alt="play-icon"/> }
            <video ref={videoRef} width="100%" height="100%" poster={poster}>
                <source src={videoUrl} type="video/mp4"/>
                Sorry, your browser does not support embedded videos.
            </video>
        </Item>
        )

}
