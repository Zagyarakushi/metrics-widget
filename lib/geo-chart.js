import React, { Component } from "react";
import { ContinentsChart } from "./continent-chart";
import { CountryChart } from "./country-chart";
import { MapChart } from "./map-chart";
import { Tab } from '@headlessui/react'

export class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = { tab: 0 };
    }

    toggleTab(index) {
        this.setState({ tab: index });
    }

    render() {
        return (
            <div className='h-full w-full relative'>
                <Tab.Group onChange={(index) => {
                    // First item on the tab.list is index 0
                    this.toggleTab(index)
                }}>
                    <Tab.List className='flex items-center justify-center mb-4'>
                        <Tab className={({ selected }) =>
                            selected
                                ? "text-blue-600 border-blue-600 relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                : "text-gray-600 border-transparent relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"

                        }
                        >Continent</Tab>
                        <Tab className={({ selected }) =>
                            selected
                                ? "text-blue-600 border-blue-600 relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                : "text-gray-600 border-transparent relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                        }>Country</Tab>
                        <Tab className={({ selected }) =>
                            selected
                                ? "text-blue-600 border-blue-600 relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                                : "text-gray-600 border-transparent relative inline-flex items-center hover:text-blue-600 border-b-2 hover:border-blue-600 py-2 px-4 text-xs"
                        }>Map</Tab>
                    </Tab.List>
                </Tab.Group >
                <div className='h-5/6 flex items-center justify-center mb-4'>
                    {this.state.tab === 0 && (
                        <ContinentsChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                            showTitle={false}
                        />
                    )}
                    {this.state.tab === 1 && (
                        <CountryChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                            showTitle={false}
                        />
                    )}
                    {this.state.tab === 2 && (
                        <MapChart
                            apiEndpoint={this.props.apiEndpoint}
                            doi={this.props.doi}
                            showTitle={false}
                        />
                    )}
                </div>
            </div>
        );
    }
}
