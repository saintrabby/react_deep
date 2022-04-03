import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Text, Input, Grid, Button } from "../elements";

import { deleteCookie, getCookie, setCookie } from '../shared/Cookie'

import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/common";

const Login = (props) => {
  const [id, setId] = React.useState('')
  const [pw, setPw] = React.useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const login = () => {
    console.log(id)
    
    if (id === '' || pw === '') {
      window.alert('모두 입력해주세요')
      return
    }

    if(!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다')
      return
    }

    dispatch(userActions.loginFB(id, pw))
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value)
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type='password'
            label="패스워드"
            placeholder="패스워드 입력해주세요."
            _onChange={(e) => {
              setPw(e.target.value)
            }}
          />
        </Grid>

        <Button
          text="로그인하기"
          _onClick={() => {
            console.log("로그인 했어!");
            login()
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;