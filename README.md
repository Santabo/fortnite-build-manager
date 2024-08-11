# Fortnite Build Manager

A CLI tool for managing Fortnite builds, updating configuration files, and launching associated applications like Neonite and Carbon Launcher.

**Disclaimer:** This is an unofficial tool and is not endorsed by Neonite, Cranium, Fortnite, or Carbon developers. Created by FoxStorm1 on Discord. Please do not copy or redistribute this code without permission.

## Features

- Manage Fortnite builds and paths.
- Update `Carbon.config` for selected builds.
- Launch Neonite and Carbon Launcher applications.
- Configuration file management through `builds.json`.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [License](#license)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/fortnite-build-manager.git
    cd fortnite-build-manager
    ```

2. **Install dependencies**:

    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

## Configuration

### Creating the Configuration File

When you run the `run.bat` file for the first time, it will automatically create the necessary configuration files for you. The `config` directory and `builds.json` file will be generated in the root of the project directory if they do not already exist.

1. **Run the `run.bat` file**:

    Simply execute the `run.bat` file located in the repo directory. This batch file will set up the environment, create the `config` directory and `builds.json` file if they do not exist, and start the CLI tool.

2. **Edit `builds.json`**:

    Once the configuration file is created, you can edit it to set your specific paths and settings. The default configuration will look like this:

    ```json
    {
        "username": "DefaultUser",
        "builds": [
            {
                "name": "Big Bang Event",
                "path": "F:\\Fortnite Builds\\Big Bang Event v27.11"
            }
        ],
        "carbonConfigPath": "C:\\Users\\necro\\Documents\\Carbon_v1.7 (Beta)\\Carbon.config",
        "neonitePath": "C:\\Users\\necro\\Documents\\Carbon_v1.7 (Beta)\\Neonite-main\\app.js",
        "carbonLauncherPath": "C:\\Users\\necro\\Documents\\Carbon_v1.7 (Beta)\\CarbonLauncher.exe"
    }
    ```

    - **`username`**: Your username for the builds.
    - **`builds`**: Array of build objects with `name` and `path` attributes.
    - **`carbonConfigPath`**: Path to the `Carbon.config` file.
    - **`neonitePath`**: Path to the Neonite application entry point.
    - **`carbonLauncherPath`**: Path to the Carbon Launcher executable.

### Example Configuration

Here's an example of how your `builds.json` might look:

```json
{
    "username": "DefaultUser",
    "builds": [
        {
            "name": "Big Bang Event",
            "path": "F:\\Fortnite Builds\\Big Bang Event v27.11"
        }
    ],
    "carbonConfigPath": "C:\\Users\\necro\\Documents\\Carbon_v1.7 (Beta)\\Carbon.config",
    "neonitePath": "C:\\Users\\necro\\Documents\\Carbon_v1.7 (Beta)\\Neonite-main\\app.js",
    "carbonLauncherPath": "C:\\Users\\necro\\Documents\\Carbon_v1.7 (Beta)\\CarbonLauncher.exe"
}
