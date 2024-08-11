import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configDir = path.join(__dirname, 'config');
const buildsFilePath = path.join(configDir, 'builds.json');
const carbonConfigPathFile = path.join(configDir, 'carbon-config-path.txt');

// Ensure config directory exists
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
}

// Create default configuration files if they do not exist
function initializeConfig() {
    if (!fs.existsSync(buildsFilePath)) {
        const defaultConfig = { username: "DefaultUser", builds: [], configPath: '' };
        fs.writeFileSync(buildsFilePath, JSON.stringify(defaultConfig, null, 4), 'utf8');
        console.log(chalk.green("Default builds.json created."));
    }

    if (!fs.existsSync(carbonConfigPathFile)) {
        fs.writeFileSync(carbonConfigPathFile, '', 'utf8');
        console.log(chalk.green("Default carbon-config-path.txt created."));
    }
}

// Load configuration from builds.json
function loadConfig() {
    try {
        const data = fs.readFileSync(buildsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(chalk.red("Error reading builds.json:"), err);
        return { username: "DefaultUser", builds: [], configPath: '' };
    }
}

// Save configuration to builds.json
function saveConfig(newConfig) {
    try {
        fs.writeFileSync(buildsFilePath, JSON.stringify(newConfig, null, 4), 'utf8');
        console.log(chalk.green("Configuration saved successfully!"));
    } catch (err) {
        console.error(chalk.red("Error writing to builds.json:"), err);
    }
}

// Update Carbon.config file
function updateCarbonConfig(username, build) {
    const carbonConfigPath = getCarbonConfigPath();
    if (carbonConfigPath) {
        const config = { name: username, path: build.path };
        try {
            fs.writeFileSync(carbonConfigPath, JSON.stringify(config, null, 4), 'utf8');
            console.log(chalk.green(`Carbon.config updated with ${username} and build ${build.name}!`));
        } catch (err) {
            console.error(chalk.red("Error writing to Carbon.config:"), err);
        }
    } else {
        console.log(chalk.red('Carbon.config path not set. Please set the path first.'));
    }
}

// List available builds
function listBuilds(builds) {
    console.log(chalk.cyan("\nAvailable Builds:"));
    builds.forEach((build, index) => {
        console.log(chalk.blue(`${index + 1}. ${build.name} (${build.path})`));
    });
}

// Add a new build
function addBuild(builds) {
    const name = readlineSync.question(chalk.yellow("Enter the build name: "));
    const path = readlineSync.question(chalk.yellow("Enter the build path: "));
    builds.push({ name, path });
    saveConfig({ username: builds.username, builds });
    console.log(chalk.green(`Build ${name} added.`));
}

// Rename a build
function renameBuild(builds, oldName, newName) {
    const build = builds.find(b => b.name === oldName);
    if (build) {
        build.name = newName;
        saveConfig({ username: builds.username, builds });
        console.log(chalk.green(`Build renamed to ${newName}!`));
    } else {
        console.log(chalk.red(`Build ${oldName} not found.`));
    }
}

// Change the path of a build
function changeBuildPath(builds, buildName, newPath) {
    const build = builds.find(b => b.name === buildName);
    if (build) {
        build.path = newPath;
        saveConfig({ username: builds.username, builds });
        console.log(chalk.green(`Path for ${buildName} updated!`));
    } else {
        console.log(chalk.red(`Build ${buildName} not found.`));
    }
}

// Change the username
function changeUsername(config, newUsername) {
    config.username = newUsername;
    saveConfig(config);
    console.log(chalk.green(`Username updated to ${newUsername}!`));
}

// Set the Carbon.config file path
function setCarbonConfigPath() {
    const newPath = readlineSync.question(chalk.yellow('Enter the full path for the Carbon.config file: '));
    if (fs.existsSync(path.dirname(newPath))) {
        fs.writeFileSync(carbonConfigPathFile, newPath, 'utf8');
        console.log(chalk.green(`Carbon.config path updated to ${newPath}`));
    } else {
        console.log(chalk.red('The specified path directory does not exist.'));
    }
}

// Get the Carbon.config file path
function getCarbonConfigPath() {
    if (fs.existsSync(carbonConfigPathFile)) {
        return fs.readFileSync(carbonConfigPathFile, 'utf8').trim();
    } else {
        console.log(chalk.red('Carbon.config path not set.'));
        return '';
    }
}

// Main function to interact with the user
function main() {
    console.log(chalk.green('Fortnite Build Manager'));
    initializeConfig(); // Ensure configuration files exist

    const config = loadConfig();
    const { username, builds } = config;

    if (builds.length === 0) {
        console.log(chalk.red("No builds found in builds.json."));
        if (readlineSync.keyInYNStrict(chalk.yellow('Would you like to add a build now?'))) {
            addBuild(builds);
        }
        return;
    }

    console.log(chalk.cyan("Note: The build location should include the folders 'Cloud', 'Engine', and 'FortniteGame'."));
    listBuilds(builds);

    const action = readlineSync.question(
        `${chalk.blue(`\nCurrent username is '${username}'.`)}\n` +
        `${chalk.yellow('Select a build by number, or type "rename" to rename a build, "path" to change a build\'s path, "username" to change the username, "setpath" to set Carbon.config path: ')}`
    ).trim();

    if (!isNaN(action) && action > 0 && action <= builds.length) {
        const selectedBuild = builds[action - 1];
        updateCarbonConfig(username, selectedBuild);
    } else if (action === 'rename') {
        const oldName = readlineSync.question(chalk.yellow("Enter the current build name: "));
        const newName = readlineSync.question(chalk.yellow("Enter the new build name: "));
        renameBuild(builds, oldName, newName);
    } else if (action === 'path') {
        const buildName = readlineSync.question(chalk.yellow("Enter the build name to change the path for: "));
        const newPath = readlineSync.question(chalk.yellow("Enter the new path: "));
        changeBuildPath(builds, buildName, newPath);
    } else if (action === 'username') {
        const newUsername = readlineSync.question(chalk.yellow("Enter the new username: "));
        changeUsername(config, newUsername);
    } else if (action === 'setpath') {
        setCarbonConfigPath();
    } else {
        console.log(chalk.red("Invalid choice."));
    }
}

main();
