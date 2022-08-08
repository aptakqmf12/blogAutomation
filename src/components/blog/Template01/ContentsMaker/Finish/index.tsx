import React, { FC, useState, useEffect } from "react";
import * as S from "../style";
import { useBlog, useUserData } from "hooks";
import { Empty, Upload } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
type Props = {
  topTitle: string;
};
const Finish: FC<Props> = ({ topTitle }) => {
  const { customerName } = useUserData();

  const [sloganTitle, setSloganTitle] =
    useState<string>("오늘 본 추천 상품 구매링크는?");
  const [slogan01, setSlogan01] = useState<string>(
    "프로필 링크에서 KOREA PICK"
  );
  const [slogan02, setSlogan02] = useState<string>("공식 블로그 방문하기");
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [changeTitle, setChangeTitle] = useState<boolean>(false);

  return (
    <S.Wrap>
      <S.ItemContainer className="Instagram-Finish">
        <S.FinishItemBox>
          <S.FinishTop>
            <ul className="btns">
              <li style={{ backgroundColor: "#FAEE76" }}></li>
              <li style={{ backgroundColor: "#28A6A0" }}></li>
              <li style={{ backgroundColor: "#FC4A71" }}></li>
            </ul>
            <div className="info">{topTitle}</div>
          </S.FinishTop>

          <S.FinishBottomPrdInfo>
            <div className="whiteBoard">
              <div className="whiteBoard__title">🔍 {sloganTitle}</div>
              <div className="whiteBoard__slogan">🕐 {slogan01}</div>
              <div className="whiteBoard__slogan">🕐 {slogan02}</div>
            </div>
          </S.FinishBottomPrdInfo>
        </S.FinishItemBox>

        <S.Footer>{String(customerName)}</S.Footer>
      </S.ItemContainer>

      <S.InputWrap>
        <S.InputBox>
          <S.StyledCheckbox onChange={() => setChangeTitle(!changeTitle)}>
            커버 제목 수정하기
          </S.StyledCheckbox>
          {changeTitle ? (
            <>
              <S.StyledInput
                rows={1}
                value={sloganTitle}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setSloganTitle(e.target.value);
                }}
              ></S.StyledInput>
              <S.StyledInput
                rows={1}
                value={slogan01}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setSlogan01(e.target.value);
                }}
              ></S.StyledInput>
              <S.StyledInput
                rows={1}
                value={slogan02}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setSlogan02(e.target.value);
                }}
              ></S.StyledInput>
            </>
          ) : null}
        </S.InputBox>
      </S.InputWrap>
    </S.Wrap>
  );
};

export default Finish;
