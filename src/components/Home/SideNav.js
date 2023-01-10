import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiMailAddLine } from "react-icons/ri";
import { Badge } from "react-bootstrap";

import { countUnreadMails } from "../../store/slices/mail-slice";
import { toggleSideNav } from "../../store/slices/ui-slice";

const SideNav = () => {
  const dispatch = useDispatch();
  const { totalUnread } = useSelector((state) => state.mail);
  dispatch(countUnreadMails());
  const closeSideNav = () => dispatch(toggleSideNav());
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
          className="sideNavLink p-2 py-4"
          style={{
            width: "auto",
          }}
          onClick={closeSideNav}
        >
          Inbox
          <Badge
            pill
            className="p-2 text-info bg-info ms-3 d-flex justify-content-center align-items-center"
            style={{
              width: 30,
              height: 30,
              border: "2px solid #fff",
            }}
          >
            <span
              className="fw-bold text-white"
              style={{
                fontSize: 16,
              }}
            >
              {totalUnread}
            </span>
          </Badge>
        </Link>
        <Link
          to="sentbox"
          className="sideNavLink p-2 py-4"
          onClick={closeSideNav}
        >
          Sentbox
        </Link>
        <Link
          to="/home/composemail"
          className="sideNavLink p-2"
          onClick={closeSideNav}
        >
          <span>Compose</span>
          <span
            className="fs-5 d-flex justify-content-center align-items-center"
            style={{
              width: 50,
              height: 50,
            }}
          >
            <RiMailAddLine className="fs-3 ms-2" />
          </span>
        </Link>
      </div>
    </>
  );
};

export default SideNav;
