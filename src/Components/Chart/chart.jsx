export const CityState = {
    labels: ["Golf Course", "Malibu Town", "Sector 49", "Sohna Road", "Subhash Chowk","Mg Road "],
    datasets: [
      {
        label: "No of Properties",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        data: [1,4,7,2,3,4],
      },
    ],
  };
  
export const PolarData= {
    labels: ['Sector 45','Sector 55','Sector 98','Sohna Road','Subhas Chowk','MG Road','Rajiv Chowk'],
    datasets: [{
        label: 'Residencial',
        data: [5, 1, 2, 6, 16, 5, 4],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
      },{
        label: 'Commercial',
        data: [9, 8, 4, 7, 2, 11, 10],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
      }]
};