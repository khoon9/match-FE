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
      <IonHeader></IonHeader>
      <IonContent>
        <StyledApplyButton id="submitModarOpen" size="large">
          신청하기
        </StyledApplyButton>
      </IonContent>
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

const StyledApplyButton = styled(IonButton)`
  --border-radius: 1rem;
`;
