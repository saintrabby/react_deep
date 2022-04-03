import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid, Input, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Signup = () => {
    const [id, setId] = React.useState('')
    const [pw, setPw] = React.useState('')
    const [pw_check, setPwCheck] = React.useState('')
    const [userName, setUserName] = React.useState('')

    const dispatch = useDispatch()

    const signup = () => {
        
        if (id === '' || pw === '' || userName === '') {
            window.alert('모두 입력해주세요')
            return
        }

        if (!emailCheck(id)) {
            window.alert('이메일 형식이 맞지 않습니다')
            return
        }

        if (pw !== pw_check) {
            window.alert('비밀번호가 일치하지 않습니다')
            return
        }

        dispatch(userActions.signupFB(id, pw, userName))
    }

    return (
        <React.Fragment>
            <Grid padding='16px'>
                <Text size='32px' bold>회원가입</Text>

                <Grid padding='16px 0px'>
                    <Input label='아이디' placeholder='아이디를 입력해주세요' _onChange={(e) => { setId(e.target.value) }}></Input>
                </Grid>

                <Grid padding='16px 0px'>
                    <Input label='닉네임' placeholder='닉네임을 입력해주세요' _onChange={(e) => { setUserName(e.target.value) }}></Input>
                </Grid>

                <Grid padding='16px 0px'>
                    <Input type='password' label='비밀번호' placeholder='비밀번호를 입력해주세요' _onChange={(e) => { setPw(e.target.value) }}></Input>
                </Grid>

                <Grid padding='16px 0px'>
                    <Input type='password' label='비밀번호 확인' placeholder='비밀번호를 다시 입력해주세요' _onChange={(e) => { setPwCheck(e.target.value) }}></Input>
                </Grid>

                <Button text='회원가입하기' _onClick={() => {
                    signup()
                }}></Button>
            </Grid>
        </React.Fragment>
    )
}

Signup.defaultProps = {

}

export default Signup;