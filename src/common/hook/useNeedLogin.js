import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthStatus } from "../constant";

//로그인 하지않았으면 막는 커스텀 훅
export default function useNeedLogin() {
    const history = useHistory();
    const status = useSelector(state => state.auth.status);
    useEffect(() => {
        if (status === AuthStatus.NotLogin)
            history.replace('/login');
    }, [status, history]);
}