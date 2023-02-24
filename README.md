# Overview 
In this Javascript project, GeoJSON data about earthquakes from the past 7 days is pulled from the USGS website and plotted on an interactive map. This code utilizes the D3 library to extract the GeoJSON data, and the leaflet library to create map objects using a Mapbox API and plot the points on the map. The map features 3 different base layers to toggle between. These allow the user to change the style of the map they are viewing. The map also features 3 overlay layers which allows the user to add earthquakes points from the past week, major earthquakes points from the past week, and fault lines to the map. The overlays can be added independantly or in any combination. Finally, when the user clicks on the circlemarker, a pop up reveals the magnitude and location of the earthquake

### Base Layers
  - street view 
  - satellite view
  - dark view 

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTIzZjJjYzA5OGQ0NDk1OWQwNjQ5MzAzZDVmNjA2NzgxNGYxZjcyNCZjdD1n/3GKgfMg7HfN3FNvZcu/giphy.gif) 



### Overlay Layers
  - earthquakes in the past 7 days
  - MAJOR earthquakes in the past 7 days  
  - fault lines of the tectonic places  

![](https://media.giphy.com/media/IXLw0c85wflU4pcSUk/giphy.gif)

### Popups

![](https://media.giphy.com/media/zyvH1wVrdU4FEjwp89/giphy.gif)

Watch a demo of the project [here](https://youtu.be/8iBCiTDZGK8).
