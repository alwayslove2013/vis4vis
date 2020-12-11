import React, { useState, useEffect } from "react";
import { get } from "lodash";
import users from "../../common/users";
import { Tag } from "antd";
const { CheckableTag } = Tag;

const UserView = ({ title = "", refetchUsers = () => {} }) => {
  const [isReadUserList, setIsReadUserList] = useState([]);
  const fetchData = async () => {
    fetch("http://vis.pku.edu.cn/vis4vis/getUser")
      .then((res) => res.json())
      .then((title2users) => {
        const isReadUsers = get(title2users, title, "");
        setIsReadUserList(isReadUsers.split(","));
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const setUser = (title, users) => {
    fetch(
      "http://vis.pku.edu.cn/vis4vis/setUser?" + `title=${title}&users=${users}`
    ).then(() => {
      fetchData();
      refetchUsers();
    });
  };
  const onChange = (value, checked) => {
    const nextList = checked
      ? [...isReadUserList, value]
      : isReadUserList.filter((d) => d !== value);
    // nextList = nextList.filter((d) => d);
    console.log("nextList", nextList);
    setUser(title, nextList.join(","));
    setIsReadUserList(nextList);
  };
  // console.log('isReadUserList', isReadUserList)
  return (
    <div>
      {users.map((user) => (
        <CheckableTag
          key={user}
          checked={isReadUserList.indexOf(user) > -1}
          onChange={(checked) => onChange(user, checked)}
        >
          {user}
        </CheckableTag>
      ))}
    </div>
  );
};

export default UserView;
