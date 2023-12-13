import React, { useEffect, useState } from "react";
import "./Card.scss";
import { Area } from "@ant-design/plots";
import { Modal, Progress } from "antd";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch("https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const twoColors = {
    "0%": "#fff",
    "100%": "#fff",
  };
  const config = {
    point: true,
    color: "white",
    data: data,
    xField: "Date",
    yField: "scales",
    slider: {
      start: 0,
      end: 1,
    },
  };
  const handleOpen = () => {
    setExpanded(true);
  };
  const handleClose = () => {
    setExpanded(false);
  };
  return (
    <>
      <div className="card">
        <div
          className="card--CompactCard"
          style={{
            background: props.color.backGround,
            boxShadow: props.color.boxShadow,
          }}
          onClick={handleOpen}
        >
          <div className="card--radialBar">
            <Progress
            status="active"
              type="circle"
              percent={props.barValue}
              style={{ color: "white" }}
              size={80}
              strokeWidth={10}
              strokeColor={twoColors}
            />
            <span>{props.title}</span>
          </div>
          <div className="card--infor">
            {props.png}
            <span className="card--infor__span1">{props.value}{props.type === "money" ? " VND" : " User"}</span>
            <span className="card--infor__span2">Last 24 hours</span>
          </div>
        </div>

        <div className="card--expanded">
          <Modal
            className="modal"
            style={{
              background: props.color.backGround,
              boxShadow: props.color.boxShadow,
            }}
            open={expanded}
            onCancel={handleClose}
            footer={null}
            width={1000}
          >
            <div className="card--ExpandedCard" layoutId="expandableCard">
              <span className="title">{props.title}</span>
              <div className="chartContainer">
                <Area {...config} />
              </div>
              <span className="time">Last 24 hours</span>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Card;
