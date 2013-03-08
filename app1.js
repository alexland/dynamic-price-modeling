
$(function() {
	var normal = [0, 10, 25, 30, 25, 10, 0];
	var skewed = [0, 5, 25, 35, 30, 10, 0];
	var biModal = [0, 30, 18, 4, 18, 30, 0];
	var gamma = [0, 20, 30, 25, 15, 10, 0];
	var reverseGamma = [0, 10, 15, 25, 30, 20, 0];

	var values = skewed;
	var slider = $('#slider').
		css('width', '390px').
		css('margin', '10px').
		data('changeColor', function() {
			$('#slider').find('a').css('background', chart.series[currentIndex].color);
		}).
		data('setCharacteristic', function(array, title) {
			values = array;
			currentIndex = 2;
			for (var i = 0; i < values.length; i++) {
				chart.series[i].data[0].update(values[i]);
			}
			chart.setTitle({
				text: title
			});
			updateSliderWithCurrentData();
		});
	var currentIndex = 2; // set it to the middle value of the array
	var originalValue = values[currentIndex];
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			type: 'column'
		},
		legend: {
			enabled: false
		},
		yAxis: {
			gridLineColor: '#fff',
			title: {
				text: ''
			},
			labels: {
				enabled: false
			}
		},
		xAxis: {
			categories: ['Buckets'],
			labels: {
				enabled: false
			}
		},
		title: {
			text: 'Skewed'
		},
		plotOptions: {
			series: {
				cursor: 'pointer',
				point: {
					events: {
						click: function() {
							currentIndex = this.series.columnIndex;
							updateSliderWithCurrentData();
						}
					}
				}
			},
			column: {
				dataLabels: {
					enabled: true,
					color: 'black'
				}
			}
		},
		series: $.map(values, function(each, i) {
			return i == 0 || i == values.length - 1 ? {
				name: 'Tail',
				data: [0]
			} : {
				name: 'Bucket' + (i + 1),
				data: [each]
			};
		}),
		credits: {
			enabled: false
		}
	});

	var sliderChange = function(event, ui) {
		// reset chart title
		chart.setTitle({
			text: 'Custom'
		});
		var difference = ui.value - originalValue;
		originalValue = ui.value;
		datapointAt(currentIndex).update(originalValue, false);
		var total = originalValue;
		// update all values with raw value, and calculate total
		for (var index = 1; index < 6; index++) {
			if (index !== currentIndex) {
				var datapoint = datapointAt(index);
				var newValue = 0;
				newValue = index < currentIndex ?
					datapoint.y - difference :
					datapoint.y + difference;
				if (newValue < 0) {
					newValue = 0;
				}
				datapoint.update(newValue, false);
				total += newValue;
			}
		}
		// weight the values from 0 - 100
		for (var index = 1; index < 6; index++) {
			var datapoint = datapointAt(index);
			var newValue = Math.floor(100 * datapoint.y / total);
			datapoint.update(newValue, true);
			if (index === currentIndex) {
				originalValue = newValue;
			}
		}
		updateSliderWithCurrentData();
	};

	slider.slider({
		animate: 'normal',
		value: originalValue,
		stop: sliderChange
	}).data('changeColor')();

	function datapointAt(i) {
		return chart.series[i].data[0];
	}

	function updateSliderWithCurrentData() {
		slider.data('changeColor')();
		return slider.slider('value', datapointAt(currentIndex).y);
	}

	var buttonActions = {
		"normal": [normal, 'Normal'],
		"skewed": [skewed, 'Skewed'],
		"bi-modal": [biModal, 'Bi-Modal'],
		"gamma": [gamma, 'Gamma'],
		"reverse-gamma": [reverseGamma, 'Reverse Gamma']
	};
	for (var id in buttonActions) {
		$('#' + id).click(function() {
			var $id = $(this).attr('id');
			var array = buttonActions[$id][0],
				title = buttonActions[$id][1];
			$('#slider').data('setCharacteristic')(array, title);
		});
	}
});​