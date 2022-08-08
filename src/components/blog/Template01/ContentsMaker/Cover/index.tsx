import React, { FC, useState, useEffect } from "react";
import * as S from "../style";
import { useBlog, useUserData } from "hooks";
import { Empty, Upload, Select } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import { SketchPicker, BlockPicker } from "react-color";
type Props = {
  topTitle: string;
  setTopTitle: any;
};
const Cover: FC<Props> = ({ topTitle, setTopTitle }) => {
  const { productsReducer } = useBlog();
  const { customerName } = useUserData();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [changeTitle, setChangeTitle] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>("#dfe0f3");
  const [coverImageNum, setCoverImageNum] = useState<number>(0);

  const [coverImg, setCoverImg] = useState<any>(null); // 상품이미지 수정하기
  const [coverTitle, setCoverTitle] =
    useState<string>("커버 제목을 입력해주세요");

  const uploadImage = (file: RcFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        reader.result && setCoverImg(reader?.result);
      };
    });
  };

  const { Option } = Select;

  return (
    <S.Wrap>
      <S.ItemContainer className="Instagram-Cover" color={bgColor}>
        <S.CoverItemBox style={{ marginBottom: "220px" }}>
          <S.TopResourceInfo>
            <ul className="btns">
              <li style={{ backgroundColor: "#FAEE76" }}></li>
              <li style={{ backgroundColor: "#28A6A0" }}></li>
              <li style={{ backgroundColor: "#FC4A71" }}></li>
            </ul>
            <div className="info">{topTitle}</div>
          </S.TopResourceInfo>

          <S.BottomPrdInfo>
            {coverImg ? (
              <img
                width="70%"
                src={coverImg}
                alt="coverImage-cover"
                id="coverImage"
              />
            ) : (
              <img
                width="70%"
                src={productsReducer?.list[coverImageNum].itemImage}
                alt="coverImage-custom"
                id="coverImage"
              />
            )}
          </S.BottomPrdInfo>
        </S.CoverItemBox>

        <S.CoverTitle>
          <S.ItemBox>
            <S.CoverTopResourceInfo>
              <ul className="btns">
                <li style={{ backgroundColor: "#FAEE76" }}></li>
                <li style={{ backgroundColor: "#28A6A0" }}></li>
                <li style={{ backgroundColor: "#FC4A71" }}></li>
              </ul>
            </S.CoverTopResourceInfo>

            <S.CoverBottomTitle>{coverTitle}</S.CoverBottomTitle>
          </S.ItemBox>
        </S.CoverTitle>

        <S.Footer>{String(customerName)}</S.Footer>
      </S.ItemContainer>

      <S.InputWrap>
        <S.InputBox>
          <h2>대표 이미지 설정</h2>
          <S.StyledSelect onChange={(value) => setCoverImageNum(Number(value))}>
            {productsReducer?.list.map((product, index) => {
              return (
                <Option key={index}>
                  <img
                    width="100%"
                    src={product.itemImage}
                    alt={product.itemName ?? "image"}
                  />
                </Option>
              );
            })}
          </S.StyledSelect>
        </S.InputBox>

        <S.InputBox>
          <S.StyledCheckbox onChange={() => setChangeImage(!changeImage)}>
            상품이미지 수정하기
          </S.StyledCheckbox>
          {changeImage ? (
            <>
              <S.FileUpload>
                <Upload
                  name="coverImg"
                  beforeUpload={(file) => {
                    uploadImage(file);
                  }}
                  onRemove={() => setCoverImg(null)}
                >
                  <S.StyledButton icon={<UploadOutlined />}>
                    Click to Upload
                  </S.StyledButton>
                </Upload>
              </S.FileUpload>

              {/* <S.StyledInput
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                maxLength={7}
                rows={1}
                placeholder="컬러 코드"
              ></S.StyledInput>
              <SketchPicker
                color={bgColor}
                onChange={(color) => setBgColor(color.hex)}
              /> */}
            </>
          ) : null}
        </S.InputBox>

        <S.InputBox>
          <S.StyledCheckbox onChange={() => setChangeTitle(!changeTitle)}>
            커버 제목 수정하기
          </S.StyledCheckbox>
          {changeTitle ? (
            <>
              <S.StyledInput
                rows={2}
                value={topTitle}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setTopTitle(e.target.value);
                }}
              ></S.StyledInput>
              <S.StyledInput
                rows={2}
                value={coverTitle}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCoverTitle(e.target.value);
                }}
              ></S.StyledInput>
            </>
          ) : null}
        </S.InputBox>
      </S.InputWrap>
    </S.Wrap>
  );
};

export default Cover;
