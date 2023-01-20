const express = require('express')
const app = express();
const {exec} = require('child_process');
const { lock } = require('./lock');
const { unlock } = require('./unlock');

const MAX_BUFFER_SIZE = 1024 * 5000;

app.use(express.json());

const execCommandAsync = (query) => {
    return new Promise((resolve, reject) => {
        exec(query, {maxBuffer: MAX_BUFFER_SIZE, shell: 'powershell.exe'}, (err, stdout, stderr) => {
            if (!err) {
                resolve(stdout.toString());
            } else {
                reject(stderr.toString());
            }
        });
    });
}

app.get('/', async(req, res) => {
    res.json({
        ok: true
    });
})

app.get('/lock', async (req, res) => {

    try {
        const resp = await execCommandAsync(lock);
        console.log(resp);
        res.json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            err: error
        })
    }
})

app.get('/unlock', async(req, res) => {

    try {
        const resp = await execCommandAsync(unlock);
        console.log(resp);
        res.json({
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            err: error
        });
    }
});

app.listen(3000)