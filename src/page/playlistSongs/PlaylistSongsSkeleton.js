import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PlaylistSongsSkeleton = ({ amount }) => {
  const arrayCount = Array(amount).fill(1);

  return (
    <div className="container">
      <SkeletonTheme baseColor="#202020" highlightColor="#292828">
        <div className="playlist-songs-header">
          <div className="playlist-songs-header-image-wrapper">
            <Skeleton width={"300px"} height={"200px"} />
          </div>

          <div className="playlist-title-wrapper">
            <h1 className="playlist-title">
              <Skeleton width={"100px"} />
            </h1>
            <p className="playlist-title-subtext">
              <Skeleton width={"50px"} />
            </p>
          </div>
        </div>

        {arrayCount.fill(amount).map((val, index) => (
          <div className="playlist-songs-info-wrapper" key={index}>
            <div className="playlist-songs-info">
              <div className="playlist-songs-image-wrapper">
                <Skeleton width={"100px"} height={"55px"} />
              </div>
              <div className="playlist-songs-title-channel-wrapper">
                <div className="playlist-songs-title-wrapper">
                  <Skeleton width={"200px"} />
                </div>
                <div className="playlist-songs-channel-wrapper">
                  <Skeleton width={"50px"} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </SkeletonTheme>
    </div>
  );
};

export default PlaylistSongsSkeleton;
