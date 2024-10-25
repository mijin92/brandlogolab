import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import logo from '../image/ex-removebg-preview.png';
import React from "react";

function StartPage() {
    return (
        <div className="survey text-center">
            <div className="logo-div">
                <img src={logo} />
            </div>
            <div className="content-div startpage-div">
                <h1>로고 만들기를 시작해 보세요!</h1>
                <span className="description-span">질문에 답 해보세요, 브랜드의 특징이 잘 살려진 로고 디자인을 선물해 드릴게요 😊 !</span>
            </div>
            <div className="button-div">
                <Link to={"/Survey"}>
                    <Button className="common-button f-right" variant="contained" color="pupleblue">START</Button>
                </Link>
            </div>
        </div>
    )

}
export default StartPage;