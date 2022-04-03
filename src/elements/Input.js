import React from 'react'
import styled from 'styled-components'
import { Grid, Text } from './index'

const Input = (props) => {

    const { label, placeholder, _onChange } = props

    return (
        <React.Fragment>
            <Grid>
                <Text>{label}</Text>
                <ElInput placeholder={placeholder} onChange={_onChange}></ElInput>
            </Grid>
        </React.Fragment>
    )
}

Input.defalutProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력해주세요',
    _onChange: () => { }
}

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`

export default Input;