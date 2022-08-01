import React from "react";
import Spinner from "./spinner";
import NoData from "./nodata";
import Map from "./map.js";
import { DownloadMenu } from "./download-menu";
import { backgroudColours, borderColours, compareNumbers, fallbackContent } from "./utils";

export class MapChart extends React.Component {
    constructor(props) {
        super(props);
        let params =
            "events?aggregation=country_uri,measure_uri&filter=work_uri:info:doi:";
        this.url = new URL(`${params}${props.doi}`, props.apiEndpoint);
        this.state = {
            data: [],
            countries: [],
            dataIsLoaded: false,
        };
    }

    componentDidMount() {
        fetch(this.url)
            .then((res) => res.json())
            .then((json) => {
                fetch("https://unpkg.com/world-atlas/countries-110m.json")
                    .then((countries) => countries.json())
                    .then((jsonCountries) =>
                        this.setState({
                            data: json.data,
                            countries: jsonCountries,
                            dataIsLoaded: true,
                        })
                    );
            });
    }

    render() {
        const { dataIsLoaded, countries, data } = this.state;
        if (!dataIsLoaded) return <Spinner />;
        if (data.length == 0) return <NoData />;

        const title = "Usage per Country";

        const csvData = data.map((item) => {
            return {
                measure_uri: item.measure_uri,
                namespace: item.namespace,
                source: item.source,
                type: item.type,
                version: item.version,
                value: item.value,
            };
        });

        return (
            <div className='h-full w-full relative'>
                <div className='flex justify-end absolute right-0 -top-12'>
                    <DownloadMenu
                        data={csvData}
                        fileName='usage-by-continent'
                    />
                </div>
                <Map data={data} countries={countries} role="img" aria-label={title} fallbackContent={fallbackContent} />
            </div>
        );
    }
}
