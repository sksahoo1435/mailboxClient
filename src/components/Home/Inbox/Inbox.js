import { Col, Row } from "react-bootstrap";
import { GoMail } from "react-icons/go";
import { Link, Outlet } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import useFetchMails from "../../../hooks/useFetchMails";
import { useSelector } from "react-redux";

import UILoader from "../../UI/UILoader";

let initialLoad = true;
const Inbox = () => {
  const { isloading } = useSelector((state) => state.ui);

  const { inbox } = useSelector((state) => state.mail);

  useFetchMails(initialLoad, "inbox");
  initialLoad = false;

  console.log(inbox);

  return (
    <div>
      <Outlet />
      {isloading && <UILoader />}

      <div
        style={{
          marginTop: 56,
        }}
      >
        {inbox.length > 0 &&
          inbox.map((mail) => {
            return (
              <Link className="link" to={mail.id}>
                <div className="mail-item border-1 border-bottom" key={mail.id}>
                  <Row className="">
                    <Col sm={12}>
                      <p className="m-0 p-0">
                        {mail.unread ? (
                          <span className="mailUnreadIcon">
                            <GoMail
                              className="text-danger me-2"
                              style={{
                                fontSize: 30,
                              }}
                            />
                          </span>
                        ) : (
                          <span className="">
                            <MdMarkEmailRead
                              className="text-info me-2"
                              style={{
                                fontSize: 30,
                              }}
                            />
                          </span>
                        )}
                        <span className="text-info">From</span>
                        <span className="text-primary ms-1">{mail.sender}</span>
                      </p>
                    </Col>
                    <Col sm={12}>
                      <div
                        className="m-0"
                        style={{
                          padding: "0",
                        }}
                      >
                        <span className="text-info fw-bold">
                          Subject: {mail.subject}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Inbox;