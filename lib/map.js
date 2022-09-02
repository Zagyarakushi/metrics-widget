import React from "react";
import { Chart } from "chart.js";
import * as ChartGeo from "chartjs-chart-geo";

export default class Map extends React.Component {

    chartRef = React.createRef();

    componentDidMount() {
        const ctx = this.chartRef.current.getContext("2d");

        const countries = ChartGeo.topojson.feature(
            this.props.countries,
            this.props.countries.objects.countries
        ).features;

        const labels = countries.map((d) => d.properties.name);
        const values = countries.map((d) => {
            let value = 0;
            this.props.data
                .filter(
                    (continent) => continent.country_name == d.properties.name
                )
                .map((country) =>
                    country.data.map(
                        (countryData) => (value += countryData.value)
                    )
                );

            return {
                feature: d,
                value: value,
            };
        })

        new Chart(
            ctx,
            {
                type: "choropleth",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Countries",
                            data: values,
                        },
                    ],
                },
                options: {
                    showOutline: true,
                    showGraticule: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        xy: {
                            projection: "equalEarth",
                        },
                        color: {
                            quantize: 30,
                            legend: {
                                position: 'bottom-right',
                                align: 'right',
                            },
                        },
                    },
                },
            }
        )
    }
    render() {
        return (
            <canvas
                id="canvas"
                ref={this.chartRef}
            />
        )
    }
}