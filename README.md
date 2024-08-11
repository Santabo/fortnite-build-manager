# Fortnite Build Manager

A CLI tool for managing Fortnite builds, updating configuration files, and launching associated applications like Neonite and Carbon Launcher.

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

1. **Create `config` directory**:

    Ensure there is a directory named `config` in your project root.

2. **Create `builds.json` file**:

    Inside the `config` directory, create a `builds.json` file with the following content:

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
