import { filterByArrange } from "../filter";

      const filterData = (data_3, data_4, data) => {
        // if (data_3.cate.length === 0 && data_3.hsx === "" && data_3.phanloai === "" && data_3.distance[0] === ){
        //   return data; 
        // }
        // else {
           const arrangedData = filterByArrange(data_3, data_4, data);
       
            const filteredData = arrangedData.filter((item) => {
              // Lọc theo hãng sản xuất
              const filterByBrand =
                data_3.hsx.length === 0 || data_3.hsx.includes(item.brand);
              // Lọc theo khoảng giá
              const filterByPrice =
                item.price * ((100 - item.discountPercentage) / 100) >=
                  data_3.distance[0] &&
                item.price * ((100 - item.discountPercentage) / 100) <=
                  data_3.distance[1];
              // Lọc theo loại sản phẩm
          
              const filterByCategory =
                data_3.cate.length === 0 || data_3.cate.includes(item.category);
   
              return filterByBrand && filterByPrice && filterByCategory;
            });
      
          return filteredData;
        }
        
      // };
      
      export default filterData;  // xử lí tổng hợp tất cả