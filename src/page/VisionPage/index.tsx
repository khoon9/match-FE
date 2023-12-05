import { IonButton, IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import styled from "styled-components";

const VisionPage = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent>
        <StyledApplyButton size="large">신청하기</StyledApplyButton>
      </IonContent>
    </IonPage>
  );
};

export default VisionPage;

const StyledApplyButton = styled(IonButton)`
  --border-radius: 1rem;
`;
