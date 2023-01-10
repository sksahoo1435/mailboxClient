import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { Badge } from "react-bootstrap";

import { countUnreadMails } from "../../store/slices/mail-slice";

const SideNav = () => {
  const dispatch = useDispatch();
  const { totalUnread } = useSelector((state) => state.mail);
  dispatch(countUnreadMails());

  return (
    <>
      <div
        className="sidemenu"
        style={{
          marginTop: 56,
          height: "100%",
        }}
      >
        <Link
          to="inbox"
          className="sideNavLink"
          style={{
            width: "auto",
          }}
        >
          Inbox
          <Badge pill bg="primary" className="ms-1">
            {totalUnread}
          </Badge>
        </Link>
        <Link to="sentbox" className="sideNavLink">
          Sentbox
        </Link>
        <Link to="/home/composemail" className="sideNavLink">
          <span>Compose</span>
          <span className="fs-5">
            <MdAddCircle />
          </span>
        </Link>
      </div>
    </>
  );
};

export default SideNav;
