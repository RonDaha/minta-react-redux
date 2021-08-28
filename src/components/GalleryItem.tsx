import styled from 'styled-components'
import PlayIcon from '../assets/icons/play.png'
import PauseIcon from '../assets/icons/pause.png'
import { useEffect, useRef, useState } from 'react'


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

export const GalleryItem = () => {

    const videoRef = useRef(null)
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
            <video ref={videoRef} width="100%" height="100%" poster="https://campaigns.withminta.com/2938/0000/eysj2bk8il1c26r1w25w18y1u202m3ikr11jhm3ji_image1.jpg">
                <source src="https://campaigns.withminta.com/2938/0000/eysj2bk8il1c26r1w25w18y1u202m3ikr11jhm3ji.mp4" type="video/mp4"/>
                Sorry, your browser does not support embedded videos.
            </video>
        </Item>
        )

}
