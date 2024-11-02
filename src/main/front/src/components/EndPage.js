import React, {useEffect, useState, useContext, useCallback} from "react";
import { useLocation, Link } from 'react-router-dom';
import { AppContext } from '../App';
import Stack from "@mui/material/Stack";
import axios from "axios";
import Button from "@mui/material/Button";

function EndPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const apiKey = queryParams.get('api_key');
    const { baseUrl } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState('btn1');
    const [selectedImage, setSelectedImage] = useState(''); // 선택된 이미지 URL 상태 추가

    const handleClick = (btn, imgUrl) => {
        setActiveButton(btn);
        setSelectedImage(imgUrl); // 클릭한 이미지 URL을 상태에 저장
    }

    const getGeneratedImage = useCallback(async () => {
        try {
            const res = await axios.get(`${baseUrl}/getGeneratedImage`, {
                params: { api_key: apiKey }
            });
            setData(res.data);
            setSelectedImage(res.data[0].imageDir)
        } catch (err) {
            console.error(err);
        }
    }, [apiKey, baseUrl]); // apiKey와 baseUrl 의존성

    useEffect(() => {
        getGeneratedImage();
    }, [getGeneratedImage]);

    const downloadImage = () => {
        if (selectedImage) {
            const link = document.createElement('a');
            link.href = selectedImage; // 선택된 이미지 URL
            link.download = selectedImage.split('/').pop(); // URL에서 파일 이름 추출
            document.body.appendChild(link); // link를 DOM에 추가
            link.click(); // 클릭 이벤트 발생
            document.body.removeChild(link); // link 제거
        } else {
            alert("이미지를 선택해 주세요."); // 선택된 이미지가 없을 때 경고
        }
    };

    return (
        <div className="endpage-div">
            <Stack direction="row">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <button
                            key={index}
                            className={`select-img-btn2 ${activeButton === `btn${index + 1}` ? 'active' : ''}`}
                            onClick={() => handleClick(`btn${index + 1}`, item.imageDir)} // 버튼 클릭 시 올바른 인자 전달
                        >
                            <img src={item.imageDir} className="generation-img" alt={`Generated ${index + 1}`} />
                        </button>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Stack>
            <Stack direction="column" className="show-img">
                {[...Array(4)].map((_, index) => (  // 4개의 div를 생성
                    <div className={`box img${index + 1}`} key={index}>
                        {selectedImage ? (
                            <img src={selectedImage} alt="" />
                        ) : (
                            <p>이미지를 로드할 수 없습니다.</p>
                        )}
                    </div>
                ))}
            </Stack>
            <div className="endpage-btn-div">
                <Button className="" variant="contained" color="primary" onClick={downloadImage}>
                    다운로드
                </Button>
                <Link to={"/Survey"}>
                    <Button className="" variant="contained" color="primary">
                        처음으로
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default EndPage;