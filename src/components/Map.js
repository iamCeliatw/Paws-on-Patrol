import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import Loader from "./Loader";
import UserBox from "./UserBox";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({
  imgLoading,
  isActive,
  setIsActive,
  center,
  isLoaded,
  mapRef,
  icon,
  google,
  markers,
  km,
  getClickedUser,
  userPopups,
  setUserPopups,
  userImage,
  mapId,
}) {
  //為了防止marker不斷被渲染並閃爍 使用useMemo鎖住它
  const Markers = useMemo(() => {
    // console.log("marker rendered!");
    // console.log(markers);
    return (
      <>
        {markers.map((m) => {
          if (m.lng) {
            return (
              <MarkerF
                onClick={(e) => getClickedUser(m, e)}
                position={m}
                icon={icon}
                key={uuid()}
              />
            );
          }
          return null;
        })}
      </>
    );
  }, [markers]);

  return isLoaded ? (
    <StyledMap>
      <UserBox
        imgLoading={imgLoading}
        setIsActive={setIsActive}
        isActive={isActive}
        userImage={userImage}
        setUserPopups={setUserPopups}
        userPopups={userPopups}
      />

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={{ mapId: mapId, mapTypeControl: false }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {Markers}
        {google && (
          <Circle
            center={center}
            radius={km ? km : 1500}
            map={mapRef.current}
            options={{
              fillColor: "#696fff",
              fillOpacity: 0.2,
              strokeColor: "#f8f2f2",
              strokeOpacity: 2,
              strokeWeight: 1,
            }}
          />
        )}
      </GoogleMap>
    </StyledMap>
  ) : (
    <Loader />
  );
}

const StyledMap = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
`;

export default React.memo(Map);
