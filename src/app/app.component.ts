import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SendbirdService } from './services/sendbird.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'sb-syncamanager-angular';
    connected = false;
    sendbirdSdkConnected = false;

    constructor(
        private sendbird: SendbirdService
    ) {}

    ngOnInit() {
        const userId = environment.USER_ID;
        const nickname = environment.NICKNAME;
        this.sendbird.initSyncMAnagerAndConnectToSendbird(userId, nickname, (success: boolean, message: any) => {
            this.connected = true;
            this.sendbirdSdkConnected = success;
        })
    }


}
