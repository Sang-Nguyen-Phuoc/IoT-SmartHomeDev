
---

# IoTSmartdev - Smart Device Control Website

## Overview

**IoTSmartdev** is a web-based platform designed to simulate the control of smart devices that moderate the environmental conditions of a room. The website allows users to monitor and adjust key factors such as humidity, temperature, and light intensity in real-time.

The project leverages IoT technology to create an intuitive user experience, enabling remote device control directly through the web interface.

## Features

- **Humidity Control:** Monitor and adjust the room's humidity level to maintain comfort.
- **Temperature Regulation:** Easily set the room temperature to create the desired atmosphere.
- **Light Intensity Adjustment:** Control the brightness of the room’s lighting to suit different situations.

## Tech Stack

- **Framework**: Next.js
- **Backend:** C/C++
- **Database:** Firebase
- **Device Communication:** MQTT (or another IoT protocol)

## How It Works

1. **Monitor Sensor Data:** Real-time data from sensors that measure humidity, temperature, and light intensity is displayed on the website's dashboard.
2. **Adjust Environmental Conditions:** Users can adjust the humidity, temperature, and light intensity using the provided controls on the dashboard.
3. **Device Communication:** Commands are sent to the smart device, which moderates the room's environmental conditions based on the user’s input.

## Getting Started

To run the project locally, follow the steps below:

### Prerequisites

- Install Node.js on your machine. 
- Configure MQTT 

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/yourusername/IoTSmartdev.git](https://github.com/Sang-Nguyen-Phuoc/IoT-SmartHomeDev.git)
   ```

2. Navigate to the project directory and install dependencies:

   ```bash
   cd IoTSmartdev
   npm install
   ```

3. Set up environment variables:
   
   - Add your Firebase credentials.
   - Configure MQTT settings for communication with the smart device.

4. Run the development server:

   ```bash
   npm run start
   ```

### Usage

1. Open the app in your browser.
2. Navigate to the control panel.
3. Use the provided sliders or buttons to adjust the room's humidity, temperature, and light intensity.
4. Real-time updates will show the current environment status as the device responds to user input.

## Future Improvements

- Implement **AI-based automation** for self-regulating environmental control.
- Add **user authentication** to provide personalized settings for different users.
- Expand the system to support additional smart devices.
---
