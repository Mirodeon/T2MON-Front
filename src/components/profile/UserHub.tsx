import React, { useState } from "react";
import { Cube, Status } from ".";
import useHealthCheck from "../../utils/useHealthCheck";
import useTimeOut from "../../utils/useTimeOut";

type UserHubProps = {
  message: JSX.Element;
  content: JSX.Element;
  form: boolean;
};

const UserHub = ({ message, content, form }: UserHubProps) => {
  const [connect, setConnect] = useState(false);
  const status = useHealthCheck();

  useTimeOut(
    () => {
      setConnect(true);
    },
    status === "success" ? 2100 : null
  );

  const classNameStatus =
    status === "pending"
      ? " wait_check"
      : status === "failed"
      ? " fail_check"
      : connect
      ? ""
      : " success_check";

  return (
    <div className="container_page_profile">
      <main className={"container_profile" + (form ? " form_profile" : "")}>
        <div className="container_welcome_profile">
          <Cube status={classNameStatus} />
          <div className="welcome_profile">{message}</div>
        </div>
        {connect ? (
          content
        ) : (
          <Status status={status} classNameStatus={classNameStatus} />
        )}
      </main>
    </div>
  );
};

export default UserHub;
