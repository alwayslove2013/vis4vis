import React, { useState, useEffect } from "react";
import "./index.scss";
import * as d3 from "d3";
import users from "../../common/users";
import { Tag } from "antd";

const { CheckableTag } = Tag;

export const ControlView = ({
  selectedUsers = [],
  setSelectedUsers = () => {},
}) => {
  const buttons = [
    {
      text: "I",
      class: "All_China",
      select: "all-china",
      buttonClass: "active-button-china",
    },
    {
      text: "I",
      class: "All_Japan",
      select: "all-japan",
      buttonClass: "active-button-japan",
    },
    {
      text: "I",
      class: "All_Korea",
      select: "all-korea",
      buttonClass: "active-button-korea",
    },
    {
      text: "C",
      class: "Has_China",
      select: "has-china",
      buttonClass: "active-button-china",
    },
    {
      text: "C",
      class: "Has_Japan",
      select: "has-japan",
      buttonClass: "active-button-japan",
    },
    {
      text: "C",
      class: "Has_Korea",
      select: "has-korea",
      buttonClass: "active-button-korea",
    },
  ];
  const handleClick = (button, flag) => {
    // console.log("button", button, flag);
    d3.selectAll(`.${button.class}`).classed(button.select, flag);
  };
  const [selectedTags, setSelectedTags] = useState([]);
  const tagData = ["Classic", "Graph", "Data", "ML", "Volume"];
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("nextSelectedTags", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const [doi2classic, setClassic] = useState({});
  const fetchData = async () => {
    fetch("http://vis.pku.edu.cn/vis4vis/getClassic")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("res2", res);
        setClassic(res);
      });
  };

  const handleChangeUser = (user, checked) => {
    const nextSelectedUsers = checked
      ? [...selectedUsers, user]
      : selectedUsers.filter((t) => t !== user);
    console.log("nextSelectedUsers", nextSelectedUsers);
    setSelectedUsers(nextSelectedUsers);
  };

  useEffect(() => {
    fetchData();
    const allDoi = Object.keys(doi2classic).filter((d) => doi2classic[d]);
    const formatDoi = allDoi.map((d) =>
      d.replaceAll("/", "").replaceAll(".", "").replaceAll("#", "")
    );
    if (selectedTags.indexOf("Classic") > -1) {
      formatDoi.forEach((doi) => {
        d3.select(`#unit-${doi}`).classed("selected", true);
      });
    } else {
      formatDoi.forEach((doi) => {
        d3.select(`#unit-${doi}`).classed("selected", false);
      });
    }
  }, [selectedTags]);
  return (
    <div className="control-view">
      <div className="control-panel-country">
        <>
          <div className="control-view-header">Chinese</div>
          <div className="control-view-header">Japanese</div>
          <div className="control-view-header">Korean</div>
          {buttons.map((button, i) => (
            <CountryButton key={i} button={button} handleClick={handleClick} />
          ))}
        </>
      </div>
      <div className="control-panel-classic control-tags">
        <div className="control-panel-classic-title">Tags</div>
        {tagData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      <div className="control-panel-classic control-users">
        <div className="control-panel-classic-title">Users</div>
        <div className="control-panel-classic-tags">
          {users.map((user) => (
            <CheckableTag
              key={user}
              checked={selectedUsers.indexOf(user) > -1}
              onChange={(checked) => handleChangeUser(user, checked)}
            >
              {user}
            </CheckableTag>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CountryButton = ({ button, handleClick }) => {
  const [selected, setSelected] = React.useState(false);
  const className = ["button", selected && button.buttonClass]
    .filter((d) => d)
    .join(" ");
  const _handleClick = () => {
    handleClick(button, !selected);
    setSelected(!selected);
  };
  const num = d3.selectAll(`.${button.class}`).nodes().length;
  return (
    <div className={className} onClick={() => _handleClick()}>
      {button.text} {`(${selected ? num : 0})`}
    </div>
  );
};
