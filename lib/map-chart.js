import React from "react";
import Spinner from "./spinner";
import NoData from "./nodata";
import Map from "./map.js";
import { DownloadMenu } from "./download-menu";
import { fallbackContent } from "./utils";

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
                fetch("https://unpkg.com/world-atlas/countries-50m.json")
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

        const csvData = data
            .map((item) => {
                let obj = item.data.map((element) => {
                    return {
                        measure_uri: element.measure_uri,
                        namespace: element.namespace,
                        source: element.source,
                        type: element.type,
                        version: element.version,
                        continent: item.continent_code,
                        country: item.country_name,
                        value: element.value,
                    };
                });
                return obj;
            })
            .flat();

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
