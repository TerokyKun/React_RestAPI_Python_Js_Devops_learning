const { spawn } = require('child_process');

const batFilePath = 'D:/stable-diffusion-portable-main/stable-diffusion-portable-main/webui-user.bat';

const batProcess = spawn(batFilePath);

batProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

batProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

batProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
