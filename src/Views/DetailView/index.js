import React, { useState, useEffect } from "react";
import "./index.scss";
import { Typography, Space, Switch, Select, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";

import UserView from "../UserView";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export const DetailView = ({ selectedPaper }) => {
  console.log("selectedPaper", selectedPaper);
  const [comment, setComment] = useState("write something");
  const authors = selectedPaper["AuthorNames"] || "";
  const countries = selectedPaper["Countries"] || "";
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [doi2classic, setClassic] = useState({});
  const fetchData = async () => {
    fetch("http://vis.pku.edu.cn/vis4vis/getClassic")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log("res2", res);
        setClassic(res);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  let children = [
    "graph",
    "network",
    "trajectory",
    "tree",
    "data",
    "volume rendering",
  ].map((tag) => <Option key={tag}>{tag}</Option>);
  const handleClassic = () => {
    fetch(
      `http://vis.pku.edu.cn/vis4vis/setClassic?doi=${selectedPaper.originDoi}`
    ).then(() => {
      fetchData();
    });
  };
  const isClassic = doi2classic[selectedPaper.originDoi] ? true : false;
  console.log(
    "isClassic",
    isClassic,
    doi2classic[selectedPaper.originDoi],
    doi2classic
  );
  return (
    <div className="detail-view">
      <Title level={4}>{selectedPaper["Title"]}</Title>
      <Space direction="vertical">
        <Text>{authors.split(";").join("; ")}</Text>
        <Text>{countries.split(";").join("; ")}</Text>
        <Text>
          <EditOutlined style={{ marginRight: 10 }} />
          Classic{" "}
          <Checkbox
            size={"small"}
            checked={isClassic}
            style={{ marginLeft: 10 }}
            onChange={handleClassic}
          />
        </Text>
        <Text>
          <EditOutlined style={{ marginRight: 10 }} />
          Tags{" "}
          <Select
            size="small"
            mode="tags"
            style={{ width: "60%", marginLeft: 5, marginTop: 5 }}
            placeholder="Select or Add Tags"
            onChange={handleChange}
          >
            {children}
          </Select>
        </Text>
        <Text>
          <EditOutlined style={{ marginRight: 10 }} />
          Comment
        </Text>
        <UserView title={selectedPaper["Title"]} key={selectedPaper['Title']}/>
        <Paragraph
          type="secondary"
          editable={{
            icon: <EditOutlined />,
            tooltip: "click to edit text",
            onChange: setComment,
            maxLength: 10000,
            autoSize: { maxRows: 20, minRows: 3 },
          }}
        >
          {comment}
        </Paragraph>
        {/* <Paragraph>citations: {selectedPaper["CitationCount"]}</Paragraph> */}
        <Paragraph
          type="secondary"
          ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
        >
          {selectedPaper["Abstract"]}
        </Paragraph>
      </Space>
    </div>
  );
};
