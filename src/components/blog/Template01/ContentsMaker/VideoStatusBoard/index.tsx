import React, { useState, useEffect } from "react";
import { useQuery, useQueries } from "react-query";
import blogService from "apis/services/blogService";
import axios from "axios";
import Client from "apis";
import { Spin } from "antd";
import { useBlog } from "hooks";
import { VideoStatus } from "types/blog";
import { blogAction } from "store/modules/blog";
import { useAppDispatch } from "store";
import * as S from "./style";

const VideoStatusBoard = () => {
  const dispatch = useAppDispatch();
  const { videoCreating, transformDateFormat } = useBlog();
  const [videoList, setVideoList] = useState<VideoStatus[]>([]); // 이미 만들어진 비디오 리스트
  // 렌더링시 비디오 리스트를 받아온다
  useEffect(() => {
    blogService.getAllVideoStatus().then((res) => setVideoList(res.data));
  }, []);

  // 비디오 만들기버튼을 눌렸을때 요청을 보낸다
  useEffect(() => {}, []);

  // 2초 단위로 유저가 만든 비디오의 id를 계속 보내서 상태값을 내려받는다
  useQuery(
    "videoCreating",
    () =>
      videoCreating &&
      blogService.getVideoStatus(videoCreating.id).then((res) => {
        // 현재 생성중인 비디오의 id를 보내서 상태확인
        console.log(res.data.data.status);
        if (res.data.data.status !== "on_create") {
          blogAction.setVideoCreating(res.data);
        } else {
          blogAction.setVideoCreating(res.data);
        }
      }),
    { refetchInterval: 5000 }
  );

  return (
    <>
      <h2>내가 만든 비디오</h2>
      <div>현재 생성중인 비디오 ID : {String(videoCreating?.id)}</div>
      <div>현재 생성중인 비디오의 상태 : {String(videoCreating?.status)}</div>

      <S.Container>
        {videoList.map((video) => {
          const {
            id,
            status,
            videoFileName,
            videoFileUrl,
            createStartTime,
            createEndTime,
            thumbnailImageUrl,
          } = video;
          return (
            <S.Video color={status === "fail" ? "red" : "#6e85b7"}>
              <div className="thumb">
                <img src={thumbnailImageUrl} alt="썸네일 이미지" />
              </div>
              <div className="info">
                <div className="id">{id}</div>
                <div className="name"> {videoFileName}</div>
                <div className="date">
                  생성일자 : {transformDateFormat(createStartTime)}
                </div>

                {status === "success" ? (
                  <a href={videoFileUrl} target="_blank" rel="noreferrer">
                    View Video
                  </a>
                ) : status === "on_create" ? (
                  <Spin />
                ) : (
                  <span style={{ color: "red" }}>fail</span>
                )}
              </div>
            </S.Video>
          );
        })}
      </S.Container>
    </>
  );
};

export default VideoStatusBoard;
