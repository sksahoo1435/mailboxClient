import React from "react";
import UIModal from "../../UI/UIModal";
import { useSelector } from "react-redux";
import parser from "html-react-parser";
const PreviewMail = () => {
  const { mailContent } = useSelector((state) => state.mail);

  const modalBody = (
    <>
      <h5 className="text-info p-1 mb-2">Email Preview</h5>
      
      {mailContent && <div className="ProseMirror">{parser(mailContent)}</div>}
    </>
  );

  return <UIModal modalBody={modalBody} />;
};

export default PreviewMail;
