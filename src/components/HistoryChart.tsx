import { useRef } from "react"

const HistoryChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <div><canvas ref={chartRef} id="myChart" width={250} height={250  }/></div>
  )
}

export default HistoryChart