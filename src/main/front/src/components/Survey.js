import React, {useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {useTheme} from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import axios from "axios";
import logo from '../image/ex-removebg-preview.png';
import LoadingSpinner from './LoadingSpinner'; // 위에서 만든 로딩 스피너 컴포넌트

function Survey() {
    const theme = useTheme();
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [activeStep, setActiveStep] = useState(1);
    const [formValues, setFormValues] = useState({
        step1: '',
        step2: '',
        step3: '',
        step4: ''
    }); // 각 스텝의 입력 값을 저장할 상태
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태

    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (btn) => () => {
        setActiveButton(btn);

        let btnStep = btn.replace('btn', '');
        setFormValues({
            ...formValues,
            [`step5`]: btnStep
        });
    }

    const inputRef = useRef(null);
    const steps = ['brandName', 'brandNameMean', 'business', 'vibe', 'selectImage'];

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
        if (activeStep < 5 && !formValues[`step${activeStep}`].trim()) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
            setErrorMessage('내용을 입력 해주세요.'); // 경고 메시지 표시
            return; // 빈 입력값이 있으면 다음 스텝으로 넘어가지 않음
        } else {
            setErrorMessage('');
        }

        // 이미지 선택을 안했을 경우
        if (activeStep == 5 && activeButton == null) {
            setErrorMessage('원하는 형태의 이미지를 선택 해주세요.');
            return;
        }

        if (activeStep == 5) {
            console.log(formValues);
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
        setFormValues({
            ...formValues,
            [`step${activeStep}`]: e.target.value
        });
    };

    const handleInputKeyDown = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            handleNext();
        }
    };

    const baseUrl = "http://ec2-3-39-64-137.ap-northeast-2.compute.amazonaws.com:8080";

    const [data, setData] = useState();

    useEffect(() => {
        putSpringData();
    }, [])

    async function putSpringData() {
        await axios
            .get(baseUrl + "/exampleImage")
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // 서버에 데이터를 보내는 함수
    const sendDataToServer = async () => {
        setLoading(true); // 요청 시작 시 로딩 상태로 변경
        // try {
        //     const response = await fetch('http://localhost:5000/receive_data', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ array_data: formValues })  // 배열 데이터를 서버로 전송
        //     });
        //     const data = await response.json();
        //     console.log(data.message); // 서버 응답 확인
        // } catch (error) {
        //     console.error('Error sending data:', error);
        // } finally {
        //     setLoading(false); // 요청 완료 후 로딩 상태 해제
        // }
    };

    const renderStep = () => {
        let content = null;
        switch (activeStep) {
            case 1:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">브랜드명</div>
                        <span className="description-span">CI / BI 에 적용될 브랜드명 또는 서비스명을 입력해주세요.</span>
                        <input type="text"
                               ref={inputRef}
                               value={formValues.step1} // 상태에 저장된 값
                               onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                               onKeyUp={handleInputKeyDown}
                               name="brandName" className="common-input" placeholder="예시) Brand Logo Lab"/>
                    </div>
                );
                break;
            case 2:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">브랜드명 의미</div>
                        <span className="description-span">브랜드명 또는 서비스명의 의미를 입력해주세요.</span>
                        <input type="text"
                               ref={inputRef}
                               value={formValues.step2} // 상태에 저장된 값
                               onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                               onKeyUp={handleInputKeyDown}
                               name="brandNameMean" className="common-input"
                               placeholder="예시) Brand Logo를 만드는 연구실(Lab)"/>
                    </div>
                );
                break;
            case 3:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">비즈니스</div>
                        <span className="description-span">비즈니스에 대한 상세한 설명을 작성해주세요.</span>
                        <textarea ref={inputRef}
                                  value={formValues.step3} // 상태에 저장된 값
                                  onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                                  onKeyUp={handleInputKeyDown}
                                  name="business" className="common-text" rows="3"
                                  placeholder="예시) 브랜드 로고, 서비스 로고를 생성형 AI를 통해 빠르고 정확한, 감각의 디자인을 개발합니다.">
          </textarea>
                    </div>
                );
                break;
            case 4:
                content = (
                    <div className="p-lr-8">
                        <div className="title-div m-b-5">로고 분위기</div>
                        <span className="description-span">원하는 분위기부터 담고 싶은 이미지, 강조하고 싶은 주제 등 상세히 작성해주세요.</span>
                        <textarea ref={inputRef}
                                  value={formValues.step4} // 상태에 저장된 값
                                  onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                                  onKeyUp={handleInputKeyDown}
                                  name="vibe" className="common-text" rows="3"
                                  placeholder="예시) 클래식한, 심플한, 개성있는, 집, 나무, 자연의 이미지 등">
          </textarea>
                    </div>
                );
                break;
            case 5:
                content = (
                    <div className="p-lr-8">
                        <span className="description-span">원하는 스타일을 골라주세요!</span>
                        <Stack direction="row">
                            <button className={`select-img-btn ${activeButton === 'btn1' ? 'active' : ''}`} onClick={handleClick('btn1')}><img src={data[0].image_url}/></button>
                            <button className={`select-img-btn ${activeButton === 'btn2' ? 'active' : ''}`} onClick={handleClick('btn2')}><img src={data[0].image_url}/></button>
                            <button className={`select-img-btn ${activeButton === 'btn3' ? 'active' : ''}`} onClick={handleClick('btn3')}><img src={data[0].image_url}/></button>
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
                <img src={logo}/>
            </div>
            <div className="progress-div">
                <Stepper activeStep={activeStep-1}>
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
                {activeStep === steps.length + 1 ? (
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
                {activeStep < steps.length + 1 && (
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        {activeStep > 1 && (
                            <Button
                                className="common-button back-button" variant="contained"
                                disabled={activeStep === 1}
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