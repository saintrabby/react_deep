import React from "react";
import { useHistory } from "react-router";
import { Grid, Text, Button } from "../elements";
import { deleteCookie, getCookie, setCookie } from "../shared/Cookie";


const Header = () => {
    const [is_login, setIsLogin] = React.useState(false)

    React.useEffect(() => {
        let cookie = getCookie('user_id')
        console.log(cookie)

        if (cookie) {
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
    }, [is_login])

    if (is_login) {
        return (
            <React.Fragment>
                <Grid is_flex >
                    <Grid>
                        <Text margin='0px' size='24px' bold>헬로</Text>
                    </Grid>

                    <Grid is_flex>
                        <Button text='내정보'></Button>
                        <Button text='알림'></Button>
                        <Button text='로그아웃' _onClick={() => {
                            deleteCookie('user_id')
                            deleteCookie('user_pw')
                        }}></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    else {
        return (
            <React.Fragment>
                <Grid is_flex >
                    <Grid>
                        <Text margin='0px' size='24px' bold>헬로</Text>
                    </Grid>

                    <Grid is_flex >
                        <Button text='로그인' _onClick={() => {
                            setCookie('user_id', 'name')
                            setCookie('user_pw', 'pppp')
                        }}></Button>
                        <Button text='회원가입'></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

Header.defaultProps = {

}


export default Header;