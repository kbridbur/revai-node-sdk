const clientHelper = require('../src/client-helper');
const configHelper = require('../src/config-helper');
const RevAiApiJob = require('../../../dist/src/models/RevAiApiJob')
const client = clientHelper.getClient(configHelper.getApiKey());

beforeAll(async (done) => {
    const jobList = await client.getListOfJobs();
    if(jobList === undefined || jobList.length < 2) {
        await client.submitJobUrl('https://www.rev.ai/FTC_Sample_1.mp3');
        await client.submitJobUrl('https://www.rev.ai/FTC_Sample_1.mp3');
    }
    done();
}, 10000)

test('Can get list of jobs', async () => {
    const jobList = await client.getListOfJobs();
    jobList.forEach((revAiJob) => {
        expect(revAiJob).toMatchObject(RevAiApiJob);
    })
})

test('Can get single job', async () => {
    const jobList = await client.getListOfJobs(1);
    expect(jobList.length).toEqual(1);
    expect(jobList[0]).toMatchObject(RevAiApiJob);
})