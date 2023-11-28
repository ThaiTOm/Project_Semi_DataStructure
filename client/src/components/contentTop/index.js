import { Breadcrumb, Select } from "antd";
import "./contentTop.scss"
import { Link } from "react-router-dom";
function Contenttop ({title, handleSelect}){
    return (
        <>
     <div className="contentTop--bread">
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },

              {
                title: `${title}`,
              },
            ]}
          />
        </div>
        <div className="contentTop--all">
          <h1>{title}</h1>
          <div className="contentTop--arrange">
            <p className="contentTop--arrange__sx">
              <b>Sắp xếp:</b>
            </p>
            <div className="contentTop--arrange__pl">
              <Select
                onSelect={handleSelect}
                style={{
                  width: 200,
                }}
                placeholder="BẠN MUỐN LỌC GÌ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "tentang",
                    label: "Tên A -> Z",
                  },
                  {
                    value: "tengiam",
                    label: "Tên Z -> A",
                  },
                  {
                    value: "giatang",
                    label: "Giá tăng dần",
                  },
                  {
                    value: "giagiam",
                    label: "Giá giảm dần",
                  },
                  {
                    value: "original",
                    label: "Trở về ban đầu",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        </>
    )
}
export default Contenttop;