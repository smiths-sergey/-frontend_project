import { useState } from "react";
import { Table, Select, Spin } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { v4 as uuidv4 } from "uuid";
import {
  useGetSearchLoaclitiesQuery,
  useGetPollutionDataByLocalityIdQuery,
} from "../services/backendApi";
import MenuComponent from "../components/Menu";

function LocalityPage() {
  const { Option } = Select;
  const [localitySearchText, setLocalitySearchText] = useState(null);
  const [localityIdSelected, setlocalityIdSelected] = useState(null);

  const {
    data: localityOptions,
    error: localityError,
    isLoading: localityIsLoading,
  } = useGetSearchLoaclitiesQuery(
    { searchText: localitySearchText },
    { skip: localitySearchText === null }
  );

  const {
    data: pollutions,
    error: pollutionsError,
    isLoading: pollutionsIsLoading,
  } = useGetPollutionDataByLocalityIdQuery(localityIdSelected, {
    skip: !localityIdSelected,
  });

  let timer = 0;
  const handleSearchLocality = (value) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      setLocalitySearchText(value);
    }, 1000);
  };

  const handleChangeLocality = (locality_id) => {
    setlocalityIdSelected(locality_id);
  };

  const isSpinning = () => {
    return pollutionsIsLoading || localityIsLoading;
  };
  const getChartData = () => {
    let chartData = pollutions?.slice(0, 12) ?? [];
    chartData.reverse();
    chartData = chartData.map(function (item) {
      const newItem = { ...item };
      newItem.time = new Date(item.time).toLocaleString("ru-RU");

      return newItem;
    });
    return chartData;
  };
  const columns = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (text, record) => new Date(text).toLocaleString("ru-RU"),
    },
    {
      title: "Окись углерода (co)",
      dataIndex: "co",
      key: "co",
    },
    {
      title: "Оксид азота (no)",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Диоксид азота (no2)",
      dataIndex: "no2",
      key: "no2",
    },
    {
      title: "Озон (o3)",
      dataIndex: "o3",
      key: "o3",
    },
    {
      title: "Диоксид серы (so2)",
      dataIndex: "so2",
      key: "so2",
    },
    {
      title: "Частицы менее 2.5 микрон (pm2_5)",
      dataIndex: "pm2_5",
      key: "pm2_5",
    },
    {
      title: "Частицы менее 10 микрон (pm10)",
      dataIndex: "pm10",
      key: "pm10",
    },
    {
      title: "Аммиак (nh3)",
      dataIndex: "nh3",
      key: "nh3",
    },
  ];

  return (
    <>
      <MenuComponent selectedKey="main"></MenuComponent>
      <Spin spinning={isSpinning()}>
        <Select
          id="locality"
          showSearch
          placeholder="Для выбора населенного пункта начните вводить его название"
          style={{ width: "100%" }}
          filterOption={false}
          onSearch={handleSearchLocality}
          onChange={handleChangeLocality}
        >
          {localityOptions?.map((option) => (
            <Option key={uuidv4()} value={option.id}>
              {option.title}
            </Option>
          ))}
        </Select>
        <h2>Данные о загрязнении воздуха</h2>
        <Table columns={columns} dataSource={pollutions}></Table>

        {pollutions?.length > 0 && (
          <ResponsiveContainer width="100%" height={600}>
            <LineChart
              id="chart"
              data={getChartData()}
              margin={{
                top: 50,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="no" stroke="#82ca9d" />
              <Line type="monotone" dataKey="no2" stroke="#8884d8" />
              <Line type="monotone" dataKey="so2" stroke="#0088fe" />
              <Line type="monotone" dataKey="pm2_5" stroke="#ffc658" />
              <Line type="monotone" dataKey="pm10" stroke="#ff00ff" />
              <Line type="monotone" dataKey="nh3" stroke="#4d4d4d" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Spin>
    </>
  );
}

export default LocalityPage;
