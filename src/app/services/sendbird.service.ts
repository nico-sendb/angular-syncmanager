import { Injectable, EventEmitter } from '@angular/core';
import * as SendBird from 'sendbird';
import SendBirdSyncManager from 'sendbird-syncmanager';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SendbirdService {

    sb = new SendBird({ appId: environment.APP_ID });
    channelsObservable = new EventEmitter();


    constructor() { }

    /**
     * All starts here
     */
    initSyncMAnagerAndConnectToSendbird(userId: string, nickname: string, callback: any) {
        SendBirdSyncManager.sendBird = this.sb;
        const options = new SendBirdSyncManager.Options();
        options.messageCollectionCapacity = 2000;
        options.automaticMessageResendRetryCount = 5;
        options.maxFailedMessageCountPerChannel = 50;
        options.failedMessageRetentionDays = 7;
        SendBirdSyncManager.setup(userId, options, () => {
            this.connect(userId, nickname, (success: boolean, message: any) => {
                this.createConnectionHandler();
                callback(success, message);
            })
        })
    }

    /**
     * Connect to Sendbird
     */
    private connect(userId: string, nickname: string, callback: any) {
        const sb = SendBird.getInstance();
        sb.connect(userId, (user, error) => {
            if (error) {
                callback(false, error);
            } else {
                sb.updateCurrentUserInfo(decodeURIComponent(nickname), null, (user, error) => {
                    error ? callback(false, error) : callback(true, user);
                });
            }
        });
    }

    /**
     * When connection was lost, SyncManager loses sync.
     * When connection is restored, resume sync.
     */
    private createConnectionHandler() {
        const manager = SendBirdSyncManager.getInstance();
        const connectionManager = new this.sb.ConnectionHandler();
        connectionManager.onReconnectStarted = () => {
            console.log('createConnectionHandler()', 'Connection is lost. Trying to reconnect...');
        };
        connectionManager.onReconnectSucceeded = () => {
            manager.resumeSync();
        };
        connectionManager.onReconnectFailed = () => {

        };
    }

    getInstance() {
        return this.sb;
    }

}
