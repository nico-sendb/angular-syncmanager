import { Component, OnInit } from '@angular/core';
import { SendbirdService } from 'src/app/services/sendbird.service';
import SendBirdSyncManager from 'sendbird-syncmanager';

@Component({
    selector: 'app-messages-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {

    sb;
    messages: Array<any>;
    channelCollection: any;
    channelSelected: any;

    constructor(
        private sendbird: SendbirdService
    ) { }

    ngOnInit(): void {
        this.sb = this.sendbird.getInstance();
        this.sendbird.channelsObservable.subscribe((channel: any) => {
            this.channelSelected = channel;
            this.getMessages();
        })
    }

    getMessages() {
        if (!this.channelSelected) {
            console.log('NO CHANNEL SELECTED');
            return;
        }
        const collection: any = new SendBirdSyncManager.MessageCollection(this.channelSelected);
        const handler = new SendBirdSyncManager.MessageCollection.CollectionHandler();
        handler.onSucceededMessageEvent = (messages, action) => {
            console.log('MESSAGES ACTION: ' + action);
            console.log('MESSAGES: ', messages);
            this.messages = messages;
            switch (action) {
                case 'insert':
                    // Add messages to the view.
                    break;
                case 'update':
                    // Update messages in the view.
                    break;
                case 'remove':
                    // Remove messages from the view.
                    break;
                case 'clear':
                    // Clear the view.
                    break;
            }
        };
        collection.setCollectionHandler(handler);
        collection.fetchSucceededMessages('prev').then(() => {
            collection.fetchFailedMessages();
        });    
    }

}
