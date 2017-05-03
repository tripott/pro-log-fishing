//GET http://maps.googleapis.com/maps/api/geocode/json?latlng=32.819252,-79.903800&sensor=true

const googleReverseGeoCodeData = {
	results: [
		{
			address_components: [
				{
					long_name: '152',
					short_name: '152',
					types: ['street_number']
				},
				{
					long_name: 'Wando Reach Court',
					short_name: 'Wando Reach Ct',
					types: ['route']
				},
				{
					long_name: 'Mount Pleasant',
					short_name: 'Mt Pleasant',
					types: ['locality', 'political']
				},
				{
					long_name: 'Charleston County',
					short_name: 'Charleston County',
					types: ['administrative_area_level_2', 'political']
				},
				{
					long_name: 'South Carolina',
					short_name: 'SC',
					types: ['administrative_area_level_1', 'political']
				},
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				},
				{
					long_name: '29464',
					short_name: '29464',
					types: ['postal_code']
				},
				{
					long_name: '2792',
					short_name: '2792',
					types: ['postal_code_suffix']
				}
			],
			formatted_address: '152 Wando Reach Ct, Mt Pleasant, SC 29464, USA',
			geometry: {
				location: {
					lat: 32.817547,
					lng: -79.90334299999999
				},
				location_type: 'ROOFTOP',
				viewport: {
					northeast: {
						lat: 32.81889598029149,
						lng: -79.90199401970848
					},
					southwest: {
						lat: 32.81619801970849,
						lng: -79.9046919802915
					}
				}
			},
			place_id: 'ChIJd1R-Rm9w_ogRTSGMe16cRxE',
			types: ['street_address']
		},
		{
			address_components: [
				{
					long_name: 'Mount Pleasant',
					short_name: 'Mt Pleasant',
					types: ['locality', 'political']
				},
				{
					long_name: 'Charleston County',
					short_name: 'Charleston County',
					types: ['administrative_area_level_2', 'political']
				},
				{
					long_name: 'South Carolina',
					short_name: 'SC',
					types: ['administrative_area_level_1', 'political']
				},
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				}
			],
			formatted_address: 'Mt Pleasant, SC, USA',
			geometry: {
				bounds: {
					northeast: {
						lat: 32.930577,
						lng: -79.71527689999999
					},
					southwest: {
						lat: 32.76592,
						lng: -79.917163
					}
				},
				location: {
					lat: 32.8323225,
					lng: -79.82842579999999
				},
				location_type: 'APPROXIMATE',
				viewport: {
					northeast: {
						lat: 32.9291309,
						lng: -79.71527689999999
					},
					southwest: {
						lat: 32.76658,
						lng: -79.91410479999999
					}
				}
			},
			place_id: 'ChIJ9eUerhZt_ogR4wFdfZ9QkGs',
			types: ['locality', 'political']
		},
		{
			address_components: [
				{
					long_name: '29464',
					short_name: '29464',
					types: ['postal_code']
				},
				{
					long_name: 'Mount Pleasant',
					short_name: 'Mt Pleasant',
					types: ['locality', 'political']
				},
				{
					long_name: 'South Carolina',
					short_name: 'SC',
					types: ['administrative_area_level_1', 'political']
				},
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				}
			],
			formatted_address: 'Mt Pleasant, SC 29464, USA',
			geometry: {
				bounds: {
					northeast: {
						lat: 32.8823888,
						lng: -79.791746
					},
					southwest: {
						lat: 32.766382,
						lng: -79.917163
					}
				},
				location: {
					lat: 32.8234848,
					lng: -79.8520818
				},
				location_type: 'APPROXIMATE',
				viewport: {
					northeast: {
						lat: 32.8823888,
						lng: -79.791746
					},
					southwest: {
						lat: 32.766382,
						lng: -79.917163
					}
				}
			},
			place_id: 'ChIJUXypKrxx_ogRz2qvWyGe3E0',
			types: ['postal_code']
		},
		{
			address_components: [
				{
					long_name: 'Charleston County',
					short_name: 'Charleston County',
					types: ['administrative_area_level_2', 'political']
				},
				{
					long_name: 'South Carolina',
					short_name: 'SC',
					types: ['administrative_area_level_1', 'political']
				},
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				}
			],
			formatted_address: 'Charleston County, SC, USA',
			geometry: {
				bounds: {
					northeast: {
						lat: 33.21513600000001,
						lng: -79.26183
					},
					southwest: {
						lat: 32.4825649,
						lng: -80.4536298
					}
				},
				location: {
					lat: 32.7956561,
					lng: -79.7848422
				},
				location_type: 'APPROXIMATE',
				viewport: {
					northeast: {
						lat: 33.2143072,
						lng: -79.269144
					},
					southwest: {
						lat: 32.4934461,
						lng: -80.4536298
					}
				}
			},
			place_id: 'ChIJc85eBBlg_ogRoqwsxzlsW3g',
			types: ['administrative_area_level_2', 'political']
		},
		{
			address_components: [
				{
					long_name: 'Charleston-North Charleston, SC',
					short_name: 'Charleston-North Charleston, SC',
					types: ['political']
				},
				{
					long_name: 'South Carolina',
					short_name: 'SC',
					types: ['administrative_area_level_1', 'political']
				},
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				}
			],
			formatted_address: 'Charleston-North Charleston, SC, SC, USA',
			geometry: {
				bounds: {
					northeast: {
						lat: 33.5071721,
						lng: -79.2691401
					},
					southwest: {
						lat: 32.493565,
						lng: -80.79093189999999
					}
				},
				location: {
					lat: 33.1260618,
					lng: -80.0087746
				},
				location_type: 'APPROXIMATE',
				viewport: {
					northeast: {
						lat: 33.5071721,
						lng: -79.2691401
					},
					southwest: {
						lat: 32.493565,
						lng: -80.79093189999999
					}
				}
			},
			place_id: 'ChIJ2QRvayhe_ogRZ71t3Wrz1K4',
			types: ['political']
		},
		{
			address_components: [
				{
					long_name: 'South Carolina',
					short_name: 'SC',
					types: [
						'administrative_area_level_1',
						'establishment',
						'point_of_interest',
						'political'
					]
				},
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				}
			],
			formatted_address: 'South Carolina, USA',
			geometry: {
				bounds: {
					northeast: {
						lat: 35.2155401,
						lng: -78.49930090000001
					},
					southwest: {
						lat: 32.033454,
						lng: -83.35392800000001
					}
				},
				location: {
					lat: 33.836081,
					lng: -81.1637245
				},
				location_type: 'APPROXIMATE',
				viewport: {
					northeast: {
						lat: 35.215395,
						lng: -78.5408173
					},
					southwest: {
						lat: 32.0345599,
						lng: -83.353234
					}
				}
			},
			place_id: 'ChIJ49ExeWml-IgRnhcF9TKh_7k',
			types: [
				'administrative_area_level_1',
				'establishment',
				'point_of_interest',
				'political'
			]
		},
		{
			address_components: [
				{
					long_name: 'United States',
					short_name: 'US',
					types: ['country', 'political']
				}
			],
			formatted_address: 'United States',
			geometry: {
				bounds: {
					northeast: {
						lat: 71.5388001,
						lng: -66.885417
					},
					southwest: {
						lat: 18.7763,
						lng: 170.5957
					}
				},
				location: {
					lat: 37.09024,
					lng: -95.712891
				},
				location_type: 'APPROXIMATE',
				viewport: {
					northeast: {
						lat: 49.38,
						lng: -66.94
					},
					southwest: {
						lat: 25.82,
						lng: -124.39
					}
				}
			},
			place_id: 'ChIJCzYy5IS16lQRQrfeQ5K5Oxw',
			types: ['country', 'political']
		}
	],
	status: 'OK'
}
