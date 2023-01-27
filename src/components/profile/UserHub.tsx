import React from "react";
import { Cube } from ".";

type UserHubProps = {
  message: JSX.Element;
  content: JSX.Element;
  form: boolean;
};

const UserHub = ({ message, content, form }: UserHubProps) => {
  return (
    <div className="container_page_profile">
      <main className={"container_profile" + (form ? " form_profile" : "")}>
        <div className="container_welcome_profile">
          <Cube />
          <div className="welcome_profile">{message}</div>
        </div>
        {content}
      </main>
    </div>
  );
};

export default UserHub;
