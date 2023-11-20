import React from "react";
import { Table, Space } from "antd";

import "./Table.css";

const columns = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tracking ID",
    dataIndex: "trackingId",
    key: "trackingId",
    align: "left",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "left",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "left",
    render: (text, record) => (
      <span className="status" style={makeStyle(record.status)}>
        {record.status}
      </span>
    ),
  },
  {
    title: "Details",
    key: "details",
    align: "left",
    render: () => <span className="Details">Details</span>,
  },
];

const data = [
  {
    key: 1,
    name: "Lasania Chiken Fri",
    trackingId: 18908424,
    date: "2 March 2022",
    status: "Approved",
  },
  {
    key: 2,
    name: "Big Baza Bang",
    trackingId: 18908424,
    date: "2 March 2022",
    status: "Pending",
  },
  {
    key: 3,
    name: "Mouth Freshner",
    trackingId: 18908424,
    date: "2 March 2022",
    status: "Approved",
  },
  {
    key: 4,
    name: "Cupcake",
    trackingId: 18908421,
    date: "2 March 2022",
    status: "Delivered",
  },
];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

const BasicTable = () => {
  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      />
    </div>
  );
};

export default BasicTable;
