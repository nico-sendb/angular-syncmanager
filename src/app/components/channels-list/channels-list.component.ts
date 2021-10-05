import { Component, OnInit } from '@angular/core';
import { SendbirdService } from 'src/app/services/sendbird.service';
import SendBirdSyncManager from 'sendbird-syncmanager';

@Component({
    selector: 'app-channels-list',
    templateUrl: './channels-list.component.html',
    styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {

    sb;
    channels: Array<any>;
    channelCollection: any;
    action: string;

    constructor(
        private sendbird: SendbirdService
    ) { }

    ngOnInit(): void {
        this.sb = this.sendbird.getInstance();
        this.getChannels();
    }

    getChannels() {
        const query = this.sb.GroupChannel.createMyGroupChannelListQuery();
        query.limit = 50;
        query.includeEmpty = false;
        query.order = 'latest_last_message';

        this.channelCollection = new SendBirdSyncManager.ChannelCollection(query);
        const collectionHandler = new SendBirdSyncManager.ChannelCollection.CollectionHandler();
        collectionHandler.onChannelEvent = (action, channels) => {
            this.action = action;
            this.channels = channels;
            console.log('ACTION: ' + action);
            console.log('CHANNELS: ', channels);
            switch (action) {
                case 'insert': {
                    break;
                }
                case 'update': {
                    break;
                }
                case 'move': {
                    break;
                }
                case 'remove': {
                    break;
                }
                case 'clear': {
                    break;
                }
            }
        };
        this.channelCollection.setCollectionHandler(collectionHandler);
        this.channelCollection.fetch();
    }

    selectChannel(channel: any) {
        this.sendbird.channelsObservable.emit(channel);
    }



}
