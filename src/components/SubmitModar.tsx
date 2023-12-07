import { IonButton, IonInput, IonModal } from "@ionic/react";
import React, { RefObject, useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface SubmitModarProps {
  modal: RefObject<HTMLIonModalElement>;
  openId: string;
  handleSubmit: () => void;
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
      handleSubmit();
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
        <form
          onSubmit={(e) => {
            handleCheck(e);
          }}
        >
          <FormTextDiv>
            시범운영 준비중입니다.
            <br /> 이메일로 오픈 알람을 받으시겠습니까 ?{" "}
          </FormTextDiv>
          <StyledIonInputBox $shouldShake={shouldShake}>
            <StyledIonInput
              type="text"
              placeholder="이메일을 입력해주세요"
              value={email}
              onIonInput={(e) => {
                setEmail(e.detail.value as string);
                if (!isEmail && checkIsEmail(email)) {
                  setIsEmail(true);
                }
              }}
            ></StyledIonInput>
          </StyledIonInputBox>
          {isEmail ? (
            <></>
          ) : (
            <StyledAlertText>올바른 이메일 형식이 아닙니다.</StyledAlertText>
          )}

          <BtnBox>
            <StyledIonButton type="submit">제출</StyledIonButton>
            <StyledIonButton
              onClick={() => {
                dismiss();
                setTimeout(() => initState(), 500);
              }}
            >
              취소
            </StyledIonButton>
          </BtnBox>
        </form>
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

  height: 12rem;
  width: 15.5rem;

  border-radius: 16px;
`;

const FormTextDiv = styled.div`
  width: 13rem;
  text-align: left;
  font-size: 0.8rem;
  color: var(--ion-color-medium-shade);
`;

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
`;

const StyledAlertText = styled.div`
  width: 13rem;
  text-align: right;
  font-size: 0.5rem;
  color: var(--ion-color-danger);
`;

const StyledIonInputBox = styled.div<{ $shouldShake: boolean }>`
  margin-top: 1rem;
  ${(props) =>
    props?.$shouldShake &&
    css`
      animation: ${shakeAnimation} 0.5s ease;
    `}
`;

const StyledIonInput = styled(IonInput)`
  width: 13rem;
  border-radius: 1rem;
  font-size: 0.9rem;
`;

const BtnBox = styled.div`
  margin-top: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 13rem;
`;

const StyledIonButton = styled(IonButton)`
  --border-radius: 1rem;
`;
