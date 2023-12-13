import { IonButton, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SubmitModar from "../../components/SubmitModar";
import storage from "../../utils/storage";
import { customAxios } from "../../lib/customAxios";
import { Loading } from "../../assets/loading/Loading";

const VisionPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uuid, setUuid] = useState<string>(storage.get("clientVisitor").uuid);
  useEffect(() => {
    if (window.location.pathname === "/vision") {
      if (uuid !== "") {
        updateVisitCount(storage.get("clientVisitor").uuid);
      } else if (uuid === "") {
        getUuidfromServer();
      }
    }
  }, [window.location.pathname]);

  const getUuidfromServer = async () => {
    await customAxios
      .get("/")
      .then((res) => {
        storage.set("clientVisitor", { uuid: res.data });
        setUuid(res.data);
        postNewClientVisitor(res.data);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((e) => {
        console.log(e);
        setTimeout(() => alert("인터넷 연결을 확인해주세요."), 500);
      });
  };

  const postNewClientVisitor = async (requestUuid: string) => {
    await customAxios
      .post("/", { uuid: requestUuid })
      .then((_) => {
        updateVisitCount(requestUuid);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateVisitCount = async (requestUuid: string) => {
    await customAxios
      .put("/visit", { uuid: requestUuid })
      .then((_) => {
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((e) => {
        console.log(e);
        storage.remove("clientVisitor");
        setUuid("");
        alert("인터넷 연결을 확인해주세요.-2");
      });
  };

  const submitModalRef = useRef<HTMLIonModalElement>(null);

  const handleSubmit = () => {
    console.log("제출");
  };
  const dismissSubmitModar = () => {
    submitModalRef.current?.dismiss();
  };
  return (
    <IonPage>
      {isLoading ? (
        <BaseDiv>
          <Loading />
        </BaseDiv>
      ) : (
        <BaseDiv>
          {" "}
          <StyledTextDiv>본문 예시</StyledTextDiv>
          <StyledApplyButton id="submitModarOpen" size="large">
            신청하기
          </StyledApplyButton>
          <SubmitModar
            modal={submitModalRef}
            openId={"submitModarOpen"}
            handleSubmit={handleSubmit}
            dismiss={dismissSubmitModar}
          />
        </BaseDiv>
      )}
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
