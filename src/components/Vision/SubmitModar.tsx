import {
  IonButton,
  IonInput,
  IonItem,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
} from "@ionic/react";
import React, { RefObject, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { VisitorSubmitReq } from "../../types/VisitorSubmitReq";
import { sendVisitorEventToGa } from "../../lib/customGA4";

// 제출에 대한 req type interface 생성
interface SubmitModarProps {
  modal: RefObject<HTMLIonModalElement>;
  openId: string;
  handleSubmit: (req: VisitorSubmitReq) => void;
  dismiss: () => void;
}

const SubmitModar = ({
  modal,
  openId,
  handleSubmit,
  dismiss,
}: SubmitModarProps) => {
  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [shouldShake, setShouldShake] = useState<boolean>(false);

  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [content02, setContent02] = useState<string>("");
  const [content03, setContent03] = useState<string>("");

  const initState = () => {
    setEmail("");
    setIsEmail(true);
    setShouldShake(false);
  };

  const checkIsEmail = (props: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(props);
  };

  const handleCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkIsEmail(email)) {
      handleSubmit({
        gender:
          gender !== "" ? (gender === "남성" ? "MAIL" : "FEMAIL") : "NONE",
        age: age !== "" ? age : "무응답",
        email: email,
        firstContent: content02,
        secondContent: content03,
      });
      dismiss();
      setTimeout(() => initState(), 500);
    } else {
      setIsEmail(false);
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
    }
  };

  return (
    <StyledIonModal ref={modal} trigger={openId}>
      <BaseDiv>
        <FormTextDiv
          onSubmit={(e) => {
            sendVisitorEventToGa("submit-trial");
            handleCheck(e);
          }}
        >
          <NormalInputContainerDiv>
            <NormalInputTitleDiv>성별</NormalInputTitleDiv>
            <NormalInputContentDiv
              interface="popover"
              placeholder="성별을 선택해주세요(선택)"
              onIonChange={(e) => {
                setGender(e.detail.value);
              }}
            >
              <NormalCategoryInput value="여성">여성</NormalCategoryInput>
              <NormalCategoryInput value="남성">남성</NormalCategoryInput>
            </NormalInputContentDiv>
          </NormalInputContainerDiv>
          <NormalInputContainerDiv>
            <NormalInputTitleDiv>부양자분의 연령대</NormalInputTitleDiv>
            <NormalInputContentDiv
              interface="popover"
              placeholder="연령대를 선택해주세요(선택)"
              onIonChange={(e) => {
                setAge(e.detail.value);
              }}
            >
              <NormalCategoryInput value="20대">20대</NormalCategoryInput>
              <NormalCategoryInput value="30대">30대</NormalCategoryInput>
              <NormalCategoryInput value="40대">40대</NormalCategoryInput>
              <NormalCategoryInput value="50대 이상">
                50대 이상
              </NormalCategoryInput>
            </NormalInputContentDiv>
          </NormalInputContainerDiv>
          <NormalInputContainerDiv>
            <NormalInputTitleDiv>
              메일 주소<IonText color="danger">*</IonText>
            </NormalInputTitleDiv>
            <NormalIonItem01 $shouldShake={shouldShake}>
              <NormalTextInput01
                type="text"
                value={email}
                onIonInput={(e) => {
                  setEmail(e.detail.value as string);
                  if (!isEmail && checkIsEmail(email)) {
                    setIsEmail(true);
                  }
                }}
                placeholder="서비스 론칭 시 알림 받을 메일 주소를 입력해주세요"
              ></NormalTextInput01>
            </NormalIonItem01>
          </NormalInputContainerDiv>
          {isEmail ? (
            <></>
          ) : (
            <StyledAlertText>올바른 이메일 형식이 아닙니다.</StyledAlertText>
          )}
          <NormalInputContainerDiv>
            <NormalInputTitleDiv>서비스 신청 이유</NormalInputTitleDiv>
            <NormalIonItem02>
              <NormalTextInput02
                labelPlacement="floating"
                value={content02}
                onIonInput={(e) => {
                  setContent02(e.detail.value as string);
                }}
                placeholder="서비스 신청 이유에 대해 자유로이 기술해주세요"
              >
                <div slot="label">
                  Comments <IonText color="medium">(선택)</IonText>
                </div>
              </NormalTextInput02>
            </NormalIonItem02>
          </NormalInputContainerDiv>
          <NormalInputContainerDiv>
            <NormalInputTitleDiv>
              론칭될 서비스에 기대하는 점
            </NormalInputTitleDiv>
            <NormalIonItem03>
              <NormalTextInput03
                labelPlacement="floating"
                value={content03}
                onIonInput={(e) => {
                  setContent03(e.detail.value as string);
                }}
                placeholder="론칭될 매칭서비스 온라인 플랫폼 ‘매치’ 서비스에 기대하는 점을 자유롭게 기술해주세요"
              >
                <div slot="label">
                  Comments <IonText color="medium">(선택)</IonText>
                </div>
              </NormalTextInput03>
            </NormalIonItem03>
          </NormalInputContainerDiv>
          <BtnBox>
            <StyledIonButton type="submit">제출하기</StyledIonButton>
          </BtnBox>
        </FormTextDiv>
      </BaseDiv>
    </StyledIonModal>
  );
};

