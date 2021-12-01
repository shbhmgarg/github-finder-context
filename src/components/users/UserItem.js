import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const UserItem = ( {user: { avatar_url, login, html_url }}) => {

  return (
    <div className="card text-center">
      <img
        alt="profile avatar"
        src={avatar_url}
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <Link to={`/user/${login}`} className="btn btn-sm btn-dark my-1" >More</Link>
      {/* <a href={html_url} className="btn btn-sm btn-dark my-1">
        More
      </a> */}
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem;
