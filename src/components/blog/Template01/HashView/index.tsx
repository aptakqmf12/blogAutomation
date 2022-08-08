import React, { useState, useEffect } from "react";
import * as S from "./style";
import _ from "lodash";
import { Button, message, Empty } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import CopyToClipboard from "react-copy-to-clipboard";
import { useBlog, useTheme } from "hooks";

const HashView = () => {
  const { productsReducer } = useBlog();
  const { currentTheme } = useTheme();
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    let temp: string[] = [];
    productsReducer?.list.map((prd) => temp.push(...prd.hashTag));
    let uniqu = _.uniq(temp);
    if (uniqu && uniqu.length > 0) {
      const text = "#" + uniqu?.join("#");
      setTags(text);
    } else {
      setTags("");
    }
  }, [productsReducer]);
  return (
    <>
      <S.ViewBox theme={currentTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h3>
            해시태그{" "}
            {productsReducer && productsReducer.list.length > 0 && (
              <>
                ({" "}
                {tags.match(/#[a-zA-Z0-9가-힣]/g)?.length
                  ? tags.match(/#[a-zA-Z0-9가-힣]/g)?.length
                  : 0}{" "}
                개)
              </>
            )}{" "}
          </h3>
          <CopyToClipboard
            text={tags}
            onCopy={() => {
              message.success("복사 완료");
            }}
          >
            <Button icon={<CopyOutlined />}>복사하기</Button>
          </CopyToClipboard>
        </div>

        {productsReducer ? (
          <S.HashTagBox>
            <span>{productsReducer.list.length > 0 && tags}&nbsp;</span>
          </S.HashTagBox>
        ) : (
          <Empty />
        )}
      </S.ViewBox>
    </>
  );
};

export default HashView;
