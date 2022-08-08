import React, { FC, useState, useEffect } from "react";
import * as S from "../style";
import { useBlog, useUserData } from "hooks";
import { message, Upload, Table } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import PhoneImg from "assets/img/blog/phoneSearch.png";
type Props = {
  topTitle: string;
};
const Keywords: FC<Props> = ({ topTitle }) => {
  const { productsReducer, keywordsReducer, requestReducer } = useBlog();
  const { customerName } = useUserData();
  const [slogan, setSlogan] = useState<string>("이트리 KOREA PICK");
  const [changeTitle, setChangeTitle] = useState<boolean>(false);

  const KeywordTable = ({ dataList, ...rest }: any) => {
    return (
      <S.KeywordBox>
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>키워드</th>
            </tr>
          </thead>

          <tbody>
            {dataList?.map((keyword: any, index: number) => {
              return (
                <tr>
                  <td>{rest.isOdd ? (index += 11) : index + 1}</td>
                  <td>
                    {keyword.todaysPick ? (
                      <b className="todaysPick">
                        <span>✨</span> {keyword.keyword} <span>✨</span>
                      </b>
                    ) : (
                      keyword.keyword
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </S.KeywordBox>
    );
  };

  return (
    <S.Wrap>
      <S.ItemContainer className="Instagram-Keywords">
        <S.ItemBox>
          <S.TopResourceInfo>
            <ul className="btns">
              <li style={{ backgroundColor: "#FAEE76" }}></li>
              <li style={{ backgroundColor: "#28A6A0" }}></li>
              <li style={{ backgroundColor: "#FC4A71" }}></li>
            </ul>
            <div className="info">{topTitle}</div>
          </S.TopResourceInfo>

          <S.KeywordsBottomContent>
            <S.KeywordsTitle>
              <div className="titles">
                <div className="slogan edit">{slogan}</div>
                <div className="slogan">
                  실시간 인기 키워드로 쇼핑 트렌드 알아보기
                </div>
              </div>
              <div>
                <img src={PhoneImg} alt="phone" />
              </div>
            </S.KeywordsTitle>

            <S.KeywordsDate>{requestReducer.date}</S.KeywordsDate>
            <S.KeywordsChart>
              <KeywordTable
                dataList={keywordsReducer?.list.filter(
                  (el, index) => index < 10
                )}
              />
              <KeywordTable
                dataList={keywordsReducer?.list.filter(
                  (el, index) => index > 10
                )}
                isOdd={true}
              />
            </S.KeywordsChart>
          </S.KeywordsBottomContent>
        </S.ItemBox>
        <S.Footer>{String(customerName)}</S.Footer>
      </S.ItemContainer>

      <S.InputWrap>
        <S.InputBox>
          <S.StyledCheckbox onChange={() => setChangeTitle(!changeTitle)}>
            본문 제목 수정하기
          </S.StyledCheckbox>
          {changeTitle ? (
            <S.StyledInput
              rows={2}
              value={slogan}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setSlogan(e.target.value);
              }}
            ></S.StyledInput>
          ) : null}
        </S.InputBox>
      </S.InputWrap>
    </S.Wrap>
  );
};

export default Keywords;
