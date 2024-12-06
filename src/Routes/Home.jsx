// import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ step }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (step != -1) {
            // console.log(1);
            navigate("/install")
        }
    }, [])
    return <></>
}

export default Home