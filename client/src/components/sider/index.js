import { Button, Checkbox, Col, Row, Slider } from "antd";
import Sider from "antd/es/layout/Sider";
import "./sider.scss"
function Siderlane({mang, itemsToShow, data, toggleExpanded, expanded, data_3, max, handleChange_final, handleChange_cate, handleChange_hsx, cate, showcate}){


    return (
        <>
       <Sider theme="light" className="siderLane--sider">
            <div className="siderLane--sider__hsx">
              <Checkbox.Group
                onChange={handleChange_hsx}
                style={{ width: "100%" }}
              >
                <Row gutter={[0, 10]}>
                  <h2>Hãng sản xuất</h2>
                  {mang.slice(0, itemsToShow).map((x) => (
                    <Col span={24} key={x}>
                      <Checkbox value={x}>{x}</Checkbox>
                    </Col>
                  ))}
                  {mang.length > 5 ? (
                    <Col span={24}>
                      <Button onClick={toggleExpanded}>
                        {expanded ? "Thu gọn" : "Xem thêm"}
                      </Button>
                    </Col>
                  ) : ("")}
                </Row>
              </Checkbox.Group>
            </div>

            <div className="siderLane--sider__price">
              <h2>Giá</h2>
              <div className="siderLane--sider__distance">
                <span className="siderLane--sider__sp">
                  {data_3.distance[0] == undefined
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${0}`)
                    : new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${data_3.distance[0]}`)}
                </span>
                <span className="siderLane--sider__sp">
                  {data_3.distance[1] == undefined
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${max}`)
                    : new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${data_3.distance[1]}`)}
                </span>
              </div>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                defaultValue={max ? [1000, max] : [1000, 999999999]} // Giá trị mặc định khi không có max hoặc max không đúng
                max={max} // Sử dụng giá trị mặc định nếu không có max hoặc max không đúng
                min={1000}
                step={1000}
                onAfterChange={handleChange_final}
                tooltip={{
                  open: false,
                }}
              />
            </div>
{showcate === true ? ( <div className="siderLane--sider__cate">
              <h2>LOẠI SẢN PHẨM</h2>

              <Checkbox.Group
                onChange={handleChange_cate}
                style={{ width: "100%" }}
              >
                <Row gutter={[0, 10]}>
                  {cate.map((x) => (
                    <Col span={24} key={x}>
                      <Checkbox value={x}>{x}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>) : ("")}
           

          </Sider>
        </>
    )
}
export default Siderlane;