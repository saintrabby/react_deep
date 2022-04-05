import React from "react"
import { useHistory, useParams } from "react-router"
import styled from 'styled-components'

const Image = (props) => {

    // const param = useParams()

    const { shape, src, size } = props

    const styles = {
        src, size
    }

    // const history = useHistory()

    // const goDetail = () => {
    //     history.push('/detail/' + param)
    // }

    if (shape === 'circle') {
        return (
            <React.Fragment>
                <ImageCircle {...styles}></ImageCircle>
            </React.Fragment>
        )
    }

    if (shape === 'rectangle') {
        return (
            <React.Fragment>
                <Outter>
                    <Inner {...styles}></Inner>
                </Outter>
            </React.Fragment>
        )
    }
}

Image.defaultProps = {
    shape: 'circle',
    src: 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd',
    size: 36,
}

const Outter = styled.div`
    width: 95%;
    min-width: 250px;
    margin: 16px;
`

const Inner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url('${(props) => props.src}');
    background-size: cover;
`

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url('${(props) => props.src}');
    background-size: cover;
    margin: 4px;
`

export default Image;