import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import { exec } from 'child_process';

// Function to ensure a file exists
const ensureFileExists = (filePath, defaultContent = '{}') => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, defaultContent, 'utf8');
        console.log(`Created missing file: ${filePath}`);
    }
};

// Function to load configuration files
const loadConfig = () => {
    try {
        const configPath = path.join(process.cwd(), 'config', 'builds.json');
        ensureFileExists(configPath, JSON.stringify({
            username: 'DefaultUser',
            builds: [],
            carbonConfigPath: '',
            neonitePath: '',
            carbonLauncherPath: ''
        }));

        const buildsData = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(buildsData);
    } catch (error) {
        console.error('Error loading configuration:', error);
        process.exit(1);
    }
};

// Function to save configuration changes
const saveConfig = (config) => {
    try {
        const configPath = path.join(process.cwd(), 'config', 'builds.json');
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
        console.log('Configuration saved successfully!');
    } catch (error) {
        console.error('Error saving configuration:', error);
        process.exit(1);
    }
};

// Function to update Carbon.config
const updateCarbonConfig = (configPath, build) => {
    try {
        const config = {
            name: build.name,
            path: build.path
        };
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
        console.log(`Carbon.config updated with build ${build.name}!`);
    } catch (error) {
        console.error('Error updating Carbon.config:', error);
        process.exit(1);
    }
};

// Function to start applications in separate windows
const startApplications = (neonitePath, carbonLauncherPath) => {
    const startCommand = (command, cwd) => {
        exec(`start "" "${command}"`, { cwd }, (error) => {
            if (error) {
                console.error(`Error starting ${command}:`, error);
            } else {
                console.log(`${command} started successfully.`);
            }
        });
    };

    if (neonitePath) {
        // Extract directory path from neonitePath
        const neoniteDir = path.dirname(neonitePath);
        console.log(`Starting Neonite using app.js located at: ${path.join(neoniteDir, 'app.js')} in directory: ${neoniteDir}`);
        startCommand(neonitePath, neoniteDir);
    }

    if (carbonLauncherPath) {
        console.log(`Starting Carbon Launcher using executable located at: ${carbonLauncherPath}`);
        startCommand(carbonLauncherPath, path.dirname(carbonLauncherPath));
    }
};

// Main function to interact with the user
const main = () => {
    const config = loadConfig();
    const username = config.username || 'DefaultUser';

    if (config.builds.length === 0) {
        console.log(chalk.red('No builds found in builds.json.'));
        const addBuild = readlineSync.keyInYNStrict('Would you like to add a build?');

        if (addBuild) {
            const name = readlineSync.question('Enter the build name: ');
            const buildPath = readlineSync.question('Enter the build path (e.g., F:\\Fortnite Builds\\Big Bang Event v27.11): ');
            config.builds.push({ name, path: buildPath });
            saveConfig(config);
            console.log('Build added successfully.');
        }
        process.exit();
    }

    console.log(chalk.blue('\nAvailable Builds:'));
    config.builds.forEach((build, index) => {
        console.log(chalk.green(`${index + 1}. ${build.name} (${build.path})`));
    });

    const action = readlineSync.question(`\n${chalk.blue(`Current username is '${username}'.`)} ${chalk.yellow('Select a build by number, or type "rename" to rename a build, "path" to change a build\'s path, "username" to change the username, "setpath" to set Carbon.config path, "setneonite" to set Neonite path, "setlauncher" to set Carbon Launcher path: ')}`);

    const choice = parseInt(action);

    if (!isNaN(choice) && choice > 0 && choice <= config.builds.length) {
        const selectedBuild = config.builds[choice - 1];
        updateCarbonConfig(config.carbonConfigPath, selectedBuild);
        startApplications(config.neonitePath, config.carbonLauncherPath);
    } else if (action === 'rename') {
        const oldName = readlineSync.question('Enter the current build name: ');
        const newName = readlineSync.question('Enter the new build name: ');
        const build = config.builds.find(b => b.name === oldName);
        if (build) {
            build.name = newName;
            saveConfig(config);
            console.log(`Build renamed to ${newName}!`);
        } else {
            console.log(`Build ${oldName} not found.`);
        }
    } else if (action === 'path') {
        const buildName = readlineSync.question('Enter the build name to change the path for: ');
        const newPath = readlineSync.question('Enter the new path: ');
        const build = config.builds.find(b => b.name === buildName);
        if (build) {
            build.path = newPath;
            saveConfig(config);
            console.log(`Path for ${buildName} updated!`);
        } else {
            console.log(`Build ${buildName} not found.`);
        }
    } else if (action === 'username') {
        const newUsername = readlineSync.question('Enter the new username: ');
        config.username = newUsername;
        saveConfig(config);
        console.log(`Username updated to ${newUsername}!`);
    } else if (action === 'setpath') {
        const newPath = readlineSync.question('Enter the new Carbon.config path: ');
        config.carbonConfigPath = newPath;
        saveConfig(config);
        console.log(`Carbon.config path updated to ${newPath}`);
    } else if (action === 'setneonite') {
        const newPath = readlineSync.question('Enter the new Neonite executable path: ');
        config.neonitePath = newPath;
        saveConfig(config);
        console.log(`Neonite path updated to ${newPath}`);
    } else if (action === 'setlauncher') {
        const newPath = readlineSync.question('Enter the new Carbon Launcher executable path: ');
        config.carbonLauncherPath = newPath;
        saveConfig(config);
        console.log(`Carbon Launcher path updated to ${newPath}`);
    } else {
        console.log('Invalid choice.');
    }
};

main();