export default SubmitModar;

const StyledIonModal = styled(IonModal)`
  --width: fit-content;
  --min-width: 250px;
  --height: fit-content;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  --border-radius: 1.5rem;
  --ion-background-color: #ffffff;
`;

const BaseDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 36rem;
  width: 20rem;

  border-radius: 16px;
  background-color: #e6efff;
`;

const FormTextDiv = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 85%;
  text-align: left;
  color: var(--ion-color-medium-shade);
`;

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const BtnBox = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 17rem;
`;

const StyledIonButton = styled(IonButton)`
  width: 100%;
  --border-radius: 1rem;

  --background-color: #71c1ee;
  --border-radius: 0.3rem;
`;

const NormalInputContainerDiv = styled.div`
  margin-top: 0.5rem;
  /* margin-bottom: 1rem; */
  width: 100%;

  color: #3c3c3c;
`;

const NormalInputTitleDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  height: 1.5rem;
  width: 100%;

  font-size: 1rem;
`;

const NormalInputContentDiv = styled(IonSelect)`
  padding: 0.5rem 0.5rem;

  display: flex;
  justify-content: start;
  align-items: center;

  height: 2.25rem;
  width: 100%;

  background-color: white;
  border: 1px solid #c8c8c8;
  border-radius: 0.3rem;
`;

const NormalCategoryInput = styled(IonSelectOption)`
  padding: 0.5rem 0.5rem;
  width: 100%;

  font-size: 1.1rem;
`;

const NormalIonItem01 = styled(IonItem)<{ $shouldShake: boolean }>`
  height: 3rem;
  width: 100%;

  background-color: white;
  border: 1px solid #c8c8c8;
  border-radius: 0.3rem;

  ${(props) =>
    props?.$shouldShake &&
    css`
      animation: ${shakeAnimation} 0.5s ease;
    `}
`;

const NormalTextInput01 = styled(IonInput)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3rem;
  width: 100%;

  font-size: 0.7rem;
`;

const StyledAlertText = styled.div`
  width: 100%;
  text-align: right;
  font-size: 0.5rem;
  color: var(--ion-color-danger);
`;

const NormalIonItem02 = styled(IonItem)`
  height: 5rem;
  width: 100%;

  background-color: white;
  border: 1px solid #c8c8c8;
  border-radius: 0.3rem;
`;

const NormalTextInput02 = styled(IonTextarea)`
  margin: 0;

  height: 5rem;
  width: 100%;
  overflow-y: auto;

  font-size: 0.7rem;
`;

const NormalIonItem03 = styled(IonItem)`
  height: 5rem;
  width: 100%;

  background-color: white;
  border: 1px solid #c8c8c8;
  border-radius: 0.3rem;
`;

const NormalTextInput03 = styled(IonTextarea)`
  height: 5rem;
  width: 100%;
  overflow-y: auto;

  font-size: 0.7rem;
`;
