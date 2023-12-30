import { IonButton, IonPage } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SubmitModar from "../../components/Vision/SubmitModar";
import storage from "../../utils/storage";
import { customAxios } from "../../lib/customAxios";
import { Loading } from "../../assets/loading/Loading";
import MainLogo from "../../assets/vision/MainLogo";
import Paint from "../../assets/vision/Paint.svg";
import People01 from "../../assets/vision/People01.svg";
import People02 from "../../assets/vision/People02.svg";
import BottomTitleImg from "../../assets/vision/BottomTitle.svg";
import { VisitorSubmitReq } from "../../types/VisitorSubmitReq";

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
        postNewClientVisitor(res.data);
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
        storage.set("clientVisitor", { uuid: requestUuid });
        setUuid(requestUuid);
        setTimeout(() => setIsLoading(false), 500);
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

  const handleSubmit = async (req: VisitorSubmitReq) => {
    await customAxios
      .post("/visitor/submit", req)
      .then((res) => {
        if (res.data) {
          alert("제출이 완료되었습니다 !");
        } else {
          alert("이메일이 잘못되었습니다 !");
        }
      })
      .catch((e) => {
        alert("인터넷 연결을 확인해주세요.-3");
        console.log(e);
      });
  };
  const dismissSubmitModar = () => {
    submitModalRef.current?.dismiss();
  };
  return (
    <IonPage>
      {isLoading ? (
        <LoadingBaseDiv>
          <Loading />
        </LoadingBaseDiv>
      ) : (
        <BaseDiv>
          <TopBackgroundPaint>
            <MainLogoContainer>
              <TitleTextBox>치매 환자 부양자가 행복한 세상</TitleTextBox>
              <MainLogoBox>
                <MainLogo />
              </MainLogoBox>
            </MainLogoContainer>
          </TopBackgroundPaint>
          <SubTitleTextBox>
            치매환자 주야간보호센터 서칭부터 <br /> 요양보호사 매칭까지 한번에
          </SubTitleTextBox>
          <PaintLogoBox>{<img src={Paint} alt="물감" />}</PaintLogoBox>

          <TextContentContainer>
            <TextContentTitleBox>
              <TextContentTitle>치매환자의 부양자는?</TextContentTitle>
            </TextContentTitleBox>
            <TextContentBox>
              <TextContentRowBox>
                <TextContentRowStart>•</TextContentRowStart>
                <TextContentRow>
                  환자의 돌봄 서비스가 필요한 때, 언제 어디서나 인근 지역의
                  요양보호사 돌봄 매칭 서비스 이용가능
                </TextContentRow>
              </TextContentRowBox>
              <TextContentRowBox>
                <TextContentRowStart>•</TextContentRowStart>
                <TextContentRow>
                  치매 환자 지역 커뮤니티 개설을 통해 돌봄 고충사항 공유 및
                  정서적 교류 가능
                </TextContentRow>
              </TextContentRowBox>
              <TextContentRowBox>
                <TextContentRowStart>•</TextContentRowStart>
                <TextContentRow>
                  노인복지용구 마켓을 통해 시공간 제약 없이 여러 업체 비교 후
                  구매 가능
                </TextContentRow>
              </TextContentRowBox>
            </TextContentBox>
          </TextContentContainer>
          <PeopleLogoContainer>
            <PeopleLogoBox01>
              {<img src={People01} alt="people01" />}
            </PeopleLogoBox01>
            <PeopleLogoBox02>
              {<img src={People02} alt="people02" />}
            </PeopleLogoBox02>
          </PeopleLogoContainer>

          <TextContentContainer>
            <TextContentTitleBox>
              <TextContentTitle>요양보호사는?</TextContentTitle>
            </TextContentTitleBox>

            <TextContentBox>
              <TextContentRowBox>
                <TextContentRowStart>•</TextContentRowStart>
                <TextContentRow>
                  주야간 보호센터 업체등록을 통해 마케팅, 홍보 비용 절약
                </TextContentRow>
              </TextContentRowBox>
              <TextContentRowBox>
                <TextContentRowStart>•</TextContentRowStart>
                <TextContentRow>
                  요양보호사 자격등록을 통해 인근 돌봄 서비스 수요자 빠른 매칭
                </TextContentRow>
              </TextContentRowBox>
            </TextContentBox>
          </TextContentContainer>
          <BottomBackgroundPaint>
            <BottomMainLogoContainer>
              <BottomTitleTextBox>
                <img src={BottomTitleImg} alt="bottom title" />
              </BottomTitleTextBox>
              <BottomMainLogoBox>
                <MainLogo />
              </BottomMainLogoBox>
            </BottomMainLogoContainer>
            <StyledApplyButton id="submitModarOpen" size="large">
              서비스 신청하기
            </StyledApplyButton>
          </BottomBackgroundPaint>
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
  /* justify-content: center; */
  align-items: center;
  overflow-y: auto;

  /* height: 30rem; */
  width: 100%;
`;

const LoadingBaseDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  height: 100%;
  width: 100%;
`;

const StyledApplyButton = styled(IonButton)`
  --border-radius: 0.5rem;

  color: black;
  font-weight: 700;
  font-size: 1.3rem;

  height: 3rem;
  width: 17rem;
`;

const TopBackgroundPaint = styled.div`
  padding-top: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 19rem;
  width: 100%;

  background: linear-gradient(to bottom right, #8fb5ff 6%, transparent 33%);
`;

const MainLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 18rem;
  width: 18rem;
`;
const TitleTextBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  text-align: right;

  width: 20rem;

  font-weight: 600;
`;
const MainLogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 13rem;
  width: 13rem;
`;

const SubTitleTextBox = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 18rem;

  color: #2c55a6;
  font-size: 1.2rem;
  font-weight: 700;
`;

const PaintLogoBox = styled.div`
  margin-top: 7rem;
  margin-bottom: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 10rem;
  width: 20rem;
`;

const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 18rem;
`;

const TextContentTitleBox = styled.div`
  margin-bottom: -0.5rem;

  display: flex;
  justify-content: start;
  align-items: center;

  width: 20rem;
`;

const TextContentTitle = styled.div`
  margin-left: 1.5rem;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  /* width: 8rem; */

  background-color: #8fb5ff;
  font-size: 1.2rem;
  font-weight: 800;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  border-radius: 0.5rem;
`;

const TextContentBox = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  text-align: left;

  width: 20rem;

  background-color: #eef4ff;

  font-size: 0.9rem;
  font-weight: 500;

  border-radius: 0.5rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  z-index: -1;
`;

const TextContentRowBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: start;
  text-align: left;

  width: 17rem;
`;

const TextContentRowStart = styled.div`
  width: 0.7rem;
  height: 1rem;
`;

const TextContentRow = styled.div`
  display: flex;
  text-align: left;

  width: 15rem;
`;

const PeopleLogoContainer = styled.div`
  margin-top: -1.2rem;

  display: flex;
  justify-content: space-between;

  height: 12rem;
  width: 18rem;
`;
const PeopleLogoBox01 = styled.div`
  display: flex;
  align-items: end;

  height: 12rem;
  width: 7rem;
`;

const PeopleLogoBox02 = styled.div`
  display: flex;
  align-items: start;

  height: 12rem;
  width: 7rem;
`;

const BottomBackgroundPaint = styled.div`
  padding-top: 8rem;
  padding-bottom: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 35rem;
  width: 100%;

  background: linear-gradient(to top left, #8fb5ff 6%, transparent 33%);
`;

const BottomMainLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 35rem;
  width: 18rem;
`;
const BottomTitleTextBox = styled.div`
  margin-left: 1rem;

  display: flex;
  justify-content: end;
  align-items: center;
  text-align: right;

  width: 15rem;

  font-weight: 600;
  z-index: -2;
`;
const BottomMainLogoBox = styled.div`
  margin-bottom: 5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 10rem;
  width: 10rem;
`;
