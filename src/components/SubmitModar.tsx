import { IonButton, IonModal } from "@ionic/react";
import React, { RefObject } from "react";
import styled from "styled-components";

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
  return (
    <StyledIonModal ref={modal} trigger={openId}>
      <BaseDiv>
        SubmitModar
        <IonButton
          onClick={() => {
            handleSubmit();
            dismiss();
          }}
        ></IonButton>
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
