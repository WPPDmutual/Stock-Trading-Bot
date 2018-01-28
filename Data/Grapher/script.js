window.onload = function(){
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                 data: {
                     //labels: ,
                     datasets: [{
                         fill:false,
                         borderColor: 'black',
                         label: 'Bitcoin Price',
                         //data: ,
                     },
                     ]
                       },
                options: {
                showLines: false,
                    animation: {
                        duration: 0,
                    },
                    hover: {
                        animationDuration: 0,
                    },
                    responsiveAnimationDuration: 0,
                    scales: {
                     xAxes: [{
                       position: 'bottom',
                       gridLines: {
                       },
                       scaleLabel: {
                         display: true,
                         labelString: 'x axis'
                       }
                     }],
                     yAxes: [{
                       position: 'left',
                       gridLines: {
                       },
                       scaleLabel: {
                         display: true,
                         labelString: 'y axis'
                       }
                     }]
                    },
                    elements: { point: { radius: 2 } },
                }
                
            });
        }
