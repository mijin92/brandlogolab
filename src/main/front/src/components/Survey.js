import React, {useState, useEffect, useRef, useContext} from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import axios from "axios";
import LoadingSpinner from './LoadingSpinner'; // 위에서 만든 로딩 스피너 컴포넌트

function Survey() {
    const navigate = useNavigate();
    const { baseUrl } = useContext(AppContext);
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [activeStep, setActiveStep] = useState(0);
    const [formValues, setFormValues] = useState({
        brand_nm: '',
        brand_summary: '',
        business: '',
        logo_style: ''
    }); // 각 스텝의 입력 값을 저장할 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태

    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (btn) => () => {
        setActiveButton(btn);
        setFormValues({
            ...formValues,
            logo_type: btn
        });
    }

    const inputRef = useRef(null);
    const steps = ['brand_nm', 'brand_summary', 'business', 'logo_style', 'logo_type'];

    // 디바운스 제어를 위한 플래그 (useRef를 이용해서 상태 변경 없이 유지)
    const isDebounced = useRef(false);

    const handleNext = () => {

        // 디바운스 처리: 플래그가 true이면 아무것도 하지 않음
        if (isDebounced.current) return;

        isDebounced.current = true;  // 함수가 실행되면 플래그 true로 설정
        setTimeout(() => {
            isDebounced.current = false;  // 500ms 후에 플래그 초기화
        }, 500);  // 디바운스 시간 설정

        // 현재 스텝의 입력값이 비어있는지 확인
        if (activeStep < 4 && !formValues[steps[activeStep]].trim()) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
            setErrorMessage('내용을 입력 해주세요.'); // 경고 메시지 표시
            return; // 빈 입력값이 있으면 다음 스텝으로 넘어가지 않음
        } else {
            setErrorMessage('');
        }

        // 이미지 선택을 안했을 경우
        if (activeStep === 4 && activeButton == null) {
            setErrorMessage('원하는 형태의 이미지를 선택 해주세요.');
            return;
        }

        if (activeStep === 4) {
            sendDataToServer();
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setErrorMessage('');
    };

    useEffect(() => {
        // activeStep이 변경될 때마다 실행, input 요소에 포커스 설정
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeStep]); // activeStep이 변경될 때마다 실행

    // 입력 값이 변경될 때 상태 업데이트
    const handleInputChange = (e) => {

        // 입력 값에서 줄 바꿈 문자를 제거
        const value = e.target.value.replace(/\n/g, '');

        setFormValues({
            ...formValues,
            [steps[activeStep]]: value
        });
    };

    const handleInputKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();

            handleNext();
        }
    };

    // 난수 생성 함수
    const generateRandomApiKey = (length = 10) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        return Array.from({ length })
            .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
            .join('');
    };

    // 서버에 데이터를 보내는 함수
    const sendDataToServer = async () => {
        setLoading(true); // 요청 시작 시 로딩 상태로 변경
        try {
            // api_key에 난수 할당
            const randomApiKey = generateRandomApiKey();
            const updatedFormValues = {
                ...formValues,
                api_key: randomApiKey // 생성된 난수 할당
            };

            // 1. DB에 formValues 데이터 저장 (테이블 : image_log)
            try {
                const response = await axios
                    .post(baseUrl + '/postData', updatedFormValues);
                console.log('데이터 저장 성공:', response.data);

                // 2. API 호출
                // const response = await fetch('http://localhost:5000/receive_data', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({ updatedFormValues })  // 배열 데이터를 서버로 전송
                // });
                // const data = await response.json();
                // console.log(data.message); // 서버 응답 확인

                // 3. DB에 응답 받은 데이터 저장 (테이블 : image_generation)
                navigate(`/EndPage?api_key=Cvol3O3fcF`);
                //navigate(`/EndPage?api_key=${randomApiKey}`);
            } catch (error) {
                console.error('데이터 저장 실패:', error);
            }


        } catch (error) {
            console.error('Error sending data:', error);
        } finally {
            setLoading(false); // 요청 완료 후 로딩 상태 해제
        }
    };

    const renderStep = () => {
        let content = null;
        switch (activeStep) {
            case 0:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">브랜드명</div>
                        <span className="description-span">CI / BI 에 적용될 브랜드명 또는 서비스명을 입력해주세요.</span>
                        <input type="text"
                               ref={inputRef}
                               value={formValues[steps[activeStep]]} // 상태에 저장된 값
                               onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                               onKeyUp={handleInputKeyDown}
                               name="brand_nm" className="common-input" placeholder="예시) Brand Logo Lab"/>
                    </div>
                );
                break;
            case 1:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">브랜드명 의미</div>
                        <span className="description-span">브랜드명 또는 서비스명의 의미를 입력해주세요.</span>
                        <input type="text"
                               ref={inputRef}
                               value={formValues[steps[activeStep]]} // 상태에 저장된 값
                               onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                               onKeyUp={handleInputKeyDown}
                               name="brand_summary" className="common-input"
                               placeholder="예시) Brand Logo를 만드는 연구실(Lab)"/>
                    </div>
                );
                break;
            case 2:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">비즈니스</div>
                        <span className="description-span">비즈니스에 대한 상세한 설명을 작성해주세요.</span>
                        <textarea ref={inputRef}
                                  value={formValues[steps[activeStep]]} // 상태에 저장된 값
                                  onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                                  onKeyUp={handleInputKeyDown}
                                  name="business" className="common-text" rows="3"
                                  placeholder="예시) 브랜드 로고, 서비스 로고를 생성형 AI를 통해 빠르고 정확한, 감각의 디자인을 개발합니다.">
                        </textarea>
                    </div>
                );
                break;
            case 3:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">로고 분위기</div>
                        <span className="description-span">원하는 분위기부터 담고 싶은 이미지, 강조하고 싶은 주제 등 상세히 작성해주세요.</span>
                        <textarea ref={inputRef}
                                  value={formValues[steps[activeStep]]} // 상태에 저장된 값
                                  onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                                  onKeyUp={handleInputKeyDown}
                                  name="logo_style" className="common-text" rows="3"
                                  placeholder="예시) 클래식한, 심플한, 개성있는, 집, 나무, 자연의 이미지 등">
                        </textarea>
                    </div>
                );
                break;
            case 4:
                content = (
                    <div className="p-lr-8">
                        <span className="description-span">원하는 스타일을 골라주세요!</span>
                        <Stack direction="row">
                            <button className={`select-img-btn ${activeButton === 'text_based' ? 'active' : ''}`} onClick={handleClick('text_based')}><img src={`${process.env.PUBLIC_URL}/image/logo1.png`} className="example-img" alt=""/></button>
                            <button className={`select-img-btn ${activeButton === 'icon_based' ? 'active' : ''}`} onClick={handleClick('icon_based')}><img src={`${process.env.PUBLIC_URL}/image/logo2.png`} className="example-img" alt=""/></button>
                            <button className={`select-img-btn ${activeButton === 'union_based' ? 'active' : ''}`} onClick={handleClick('union_based')}><img src={`${process.env.PUBLIC_URL}/image/logo3.png`} className="example-img" alt=""/></button>
                        </Stack>
                    </div>
                );
                break;
            default:
                content = <div>Error</div>;
                break;
        }
        return content;
    };

    if (loading) {
        return <LoadingSpinner />; // 로딩 중일 때 로딩 스피너 표시
    }

    return (
        <div className="survey text-center">
            <div className="logo-div">
                <img src={`${process.env.PUBLIC_URL}/ex-removebg-preview.png`} alt="" />
            </div>
            <div className="progress-div">
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel></StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
            <div className="content-div text-left">
                {activeStep === steps.length ? (
                    <React.Fragment>
                        생성중이에요, 잠시만 기다려주세요 !
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div sx={{mt: 2, mb: 1}}>{renderStep()}</div>
                        <div style={{height: '24px'}}>{errorMessage &&
                        <Typography sx={{ml: 2}} color="error">{errorMessage}</Typography>}</div>
                    </React.Fragment>
                )}
            </div>
            <div className="button-div">
                {activeStep < steps.length && (
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        {activeStep > 0 && (
                            <Button
                                className="common-button back-button" variant="contained"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                BACK
                            </Button>
                        )}
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button id="next-btn" className="common-button f-right" variant="contained" color="pupleblue"
                                onClick={handleNext}>
                            {activeStep === steps.length ? 'FINISH' : 'NEXT'}
                        </Button>
                    </Box>
                )}
            </div>
        </div>
    );
}

export default Survey;