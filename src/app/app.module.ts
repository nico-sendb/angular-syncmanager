import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelsListComponent } from './components/channels-list/channels-list.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChannelsListComponent,
    MessagesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
