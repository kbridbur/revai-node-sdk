import axios, { AxiosInstance } from 'axios';

class RevAiApiClient {
    accessToken: string;
    version: string;
    instance: AxiosInstance;
    constructor(accessToken: string, version = 'v1') {
        this.accessToken = accessToken;
        axios.defaults.baseURL = `https://api.rev.ai/revspeech/${version}/`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    async getAccount(): Promise<RevAiAccount> {
        try {
            const response = await axios.get('account');
            const account = response.data;
            return account;
        }
        catch (error) {
            console.log('error: ', error.response.data);
        }
    }

    async getJobDetails(id: string): Promise<RevAiApiJob> {
        try {
            const response = await axios.get(`/jobs/${id}`);
            const job = response.data;
            return job;
        }
        catch (error) { 
            console.log('error: ', error.response.data);
        }
    }

    async submitJobUrl(mediaUrl: string, options?: RevAiJobOptions): Promise<RevAiApiJob> {
        if (options)
            options['media_url'] = mediaUrl;
        else
            options = { 'media_url': mediaUrl };
        try {
            const response = await axios.post('/jobs', options, {
                headers: { 'Content-Type': 'application/json' }
            });
            const job = response.data;
            return job;
        }
        catch (error) {
            console.log('error: ', error.response.data);
        }
    }
}

export default RevAiApiClient;

export interface RevAiJobOptions {
    media_url?: string;
    metadata?: string;
    callback_url?: string;
    skip_diarization?: boolean;
}

export interface RevAiAccount {
    email: string;
    balance_seconds: number;
}

export interface RevAiApiJob {
    id: string;
    status: string;
    created_on: string;
    completed_on?: string;
    metadata?: string;
    name?: string;
    callback_url?: string;
    duration_seconds?: number;
    media_url?: string;
    failure?: string;
    failure_detail?: string;
}
