import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Line = ({ title, data, months, yAxis }) => {
  const options = {
    title: {
      text: title
    },
    series: data,
    xAxis: {
      categories: months
    },
    yAxis: {
      title: {
        text: yAxis
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    }
  }

  const content = (
    <>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </>
  )
  return content
}

export default Line
