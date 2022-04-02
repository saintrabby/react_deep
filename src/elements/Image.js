import React from 'react'
import styled from 'styled-components'

const Image = (props) => {

    const { shape, src, size } = props

    const styles = {
        src: src,
        size: size
    }

    if (shape === 'circle') {
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if (shape === 'rectangle') {
        return (
            <Outter>
                <Inner {...styles}></Inner>
            </Outter>
        )
    }

    return (
        <React.Fragment>

        </React.Fragment>
    )

}

export default Image;


Image.defaultProps = {
    shape: 'circle',
    src: 'https://w.namu.la/s/6a387f479b67f4763b7aaf2435b1060ed724476df1b29eca3e118bfc3b60e0b2ff21057fe02de8a3a81ba4401ace303e827b32c0f70b31647a3bd8fceff21425a4e7d5ade5d4d514df9a742881f441603fbfe9fa3595083d1c44504b61f8c3dd',
    size: 36
}

const Outter = styled.div`
    /* width: 100%; */
    width: 600px;
    min-width: 250px;
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