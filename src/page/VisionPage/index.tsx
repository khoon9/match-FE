import { IonButton, IonContent, IonHeader, IonPage } from "@ionic/react";
import React, { useRef } from "react";
import styled from "styled-components";
import SubmitModar from "../../components/SubmitModar";

const VisionPage = () => {
  const submitModalRef = useRef<HTMLIonModalElement>(null);

  const handleSubmit = () => {
    console.log("제출");
  };
  const dismissSubmitModar = () => {
    submitModalRef.current?.dismiss();
  };
  return (
    <IonPage>
      <BaseDiv>
        <StyledTextDiv>본문 예시</StyledTextDiv>
        <StyledApplyButton id="submitModarOpen" size="large">
          신청하기
        </StyledApplyButton>
      </BaseDiv>
      <SubmitModar
        modal={submitModalRef}
        openId={"submitModarOpen"}
        handleSubmit={handleSubmit}
        dismiss={dismissSubmitModar}
      />
    </IonPage>
  );
};

export default VisionPage;

const BaseDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const StyledApplyButton = styled(IonButton)`
  --border-radius: 1rem;
`;

const StyledTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 15rem;
`;
