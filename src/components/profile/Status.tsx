import React from "react";

type StatusProps = {
  status: string;
  classNameStatus: string;
};

const Status = ({ status, classNameStatus }: StatusProps) => {
  return (
    <div className={"container_status_profile" + classNameStatus}>
      <p className="status_profile">
        {status === "pending" ? (
          <>
            server is starting
            <br />
            please wait
          </>
        ) : status === "failed" ? (
          <>
            server is offline
            <br />
            try again later
          </>
        ) : (
          <>
            server is online
            <br />
            have a good time
          </>
        )}
      </p>
    </div>
  );
};

export default Status;
