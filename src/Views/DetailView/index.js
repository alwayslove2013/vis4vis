import React from "react";
import "./index.scss";
import { Typography, Space, Switch, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export const DetailView = ({ selectedPaper }) => {
  console.log("selectedPaper", selectedPaper);
  const [comment, setComment] = React.useState("write something");
  const authors = selectedPaper["AuthorNames"] || "";
  const countries = selectedPaper["Countries"] || "";
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  let children = [
    "graph",
    "network",
    "trajectory",
    "tree",
    "data",
    "volume rendering",
  ].map((tag) => <Option key={tag}>{tag}</Option>);
  return (
    <div className="detail-view">
      <Title level={4}>{selectedPaper["Title"]}</Title>
      <Space direction="vertical">
        <Text>{authors.split(";").join("; ")}</Text>
        <Text>{countries.split(";").join("; ")}</Text>
        <Text>
          <EditOutlined style={{ marginRight: 10 }} />
          Classic <Switch size={"small"} style={{ marginLeft: 10 }} />
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
